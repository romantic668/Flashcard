const fetch = require('node-fetch');
const cheerio = require('cheerio');
const natural = require('natural');
const { query, queryOne, run } = require('./database');
const crypto = require('crypto');

// Common English words (stopwords + common vocabulary) - expanded list
const commonWords = new Set([
    // Articles
    'a', 'an', 'the',
    // Pronouns
    'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
    'this', 'that', 'these', 'those', 'my', 'your', 'his', 'her', 'its', 'our', 'their',
    // Common verbs
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'can', 'could', 'should', 'may', 'might', 'must', 'get', 'got', 'go', 'went',
    'come', 'came', 'see', 'saw', 'know', 'knew', 'think', 'thought', 'take', 'took', 'give', 'gave',
    'make', 'made', 'say', 'said', 'tell', 'told', 'find', 'found', 'use', 'used', 'work', 'worked',
    // Prepositions
    'in', 'on', 'at', 'by', 'for', 'with', 'from', 'to', 'of', 'about', 'into', 'onto', 'up', 'down',
    'out', 'off', 'over', 'under', 'through', 'during', 'before', 'after', 'above', 'below',
    // Conjunctions
    'and', 'or', 'but', 'if', 'when', 'where', 'while', 'because', 'since', 'although', 'though',
    // Common nouns (most frequent 1000 words)
    'time', 'year', 'people', 'way', 'day', 'man', 'thing', 'woman', 'life', 'child',
    'world', 'school', 'state', 'family', 'student', 'group', 'country', 'problem',
    'hand', 'part', 'place', 'case', 'week', 'company', 'system', 'program', 'question',
    'work', 'government', 'number', 'night', 'point', 'home', 'water', 'room', 'mother',
    'area', 'money', 'story', 'fact', 'month', 'lot', 'right', 'study', 'book', 'eye',
    'job', 'word', 'business', 'issue', 'side', 'kind', 'head', 'house', 'service',
    'friend', 'father', 'power', 'hour', 'game', 'line', 'end', 'member', 'law',
    'car', 'city', 'community', 'name', 'president', 'team', 'minute', 'idea', 'kid',
    'body', 'information', 'back', 'parent', 'face', 'others', 'level', 'office',
    'door', 'health', 'person', 'art', 'war', 'history', 'party', 'result', 'change',
    'morning', 'reason', 'research', 'girl', 'guy', 'moment', 'air', 'teacher',
    'force', 'education', 'page', 'letter', 'table', 'chair', 'window', 'door', 'floor',
    'wall', 'tree', 'flower', 'animal', 'dog', 'cat', 'bird', 'fish', 'food', 'water',
    'color', 'red', 'blue', 'green', 'yellow', 'black', 'white', 'big', 'small', 'good',
    'bad', 'new', 'old', 'young', 'hot', 'cold', 'happy', 'sad', 'easy', 'hard'
]);

// Word frequency database (top 10,000 most common words)
// Words ranked by frequency - lower rank = more common
// This is a simplified version - in production, load from a file or API
const wordFrequencyRank = new Map();
// We'll populate this with common words to filter them out
// Words not in this map are considered rare/advanced

// Initialize common word frequency ranks (1-5000 are very common, filter them)
const veryCommonWords = [
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
    'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
    'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
    'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
    'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
    'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
    'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
    'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'
];
veryCommonWords.forEach((word, index) => {
    wordFrequencyRank.set(word, index + 1);
});

// Initialize tokenizer and stemmer
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

// Estimate syllables in a word
function estimateSyllables(word) {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? Math.max(1, matches.length) : 1;
}

// Calculate word difficulty score
function calculateWordDifficulty(word) {
    let score = 0;
    
    // Length-based scoring (longer = harder, but not always)
    if (word.length >= 10) score += 3;
    else if (word.length >= 8) score += 2;
    else if (word.length >= 6) score += 1;
    
    // Syllable estimation (more syllables = harder)
    const syllables = estimateSyllables(word);
    if (syllables >= 4) score += 2;
    else if (syllables >= 3) score += 1;
    
    // Uncommon letter patterns
    if (/[xzqj]/i.test(word)) score += 1; // Less common letters
    if (/[aeiou]{3,}/i.test(word)) score += 1; // Unusual vowel clusters
    if (/[bcdfghjklmnpqrstvwxyz]{4,}/i.test(word)) score += 1; // Long consonant clusters
    
    // Prefix/suffix complexity
    const complexPrefixes = ['un', 're', 'pre', 'dis', 'mis', 'over', 'under', 'inter', 'trans', 'anti', 'de', 'en', 'ex', 'in', 'non', 'out', 'sub', 'super'];
    const complexSuffixes = ['tion', 'sion', 'ness', 'ment', 'able', 'ible', 'ous', 'ious', 'ance', 'ence', 'ity', 'ism', 'ist', 'ive', 'ize', 'ise'];
    if (complexPrefixes.some(p => word.toLowerCase().startsWith(p))) score += 1;
    if (complexSuffixes.some(s => word.toLowerCase().endsWith(s))) score += 1;
    
    // Compound words (hyphenated or combined)
    if (word.includes('-') || word.length > 8) {
        const parts = word.split(/[-_]/);
        if (parts.length > 1) score += 1;
    }
    
    return score;
}

// Check if word is rare (not in top 10,000 most common)
// Note: This function is kept for backward compatibility but logic moved inline
function isRareWord(word) {
    const rank = wordFrequencyRank.get(word.toLowerCase());
    // Only filter out top 1000 most common words
    // Words not in the map are considered acceptable
    return !rank || rank > 1000;
}

// Get words already in database (all decks)
async function getExistingWords() {
    // Check all decks to avoid duplicates
    const allCards = await query('SELECT front FROM cards');
    const existingWords = new Set();
    
    for (const card of allCards) {
        const word = card.front.toLowerCase().trim();
        existingWords.add(word);
        existingWords.add(stemmer.stem(word));
    }
    
    return existingWords;
}

// Get words user has marked as "known" from stats
async function getUserKnownWords() {
    try {
        // Get all stats where user has marked words as known
        const statsRows = await query(
            'SELECT deck_id FROM stats WHERE known > 0'
        );
        
        const knownWords = new Set();
        for (const stat of statsRows) {
            const cards = await query(
                'SELECT front FROM cards WHERE deck_id = ?',
                [stat.deck_id]
            );
            cards.forEach(card => {
                const word = card.front.toLowerCase().trim();
                knownWords.add(word);
                knownWords.add(stemmer.stem(word));
            });
        }
        return knownWords;
    } catch (error) {
        console.error('Error getting user known words:', error);
        return new Set();
    }
}

// Check if word is valid English word (enhanced)
function isValidWord(word) {
    const cleanWord = word.replace(/[^a-z]/gi, '').toLowerCase();
    
    // Increased minimum length from 3 to 5
    if (cleanWord.length < 5) return false;
    
    // Maximum length check (very long words might be technical terms or errors)
    if (cleanWord.length > 25) return false;
    
    // Must contain only letters
    if (!/^[a-z]+$/i.test(cleanWord)) return false;
    
    // Not a number
    if (!isNaN(cleanWord)) return false;
    
    // Not all consonants or all vowels (likely not a real word)
    if (/^[bcdfghjklmnpqrstvwxyz]+$/i.test(cleanWord) && cleanWord.length > 6) return false;
    if (/^[aeiou]+$/i.test(cleanWord) && cleanWord.length > 4) return false;
    
    return true;
}

// Get CEFR level for a word using online API
async function getCEFRLevel(word) {
    try {
        // Try CEFR Lookup API (if available) or use word frequency as proxy
        // Since direct CEFR APIs may have rate limits, we'll use a combination approach
        
        // Method 1: Use word frequency to estimate CEFR level
        // A1-A2: Top 1,000 words
        // B1-B2: Top 3,000 words  
        // C1-C2: Beyond top 3,000 words
        
        const rank = wordFrequencyRank.get(word.toLowerCase());
        
        if (rank) {
            if (rank <= 1000) return 'A1-A2';
            if (rank <= 3000) return 'B1-B2';
            return 'C1-C2';
        }
        
        // Method 2: Use word characteristics to estimate
        const difficulty = calculateWordDifficulty(word);
        const wordLength = word.length;
        
        // Estimate CEFR based on difficulty and length (more flexible)
        // Since we already filter by difficulty >= 2, most words will be B1-B2 or higher
        if (wordLength <= 5 && difficulty <= 2) return 'A1-A2';
        if (wordLength <= 7 && difficulty <= 3) return 'B1-B2';
        if (wordLength <= 9 && difficulty <= 4) return 'B2-C1';
        return 'C1-C2';
        
    } catch (error) {
        console.error(`Error getting CEFR level for ${word}:`, error.message);
        // Fallback: assume intermediate level
        return 'B1-B2';
    }
}

// Check if word matches target CEFR level
function matchesCEFRLevel(wordCEFR, targetCEFR) {
    if (!wordCEFR || !targetCEFR) return true; // If unknown, include it
    
    // Map target CEFR to acceptable ranges (more flexible)
    const levelMap = {
        'A1': ['A1-A2'],
        'A2': ['A1-A2', 'B1-B2'],
        'B1': ['A1-A2', 'B1-B2', 'B2-C1'], // Accept slightly easier and harder for B1
        'B2': ['B1-B2', 'B2-C1', 'C1-C2'], // Accept range around B2
        'C1': ['B2-C1', 'C1-C2'],
        'C2': ['C1-C2']
    };
    
    const acceptableLevels = levelMap[targetCEFR] || ['A1-A2', 'B1-B2', 'B2-C1', 'C1-C2'];
    return acceptableLevels.includes(wordCEFR);
}

// Get word definition using Free Dictionary API with fallbacks
async function getWordDefinition(word, context = '') {
    // Try primary API first
    try {
        // Use Promise.race to add timeout
        const fetchPromise = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 5000)
        );
        
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        
        if (response.ok) {
            const data = await response.json();
            
            if (Array.isArray(data) && data.length > 0) {
                const entry = data[0];
                const meanings = entry.meanings || [];
                
                if (meanings.length > 0) {
                    const firstMeaning = meanings[0];
                    const definitions = firstMeaning.definitions || [];
                    
                    if (definitions.length > 0) {
                        return {
                            definition: definitions[0].definition,
                            partOfSpeech: firstMeaning.partOfSpeech,
                            example: definitions[0].example || null
                        };
                    }
                }
            }
        }
    } catch (error) {
        console.log(`Primary API failed for ${word}, trying fallback...`);
    }
    
    // Fallback 1: Try alternative dictionary API (WordsAPI)
    try {
        // Note: This would require an API key, so we'll skip for now
        // and use context-based fallback instead
    } catch (error) {
        console.log(`Alternative API failed for ${word}`);
    }
    
    // Fallback 2: Create definition from context and word analysis
    return createDefinitionFromContext(word, context);
}

// Create a definition from context when API fails
function createDefinitionFromContext(word, context) {
    // Analyze word structure to infer meaning
    const wordLower = word.toLowerCase();
    let inferredMeaning = '';
    let partOfSpeech = 'noun'; // Default
    
    // Try to infer part of speech from common suffixes
    if (wordLower.endsWith('ly')) {
        partOfSpeech = 'adverb';
        const base = wordLower.slice(0, -2);
        inferredMeaning = `In the manner of ${base}; done in a ${base} way`;
    } else if (wordLower.endsWith('ed') || wordLower.endsWith('ing')) {
        partOfSpeech = 'verb';
        const base = wordLower.replace(/(ed|ing)$/, '');
        inferredMeaning = `To perform an action related to ${base}`;
    } else if (wordLower.endsWith('tion') || wordLower.endsWith('sion')) {
        partOfSpeech = 'noun';
        const base = wordLower.replace(/(tion|sion)$/, '');
        inferredMeaning = `The act, process, or result of ${base}`;
    } else if (wordLower.endsWith('ness')) {
        partOfSpeech = 'noun';
        const base = wordLower.replace(/ness$/, '');
        inferredMeaning = `The state or quality of being ${base}`;
    } else if (wordLower.endsWith('ment')) {
        partOfSpeech = 'noun';
        const base = wordLower.replace(/ment$/, '');
        inferredMeaning = `The action or process of ${base}`;
    } else if (wordLower.endsWith('able') || wordLower.endsWith('ible')) {
        partOfSpeech = 'adjective';
        const base = wordLower.replace(/(able|ible)$/, '');
        inferredMeaning = `Capable of being ${base}; having the quality of ${base}`;
    } else if (wordLower.endsWith('ous') || wordLower.endsWith('ious')) {
        partOfSpeech = 'adjective';
        const base = wordLower.replace(/(ous|ious)$/, '');
        inferredMeaning = `Characterized by or full of ${base}`;
    } else if (wordLower.endsWith('ful')) {
        partOfSpeech = 'adjective';
        const base = wordLower.replace(/ful$/, '');
        inferredMeaning = `Full of ${base}; having the qualities of ${base}`;
    } else {
        // Generic definition based on word characteristics
        const difficulty = calculateWordDifficulty(word);
        if (difficulty >= 3) {
            inferredMeaning = `An advanced or specialized term. This word appears in the article context.`;
        } else {
            inferredMeaning = `A word that appears in the article. Study the context to understand its meaning.`;
        }
    }
    
    // Use context to enhance definition
    if (context && context.length > 10) {
        // Extract a meaningful sentence from context
        const contextWords = context.split(' ').filter(w => w.length > 0);
        const wordIndex = contextWords.findIndex(w => w.toLowerCase() === wordLower || w.toLowerCase().includes(wordLower));
        
        if (wordIndex >= 0) {
            const start = Math.max(0, wordIndex - 4);
            const end = Math.min(contextWords.length, wordIndex + 5);
            const exampleSentence = contextWords.slice(start, end).join(' ');
            
            return {
                definition: `${inferredMeaning}`,
                partOfSpeech: partOfSpeech,
                example: exampleSentence || null
            };
        } else if (context.length > 20) {
            // Use first part of context as example
            const example = context.split(' ').slice(0, 15).join(' ');
            return {
                definition: `${inferredMeaning}`,
                partOfSpeech: partOfSpeech,
                example: example
            };
        }
    }
    
    // Final fallback: basic definition with word itself
    return {
        definition: `${inferredMeaning}`,
        partOfSpeech: partOfSpeech,
        example: context ? context.substring(0, 80) + '...' : `Study this word in context: ${word}`
    };
}

// Extract page title from HTML
function extractPageTitle(html) {
    const $ = cheerio.load(html);
    
    let title = $('title').text().trim();
    
    if (title) {
        title = title.split('|')[0].split('-')[0].split('—')[0].trim();
        if (title.length > 60) {
            title = title.substring(0, 57) + '...';
        }
    }
    
    if (!title || title.length < 3) {
        title = $('meta[property="og:title"]').attr('content') || '';
    }
    
    if (!title || title.length < 3) {
        title = $('h1').first().text().trim();
        if (title.length > 60) {
            title = title.substring(0, 57) + '...';
        }
    }
    
    return title || 'Generated Flashcards';
}

// Generate a unique deck ID from URL
function generateDeckId(url) {
    const hash = crypto.createHash('md5').update(url).digest('hex').substring(0, 8);
    const timestamp = Date.now().toString(36);
    return `gen-${hash}-${timestamp}`;
}

// Create a new deck in the database
async function createDeck(deckId, deckName, cefrLevel = null) {
    try {
        const existing = await queryOne('SELECT id FROM decks WHERE id = ?', [deckId]);
        if (existing) {
            return deckId;
        }
        
        await run('INSERT INTO decks (id, name, cefr_level) VALUES (?, ?, ?)', [deckId, deckName, cefrLevel]);
        console.log(`Created new deck: ${deckId} - ${deckName} (CEFR: ${cefrLevel || 'N/A'})`);
        return deckId;
    } catch (error) {
        console.error('Error creating deck:', error);
        throw error;
    }
}

// Extract main text from HTML
function extractText(html) {
    const $ = cheerio.load(html);
    
    // Remove unwanted elements
    $('script, style, nav, header, footer, aside, .ad, .advertisement, .sidebar, .menu, .navigation, .navbar, .social, .share, .comments, .comment, iframe, noscript').remove();
    
    // Try multiple strategies to extract text
    let text = '';
    
    // Strategy 1: Try semantic HTML5 elements and common content selectors
    const contentSelectors = [
        'article',
        'main',
        '[role="main"]',
        '.content',
        '.post',
        '.entry',
        '.article',
        '#content',
        '.article-body',
        '.post-content',
        '.entry-content',
        '.story-body',
        '.text-content',
        '.main-content'
    ];
    
    for (const selector of contentSelectors) {
        const elements = $(selector);
        if (elements.length > 0) {
            const extracted = elements.map((i, el) => {
                // Get text from element and its children, but exclude nested unwanted elements
                const $el = $(el);
                $el.find('script, style, nav, .ad, .advertisement, .sidebar, .menu').remove();
                return $el.text();
            }).get().join(' ');
            
            if (extracted.length > text.length) {
                text = extracted;
            }
            if (text.length > 500) break; // Got enough text
        }
    }
    
    // Strategy 2: If still not enough, try all paragraphs
    if (text.length < 300) {
        const paragraphs = $('p').map((i, el) => {
            const $p = $(el);
            // Skip if it's in a nav, header, footer, or ad
            if ($p.closest('nav, header, footer, .ad, .advertisement, .sidebar').length > 0) {
                return '';
            }
            return $p.text().trim();
        }).get().filter(p => p.length > 20); // Only paragraphs with substantial content
        
        if (paragraphs.length > 0) {
            const paraText = paragraphs.join(' ');
            if (paraText.length > text.length) {
                text = paraText;
            }
        }
    }
    
    // Strategy 3: If still not enough, try divs with text content
    if (text.length < 300) {
        const divs = $('div').map((i, el) => {
            const $div = $(el);
            // Skip if it's in a nav, header, footer, or ad
            if ($div.closest('nav, header, footer, .ad, .advertisement, .sidebar').length > 0) {
                return '';
            }
            // Only get divs with substantial text content
            const divText = $div.text().trim();
            if (divText.length > 50 && $div.children().length < 10) {
                return divText;
            }
            return '';
        }).get().filter(d => d.length > 50);
        
        if (divs.length > 0) {
            const divText = divs.join(' ');
            if (divText.length > text.length) {
                text = divText;
            }
        }
    }
    
    // Strategy 4: Last resort - get all text from body, but clean it
    if (text.length < 200) {
        $('body').find('script, style, nav, header, footer, aside, .ad, .advertisement, .sidebar, .menu, .navigation').remove();
        const bodyText = $('body').text();
        if (bodyText.length > text.length) {
            text = bodyText;
        }
    }
    
    // Clean up the text: remove extra whitespace, normalize
    text = text
        .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
        .replace(/\n\s*\n/g, '\n') // Remove multiple newlines
        .trim();
    
    return text;
}

// Process text and find unknown words (enhanced with difficulty scoring and CEFR filtering)
async function processText(text, existingWords, userKnownWords, targetCEFR = 'B1', topN = 20) {
    const tokens = tokenizer.tokenize(text.toLowerCase());
    
    if (!tokens) return [];
    
    const wordFreq = new Map();
    const wordContexts = new Map();
    const wordScores = new Map(); // Track difficulty scores
    
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const cleanWord = token.replace(/[^a-z]/gi, '').toLowerCase();
        
        // Basic validation
        if (!isValidWord(cleanWord)) continue;
        if (commonWords.has(cleanWord)) continue;
        
        // Check existing words
        const stemmed = stemmer.stem(cleanWord);
        if (existingWords.has(cleanWord) || existingWords.has(stemmed)) continue;
        
        // Check user known words
        if (userKnownWords.has(cleanWord) || userKnownWords.has(stemmed)) continue;
        
        // Calculate difficulty score
        const difficulty = calculateWordDifficulty(cleanWord);
        
        // Only include words with difficulty score >= 1 (slightly easier threshold)
        if (difficulty < 1) continue;
        
        // Check word frequency (filter very common words) - but be more lenient
        // Only filter out top 1000 most common words
        const rank = wordFrequencyRank.get(cleanWord);
        if (rank && rank <= 1000) continue;
        
        // Check CEFR level online
        const wordCEFR = await getCEFRLevel(cleanWord);
        if (!matchesCEFRLevel(wordCEFR, targetCEFR)) {
            console.log(`Skipping ${cleanWord} - CEFR level ${wordCEFR} doesn't match target ${targetCEFR}`);
            continue;
        }
        
        // Count frequency
        wordFreq.set(cleanWord, (wordFreq.get(cleanWord) || 0) + 1);
        wordScores.set(cleanWord, difficulty);
        
        // Store context
        if (!wordContexts.has(cleanWord)) {
            const context = [];
            const start = Math.max(0, i - 5);
            const end = Math.min(tokens.length, i + 6);
            for (let j = start; j < end; j++) {
                if (j !== i) context.push(tokens[j]);
            }
            wordContexts.set(cleanWord, context.join(' '));
        }
    }
    
    // Sort by difficulty score first, then frequency
    // Weight difficulty more heavily (difficulty * 3 + frequency)
    const sortedWords = Array.from(wordFreq.entries())
        .map(([word, freq]) => ({
            word,
            frequency: freq,
            difficulty: wordScores.get(word),
            score: wordScores.get(word) * 3 + freq // Weight difficulty 3x more than frequency
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, topN) // Top N words (configurable)
        .map(item => item.word);
    
    console.log(`Found ${sortedWords.length} words matching CEFR level ${targetCEFR} after filtering`);
    
    return sortedWords.map(word => ({
        word,
        context: wordContexts.get(word) || ''
    }));
}

// Generate flashcards from URL
async function generateFlashcardsFromURL(url, targetCEFR = 'B1', topN = 20) {
    try {
        // Step 1: Fetch webpage
        console.log('Fetching URL:', url);
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
        }
        
        const html = await response.text();
        
        // Step 1.5: Extract page title (but don't create deck yet)
        console.log('Extracting page title...');
        const pageTitle = extractPageTitle(html);
        const deckId = generateDeckId(url);
        const deckName = pageTitle || `Flashcards from ${new URL(url).hostname}`;
        
        // Step 2: Extract text
        console.log('Extracting text...');
        const text = extractText(html);
        console.log(`Extracted ${text.length} characters of text`);
        
        if (text.length < 100) {
            throw new Error(`Could not extract sufficient text from the webpage (only found ${text.length} characters). The page may be heavily JavaScript-based, require authentication, or have very little text content.`);
        }
        
        // Step 3: Get existing words and user known words
        console.log('Checking existing words and user vocabulary...');
        const existingWords = await getExistingWords();
        const userKnownWords = await getUserKnownWords();
        
        // Step 4: Process text and find unknown words
        console.log(`Processing text and finding difficult unknown words for CEFR level ${targetCEFR} (top ${topN})...`);
        const unknownWords = await processText(text, existingWords, userKnownWords, targetCEFR, topN);
        
        console.log(`Found ${unknownWords.length} unknown words after processing`);
        
        if (unknownWords.length === 0) {
            return {
                success: false,
                message: 'No new words found matching your CEFR level. Try: 1) Adjusting the difficulty level, 2) Using a different article, or 3) The article may be too simple for your level.',
                cards: []
            };
        }
        
        // Create deck only if we have words to process
        await createDeck(deckId, deckName, targetCEFR);
        
        // Step 5: Get definitions and create flashcards (with part-of-speech filtering)
        console.log('Getting definitions and creating flashcards...');
        const flashcards = [];
        
        // Preferred parts of speech (nouns, adjectives, verbs, adverbs)
        const preferredPOS = ['noun', 'adjective', 'verb', 'adverb'];
        
        for (const { word, context } of unknownWords) {
            // Always get a definition - API or fallback
            const definition = await getWordDefinition(word, context);
            
            // Always create a flashcard - definition will never be null now
            const pos = definition.partOfSpeech?.toLowerCase() || '';
            
            // Filter by part of speech - skip only the most common function words
            // Be more lenient to allow more words through
            const skipPOS = ['pronoun', 'determiner', 'article'];
            if (skipPOS.some(skip => pos.includes(skip))) {
                console.log(`Skipping ${word} - part of speech: ${pos}`);
                continue;
            }
            
            // Accept nouns, adjectives, verbs, adverbs, prepositions, conjunctions
            // (prepositions and conjunctions can be useful for learning)
            
            const front = word.charAt(0).toUpperCase() + word.slice(1);
            let back = definition.definition;
            
            if (definition.partOfSpeech) {
                back = `[${definition.partOfSpeech}] ${back}`;
            }
            
            if (definition.example) {
                back += `\n\nExample: ${definition.example}`;
            } else if (context) {
                // Create example from context
                const contextWords = context.split(' ').filter(w => w.length > 0);
                const wordIndex = contextWords.findIndex(w => w.toLowerCase().includes(word.toLowerCase()));
                
                if (wordIndex >= 0) {
                    const start = Math.max(0, wordIndex - 5);
                    const end = Math.min(contextWords.length, wordIndex + 6);
                    const example = contextWords.slice(start, end).join(' ');
                    back += `\n\nExample from article: ${example}`;
                } else {
                    const example = context.split(' ').slice(0, 10).join(' ') + ' ' + word + ' ' + 
                                   context.split(' ').slice(10, 15).join(' ');
                    back += `\n\nExample: ${example}`;
                }
            }
            
            flashcards.push({ front, back });
            
            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        // Step 6: Insert flashcards into database
        console.log('Inserting flashcards into database...');
        const insertedCards = [];
        
        for (const card of flashcards) {
            try {
                const result = await run(
                    'INSERT INTO cards (deck_id, front, back) VALUES (?, ?, ?)',
                    [deckId, card.front, card.back]
                );
                insertedCards.push({
                    id: result.lastID,
                    ...card
                });
            } catch (error) {
                console.error(`Error inserting card for ${card.front}:`, error.message);
            }
        }
        
        console.log(`Generated ${insertedCards.length} flashcards from ${unknownWords.length} words (${flashcards.length} total created)`);
        
        // If no cards were created, delete the deck
        if (insertedCards.length === 0) {
            // Delete the empty deck
            await run('DELETE FROM decks WHERE id = ?', [deckId]);
            console.log(`Deleted empty deck: ${deckId}`);
            
            if (flashcards.length === 0) {
                return {
                    success: false,
                    message: `Found ${unknownWords.length} words but couldn't create flashcards. All words were filtered out by part-of-speech rules.`,
                    cards: []
                };
            } else {
                return {
                    success: false,
                    message: `Created ${flashcards.length} flashcards but couldn't save them to database. Please try again.`,
                    cards: []
                };
            }
        }
        
        return {
            success: true,
            message: `Successfully generated ${insertedCards.length} flashcards from ${unknownWords.length} words found.`,
            cards: insertedCards,
            deckId: deckId,
            deckName: deckName,
            stats: {
                totalWords: unknownWords.length,
                cardsCreated: insertedCards.length
            }
        };
        
    } catch (error) {
        console.error('Error generating flashcards:', error);
        return {
            success: false,
            message: error.message || 'Failed to generate flashcards',
            cards: []
        };
    }
}

module.exports = {
    generateFlashcardsFromURL,
    extractText,
    extractPageTitle,
    getExistingWords,
    getUserKnownWords,
    processText
};
