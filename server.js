const express = require('express');
const cors = require('cors');
const path = require('path');
const { initializeDatabase, query, queryOne, run } = require('./database');
const { generateFlashcardsFromURL } = require('./url-processor');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Initialize database on startup
initializeDatabase()
    .then(() => {
        console.log('Database initialized successfully');
        
        // Start server only after database is ready
        app.listen(PORT, () => {
            console.log(`SmartFlash server running on http://localhost:${PORT}`);
            console.log(`API available at http://localhost:${PORT}/api/decks`);
            console.log(`Database: smartflash.db`);
        }).on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`\n❌ Error: Port ${PORT} is already in use.`);
                console.error(`   Please stop the process using port ${PORT} or change the PORT environment variable.`);
                console.error(`   To find the process: netstat -ano | findstr :${PORT}`);
                console.error(`   To kill it: taskkill /PID <PID> /F\n`);
            } else {
                console.error('Server error:', err);
            }
            process.exit(1);
        });
    })
    .catch((error) => {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    });

// API Routes

// Get all decks with card counts
app.get('/api/decks', async (req, res) => {
    try {
        const decks = await query('SELECT id, name, cefr_level FROM decks');
        const result = {};
        
        for (const deck of decks) {
            const cards = await query(
                'SELECT id, front, back FROM cards WHERE deck_id = ? ORDER BY id',
                [deck.id]
            );
            result[deck.id] = {
                name: deck.name,
                cefrLevel: deck.cefr_level || null,
                cards: cards.map(card => ({
                    front: card.front,
                    back: card.back
                }))
            };
        }
        
        res.json(result);
    } catch (error) {
        console.error('Error fetching decks:', error);
        res.status(500).json({ error: 'Failed to fetch decks' });
    }
});

// Get a specific deck
app.get('/api/decks/:deckId', async (req, res) => {
    try {
        const { deckId } = req.params;
        const deck = await queryOne('SELECT id, name FROM decks WHERE id = ?', [deckId]);
        
        if (!deck) {
            return res.status(404).json({ error: 'Deck not found' });
        }
        
        const cards = await query(
            'SELECT id, front, back FROM cards WHERE deck_id = ? ORDER BY id',
            [deckId]
        );
        
        res.json({
            name: deck.name,
            cards: cards.map(card => ({
                front: card.front,
                back: card.back
            }))
        });
    } catch (error) {
        console.error('Error fetching deck:', error);
        res.status(500).json({ error: 'Failed to fetch deck' });
    }
});

// Get all cards from a deck
app.get('/api/decks/:deckId/cards', async (req, res) => {
    try {
        const { deckId } = req.params;
        
        // Check if deck exists
        const deck = await queryOne('SELECT id FROM decks WHERE id = ?', [deckId]);
        if (!deck) {
            return res.status(404).json({ error: 'Deck not found' });
        }
        
        const cards = await query(
            'SELECT id, front, back FROM cards WHERE deck_id = ? ORDER BY id',
            [deckId]
        );
        
        res.json(cards.map(card => ({
            front: card.front,
            back: card.back
        })));
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).json({ error: 'Failed to fetch cards' });
    }
});

// Add a new card to a deck
app.post('/api/decks/:deckId/cards', async (req, res) => {
    try {
        const { deckId } = req.params;
        const { front, back } = req.body;
        
        // Validate input
        if (!front || !back) {
            return res.status(400).json({ error: 'Front and back are required' });
        }
        
        // Check if deck exists
        const deck = await queryOne('SELECT id FROM decks WHERE id = ?', [deckId]);
        if (!deck) {
            return res.status(404).json({ error: 'Deck not found' });
        }
        
        // Insert card
        const result = await run(
            'INSERT INTO cards (deck_id, front, back) VALUES (?, ?, ?)',
            [deckId, front, back]
        );
        
        res.status(201).json({
            id: result.lastID,
            front,
            back
        });
    } catch (error) {
        console.error('Error adding card:', error);
        res.status(500).json({ error: 'Failed to add card' });
    }
});

// Update a card in a deck
app.put('/api/decks/:deckId/cards/:cardId', async (req, res) => {
    try {
        const { deckId, cardId } = req.params;
        const { front, back } = req.body;
        
        // Check if deck exists
        const deck = await queryOne('SELECT id FROM decks WHERE id = ?', [deckId]);
        if (!deck) {
            return res.status(404).json({ error: 'Deck not found' });
        }
        
        // Check if card exists
        const card = await queryOne(
            'SELECT id FROM cards WHERE id = ? AND deck_id = ?',
            [cardId, deckId]
        );
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }
        
        // Update card
        const updates = [];
        const values = [];
        
        if (front !== undefined) {
            updates.push('front = ?');
            values.push(front);
        }
        if (back !== undefined) {
            updates.push('back = ?');
            values.push(back);
        }
        
        if (updates.length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }
        
        values.push(cardId, deckId);
        await run(
            `UPDATE cards SET ${updates.join(', ')} WHERE id = ? AND deck_id = ?`,
            values
        );
        
        // Fetch updated card
        const updatedCard = await queryOne(
            'SELECT id, front, back FROM cards WHERE id = ? AND deck_id = ?',
            [cardId, deckId]
        );
        
        res.json({
            id: updatedCard.id,
            front: updatedCard.front,
            back: updatedCard.back
        });
    } catch (error) {
        console.error('Error updating card:', error);
        res.status(500).json({ error: 'Failed to update card' });
    }
});

// Delete a card from a deck
app.delete('/api/decks/:deckId/cards/:cardId', async (req, res) => {
    try {
        const { deckId, cardId } = req.params;
        
        // Check if deck exists
        const deck = await queryOne('SELECT id FROM decks WHERE id = ?', [deckId]);
        if (!deck) {
            return res.status(404).json({ error: 'Deck not found' });
        }
        
        // Check if card exists and delete
        const result = await run(
            'DELETE FROM cards WHERE id = ? AND deck_id = ?',
            [cardId, deckId]
        );
        
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Card not found' });
        }
        
        res.json({ message: 'Card deleted successfully' });
    } catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).json({ error: 'Failed to delete card' });
    }
});

// Delete a deck
app.delete('/api/decks/:deckId', async (req, res) => {
    try {
        const { deckId } = req.params;
        
        // Check if deck exists
        const deck = await queryOne('SELECT id, name FROM decks WHERE id = ?', [deckId]);
        if (!deck) {
            return res.status(404).json({ success: false, error: 'Deck not found' });
        }
        
        // Delete the deck (cards and stats will be deleted automatically due to CASCADE)
        await run('DELETE FROM decks WHERE id = ?', [deckId]);
        
        res.json({ 
            success: true,
            message: `Deck "${deck.name}" deleted successfully` 
        });
    } catch (error) {
        console.error('Error deleting deck:', error);
        res.status(500).json({ success: false, error: 'Failed to delete deck' });
    }
});

// Save user stats
app.post('/api/stats', async (req, res) => {
    try {
        const { stats, userId = 'default' } = req.body;
        
        if (!stats) {
            return res.status(400).json({ error: 'Stats are required' });
        }
        
        // Update stats for each deck
        for (const [deckId, deckStats] of Object.entries(stats)) {
            // Check if deck exists
            const deck = await queryOne('SELECT id FROM decks WHERE id = ?', [deckId]);
            if (!deck) {
                continue; // Skip invalid deck IDs
            }
            
            // Check if stats exist
            const existing = await queryOne(
                'SELECT id FROM stats WHERE deck_id = ? AND user_id = ?',
                [deckId, userId]
            );
            
            if (existing) {
                // Update existing stats
                await run(
                    'UPDATE stats SET known = ?, unknown = ?, updated_at = CURRENT_TIMESTAMP WHERE deck_id = ? AND user_id = ?',
                    [deckStats.known || 0, deckStats.unknown || 0, deckId, userId]
                );
            } else {
                // Insert new stats
                await run(
                    'INSERT INTO stats (deck_id, user_id, known, unknown, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)',
                    [deckId, userId, deckStats.known || 0, deckStats.unknown || 0]
                );
            }
        }
        
        res.json({ message: 'Stats saved successfully', stats });
    } catch (error) {
        console.error('Error saving stats:', error);
        res.status(500).json({ error: 'Failed to save stats' });
    }
});

// Get user stats
app.get('/api/stats', async (req, res) => {
    try {
        const userId = req.query.userId || 'default';
        const statsRows = await query(
            'SELECT deck_id, known, unknown FROM stats WHERE user_id = ?',
            [userId]
        );
        
        const stats = {};
        for (const row of statsRows) {
            stats[row.deck_id] = {
                known: row.known,
                unknown: row.unknown
            };
        }
        
        res.json(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

// Generate flashcards from URL
app.post('/api/generate-from-url', async (req, res) => {
    try {
        const { url, cefrLevel = 'B1', topN = 20 } = req.body;
        
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }
        
        // Validate URL format
        try {
            new URL(url);
        } catch (error) {
            return res.status(400).json({ error: 'Invalid URL format' });
        }
        
        // Validate CEFR level
        const validCEFRLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
        const targetCEFR = validCEFRLevels.includes(cefrLevel) ? cefrLevel : 'B1';
        
        // Validate topN
        const validTopN = Math.max(5, Math.min(50, parseInt(topN) || 20));
        
        // Generate flashcards with CEFR level and topN
        const result = await generateFlashcardsFromURL(url, targetCEFR, validTopN);
        
        if (result.success) {
            res.json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        console.error('Error in generate-from-url endpoint:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate flashcards'
        });
    }
});

// Quick Preview endpoint - preview words without creating deck
app.post('/api/preview-url', async (req, res) => {
    try {
        const { url, cefrLevel = 'B1', topN = 20 } = req.body;
        
        if (!url) {
            return res.status(400).json({ 
                success: false,
                message: 'URL is required' 
            });
        }
        
        // Validate URL format
        try {
            new URL(url);
        } catch (error) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid URL format' 
            });
        }
        
        // Validate CEFR level
        const validCEFRLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
        const targetCEFR = validCEFRLevels.includes(cefrLevel) ? cefrLevel : 'B1';
        
        // Validate topN
        const validTopN = Math.max(5, Math.min(50, parseInt(topN) || 20));
        
        // Import url-processor module
        const urlProcessor = require('./url-processor');
        const fetch = require('node-fetch');
        
        // Fetch webpage
        console.log('Preview: Fetching URL:', url);
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        if (!response.ok) {
            return res.status(400).json({
                success: false,
                message: `Failed to fetch URL: ${response.status} ${response.statusText}`
            });
        }
        
        const html = await response.text();
        
        // Extract page title
        const pageTitle = urlProcessor.extractPageTitle(html);
        
        // Extract text
        const text = urlProcessor.extractText(html);
        console.log(`Preview: Extracted ${text.length} characters of text`);
        
        if (text.length < 100) {
            return res.json({
                success: false,
                message: `Could not extract sufficient text from the webpage (only found ${text.length} characters). The page may be heavily JavaScript-based, require authentication, or have very little text content.`,
                words: []
            });
        }
        
        // Get existing words and user known words
        const existingWords = await urlProcessor.getExistingWords();
        const userKnownWords = await urlProcessor.getUserKnownWords();
        
        // Process text and find unknown words (without creating deck)
        const unknownWords = await urlProcessor.processText(text, existingWords, userKnownWords, targetCEFR, validTopN);
        
        res.json({
            success: true,
            message: `Preview: Found ${unknownWords.length} words that would be extracted`,
            pageTitle: pageTitle || `Flashcards from ${new URL(url).hostname}`,
            words: unknownWords.map(w => w.word),
            wordCount: unknownWords.length,
            cefrLevel: targetCEFR,
            topN: validTopN
        });
        
    } catch (error) {
        console.error('Error in preview-url endpoint:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to preview URL'
        });
    }
});

// AI Chat endpoint
app.post('/api/ai-chat', async (req, res) => {
    try {
        const { deckId, prompt } = req.body;
        
        if (!deckId || !prompt) {
            return res.status(400).json({ 
                success: false,
                message: 'Deck ID and prompt are required' 
            });
        }
        
        // Check if deck exists
        const deck = await queryOne('SELECT id, name FROM decks WHERE id = ?', [deckId]);
        if (!deck) {
            return res.status(404).json({ 
                success: false,
                message: 'Deck not found' 
            });
        }
        
        // Get all cards from the deck (increased limit for better interactions)
        const cards = await query(
            'SELECT front, back FROM cards WHERE deck_id = ? ORDER BY id',
            [deckId]
        );
        
        if (cards.length === 0) {
            return res.json({
                success: true,
                response: `The deck "${deck.name}" is empty. Add some flashcards first!`
            });
        }
        
        // Create a simple AI response based on the prompt and cards
        // In a production environment, you would integrate with an AI service like OpenAI
        let response = '';
        
        const promptLower = prompt.toLowerCase();
        
        // Quiz/Test/Question
        if (promptLower.includes('quiz') || promptLower.includes('test') || promptLower.includes('question')) {
            const randomCards = cards.sort(() => 0.5 - Math.random()).slice(0, 5);
            response = `📝 Quiz: "${deck.name}"\n\n`;
            randomCards.forEach((card, index) => {
                response += `${index + 1}. What does "${card.front}" mean?\n`;
            });
            response += `\n💡 Try to answer these, then check your answers by studying the deck!`;
        
        // Explain/What is/Meaning
        } else if (promptLower.includes('explain') || promptLower.includes('what is') || promptLower.includes('meaning')) {
            const words = prompt.split(' ').filter(w => w.length > 3);
            const matchingCard = cards.find(c => 
                words.some(word => c.front.toLowerCase().includes(word.toLowerCase()))
            );
            
            if (matchingCard) {
                response = `📖 "${matchingCard.front}"\n\n${matchingCard.back}`;
            } else {
                response = `I found ${cards.length} cards in "${deck.name}". Here are some examples:\n\n`;
                cards.slice(0, 3).forEach(card => {
                    response += `• ${card.front}: ${card.back.substring(0, 100)}...\n\n`;
                });
            }
        
        // Summary/Overview
        } else if (promptLower.includes('summary') || promptLower.includes('overview')) {
            response = `📊 Summary of "${deck.name}":\n\n`;
            response += `• Total cards: ${cards.length}\n`;
            response += `• Sample words: ${cards.slice(0, 10).map(c => c.front).join(', ')}\n\n`;
            response += `This deck contains vocabulary flashcards. Study them to improve your knowledge!`;
        
        // Practice/Show random cards
        } else if (promptLower.includes('practice') || promptLower.includes('random') || promptLower.includes('show me')) {
            const randomCards = cards.sort(() => 0.5 - Math.random()).slice(0, 3);
            response = `🎯 Practice Cards from "${deck.name}":\n\n`;
            randomCards.forEach((card, index) => {
                response += `${index + 1}. ${card.front}\n   → ${card.back.substring(0, 150)}${card.back.length > 150 ? '...' : ''}\n\n`;
            });
            response += `💡 Study these cards, then ask for more!`;
        
        // Examples/Example sentences
        } else if (promptLower.includes('example') || promptLower.includes('sentence')) {
            const randomCards = cards.sort(() => 0.5 - Math.random()).slice(0, 5);
            response = `📝 Example Sentences:\n\n`;
            randomCards.forEach((card, index) => {
                const word = card.front;
                // Try to extract example from back if available
                const exampleMatch = card.back.match(/[Ee]xample[:\s]+(.+?)(?:\n|$)/);
                if (exampleMatch) {
                    response += `${index + 1}. ${exampleMatch[1]}\n   (${word})\n\n`;
                } else {
                    // Create a simple example
                    response += `${index + 1}. The word "${word}" means: ${card.back.split('\n')[0]}\n\n`;
                }
            });
        
        // Review/What to review
        } else if (promptLower.includes('review') || promptLower.includes('what should i study')) {
            const randomCards = cards.sort(() => 0.5 - Math.random()).slice(0, 5);
            response = `📚 Words to Review from "${deck.name}":\n\n`;
            randomCards.forEach((card, index) => {
                response += `${index + 1}. ${card.front}\n`;
            });
            response += `\n💡 Focus on these words to improve your vocabulary!`;
        
        // Hardest/Most difficult
        } else if (promptLower.includes('hardest') || promptLower.includes('most difficult') || promptLower.includes('complex')) {
            // Find longest words (often more complex)
            const sortedByLength = [...cards].sort((a, b) => b.front.length - a.front.length).slice(0, 5);
            response = `🔥 Most Complex Words in "${deck.name}":\n\n`;
            sortedByLength.forEach((card, index) => {
                response += `${index + 1}. ${card.front} (${card.front.length} letters)\n   ${card.back.substring(0, 100)}...\n\n`;
            });
        
        // Easiest/Simplest
        } else if (promptLower.includes('easiest') || promptLower.includes('simplest') || promptLower.includes('simple')) {
            // Find shortest words (often simpler)
            const sortedByLength = [...cards].sort((a, b) => a.front.length - b.front.length).slice(0, 5);
            response = `✨ Simplest Words in "${deck.name}":\n\n`;
            sortedByLength.forEach((card, index) => {
                response += `${index + 1}. ${card.front} (${card.front.length} letters)\n   ${card.back.substring(0, 100)}...\n\n`;
            });
        
        // Similar words
        } else if (promptLower.includes('similar') || promptLower.includes('related') || promptLower.includes('like')) {
            const randomCard = cards[Math.floor(Math.random() * cards.length)];
            const word = randomCard.front.toLowerCase();
            // Find words with similar length or starting letter
            const similar = cards.filter(c => {
                const cWord = c.front.toLowerCase();
                return cWord !== word && (
                    cWord.startsWith(word[0]) || 
                    Math.abs(cWord.length - word.length) <= 2
                );
            }).slice(0, 5);
            
            response = `🔗 Words Similar to "${randomCard.front}":\n\n`;
            if (similar.length > 0) {
                similar.forEach((card, index) => {
                    response += `${index + 1}. ${card.front}\n`;
                });
            } else {
                response += `Here are some random words from the deck:\n\n`;
                cards.slice(0, 5).forEach((card, index) => {
                    response += `${index + 1}. ${card.front}\n`;
                });
            }
        
        // All words/List all
        } else if (promptLower.includes('all words') || promptLower.includes('list all') || promptLower.includes('show all')) {
            const wordList = cards.map(c => c.front);
            response = `📋 All Words in "${deck.name}" (${wordList.length} total):\n\n`;
            // Show in columns for better readability
            const chunkSize = 5;
            for (let i = 0; i < wordList.length; i += chunkSize) {
                const chunk = wordList.slice(i, i + chunkSize);
                response += chunk.join(', ') + '\n';
            }
        
        // Study tips/Help
        } else if (promptLower.includes('help') || promptLower.includes('study tip') || promptLower.includes('how to study')) {
            response = `💡 Study Tips for "${deck.name}":\n\n`;
            response += `1. Review regularly: Study a few cards each day\n`;
            response += `2. Use spaced repetition: Review cards you find difficult more often\n`;
            response += `3. Practice actively: Try to recall the meaning before flipping\n`;
            response += `4. Create connections: Link new words to words you already know\n`;
            response += `5. Use in context: Try to use the words in sentences\n\n`;
            response += `📊 This deck has ${cards.length} cards. Aim to master 5-10 cards per session!`;
        
        // Count/Statistics
        } else if (promptLower.includes('count') || promptLower.includes('how many') || promptLower.includes('statistics')) {
            const avgLength = cards.reduce((sum, c) => sum + c.front.length, 0) / cards.length;
            response = `📊 Statistics for "${deck.name}":\n\n`;
            response += `• Total cards: ${cards.length}\n`;
            response += `• Average word length: ${avgLength.toFixed(1)} letters\n`;
            response += `• Shortest word: ${Math.min(...cards.map(c => c.front.length))} letters\n`;
            response += `• Longest word: ${Math.max(...cards.map(c => c.front.length))} letters\n`;
        
        // Generic response with all options
        } else {
            response = `🤖 I can help you with "${deck.name}" (${cards.length} cards). Here's what I can do:\n\n`;
            response += `📝 Quiz & Practice:\n`;
            response += `• "Quiz me" - Get practice questions\n`;
            response += `• "Show me random cards" - Practice with random cards\n`;
            response += `• "Give me examples" - See example sentences\n\n`;
            response += `📖 Learning:\n`;
            response += `• "Explain [word]" - Get word definitions\n`;
            response += `• "What's the hardest word?" - Find complex words\n`;
            response += `• "Show me similar words" - Find related words\n\n`;
            response += `📊 Information:\n`;
            response += `• "Summary" - Deck overview\n`;
            response += `• "Show all words" - List all words\n`;
            response += `• "Statistics" - Deck statistics\n`;
            response += `• "Help me study" - Study tips\n\n`;
            response += `💡 Try any of these commands!`;
        }
        
        res.json({
            success: true,
            response: response
        });
        
    } catch (error) {
        console.error('Error in AI chat:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process AI request'
        });
    }
});

// Serve the main app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
