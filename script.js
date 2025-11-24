// Flashcard Data - Can be loaded from backend or used as fallback
let decks = {
    python: {
        name: 'Python',
        cards: [
            { front: 'What is a list comprehension?', back: 'A concise way to create lists in Python using a single line of code. Example: [x*2 for x in range(5)]' },
            { front: 'What is the difference between == and ===?', back: 'In Python, == checks equality. There is no === operator. Use == for value comparison and is for identity comparison.' },
            { front: 'What is a decorator?', back: 'A decorator is a function that modifies or extends another function without changing its source code. It uses the @ symbol.' },
            { front: 'What is __init__?', back: 'A special method in Python classes that is automatically called when an object is created. It initializes the object\'s attributes.' },
            { front: 'What is the difference between append() and extend()?', back: 'append() adds a single element to the end of a list. extend() adds all elements from an iterable to the end of a list.' },
            { front: 'What is a generator?', back: 'A function that returns an iterator using yield instead of return. It generates values on-the-fly and is memory efficient.' },
            { front: 'What is *args and **kwargs?', back: '*args allows passing a variable number of positional arguments. **kwargs allows passing a variable number of keyword arguments as a dictionary.' },
            { front: 'What is a lambda function?', back: 'An anonymous function defined with the lambda keyword. Example: lambda x: x * 2' },
            { front: 'What is the difference between list and tuple?', back: 'Lists are mutable (can be changed) and use square brackets []. Tuples are immutable (cannot be changed) and use parentheses ().' },
            { front: 'What is PEP 8?', back: 'Python Enhancement Proposal 8, the style guide for Python code that defines conventions for writing readable code.' },
            { front: 'What is a dictionary comprehension?', back: 'Similar to list comprehension but creates dictionaries. Example: {x: x*2 for x in range(5)}' },
            { front: 'What is the Global Interpreter Lock (GIL)?', back: 'A mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes at once. It can limit multi-threading performance.' },
            { front: 'What is __str__ vs __repr__?', back: '__str__ returns a human-readable string representation. __repr__ returns an unambiguous string representation, ideally valid Python code.' },
            { front: 'What is a context manager?', back: 'An object that defines methods __enter__ and __exit__ to be used with the "with" statement. Example: with open("file.txt") as f:' },
            { front: 'What is the difference between deep copy and shallow copy?', back: 'Shallow copy creates a new object but references the same nested objects. Deep copy creates a completely independent copy of all nested objects.' },
            { front: 'What is a metaclass?', back: 'A class whose instances are classes. It defines how classes are created. The default metaclass is "type".' },
            { front: 'What is the difference between __getattr__ and __getattribute__?', back: '__getattr__ is called only when an attribute is not found. __getattribute__ is called for every attribute access.' },
            { front: 'What is a closure?', back: 'A nested function that has access to variables in the enclosing (outer) function\'s scope, even after the outer function has finished executing.' },
            { front: 'What is the difference between @staticmethod and @classmethod?', back: '@staticmethod doesn\'t receive any implicit first argument. @classmethod receives the class as the first argument (cls).' },
            { front: 'What is duck typing?', back: 'A programming concept where the type or class of an object is less important than the methods it defines. "If it walks like a duck and quacks like a duck, it\'s a duck."' },
            { front: 'What is the difference between __new__ and __init__?', back: '__new__ is responsible for creating the instance (called first). __init__ is responsible for initializing the instance (called after __new__).' },
            { front: 'What is a descriptor?', back: 'An object attribute with "binding behavior" defined by methods __get__, __set__, or __delete__. Properties, methods, and class methods are all descriptors.' },
            { front: 'What is the difference between import and from import?', back: 'import module imports the entire module. from module import name imports only specific names from the module.' },
            { front: 'What is a namespace?', back: 'A mapping from names to objects. Examples include the set of built-in names, global names in a module, and local names in a function.' },
            { front: 'What is the difference between range() and xrange()?', back: 'In Python 2, range() returns a list while xrange() returns an iterator. In Python 3, range() behaves like xrange() (returns an iterator).' }
        ]
    },
    english: {
        name: 'English Vocabulary',
        cards: [
            { front: 'Serendipity', back: 'The occurrence of pleasant or beneficial things by chance in a happy or beneficial way.' },
            { front: 'Ephemeral', back: 'Lasting for a very short time; transient.' },
            { front: 'Ubiquitous', back: 'Present, appearing, or found everywhere.' },
            { front: 'Eloquent', back: 'Fluent or persuasive in speaking or writing.' },
            { front: 'Meticulous', back: 'Showing great attention to detail; very careful and precise.' },
            { front: 'Resilient', back: 'Able to recover quickly from difficulties; tough.' },
            { front: 'Ambiguous', back: 'Having more than one possible meaning; unclear or inexact.' },
            { front: 'Pragmatic', back: 'Dealing with things in a practical and sensible way rather than theoretical.' },
            { front: 'Inevitable', back: 'Certain to happen; unavoidable.' },
            { front: 'Paradox', back: 'A statement that contradicts itself but might be true.' },
            { front: 'Perspicacious', back: 'Having keen mental perception and understanding; discerning.' },
            { front: 'Magnanimous', back: 'Generous in forgiving an insult or injury; free from petty resentfulness.' },
            { front: 'Vicarious', back: 'Experienced in the imagination through the feelings or actions of another person.' },
            { front: 'Esoteric', back: 'Intended for or likely to be understood by only a small number of people with specialized knowledge.' },
            { front: 'Cacophony', back: 'A harsh, discordant mixture of sounds.' },
            { front: 'Euphoria', back: 'A feeling or state of intense excitement and happiness.' },
            { front: 'Melancholy', back: 'A feeling of pensive sadness, typically with no obvious cause.' },
            { front: 'Quintessential', back: 'Representing the most perfect example of a quality or class.' },
            { front: 'Serendipitous', back: 'Occurring or discovered by chance in a happy or beneficial way.' },
            { front: 'Ineffable', back: 'Too great or extreme to be expressed or described in words.' },
            { front: 'Laconic', back: 'Using very few words; concise to the point of seeming rude or mysterious.' },
            { front: 'Profligate', back: 'Recklessly extravagant or wasteful in the use of resources.' },
            { front: 'Sagacious', back: 'Having or showing keen mental discernment and good judgment; wise.' },
            { front: 'Taciturn', back: 'Reserved or uncommunicative in speech; saying little.' },
            { front: 'Volatile', back: 'Liable to change rapidly and unpredictably, especially for the worse.' },
            { front: 'Wistful', back: 'Having or showing a feeling of vague or regretful longing.' },
            { front: 'Zealous', back: 'Having or showing great energy or passion in pursuit of a cause or objective.' },
            { front: 'Aberration', back: 'A departure from what is normal, usual, or expected, typically an unwelcome one.' },
            { front: 'Benevolent', back: 'Well meaning and kindly.' },
            { front: 'Clandestine', back: 'Kept secret or done secretively, especially because illicit.' }
        ]
    },
    linux: {
        name: 'Linux Commands',
        cards: [
            { front: 'What does ls -la do?', back: 'Lists all files and directories (including hidden ones) with detailed information in long format.' },
            { front: 'What does grep do?', back: 'Searches for patterns in files. Example: grep "error" log.txt finds all lines containing "error".' },
            { front: 'What does chmod 755 do?', back: 'Sets file permissions: owner can read/write/execute (7), group can read/execute (5), others can read/execute (5).' },
            { front: 'What does sudo mean?', back: 'Superuser do - allows a permitted user to execute a command as the superuser or another user.' },
            { front: 'What does find do?', back: 'Searches for files and directories. Example: find /home -name "*.txt" finds all .txt files in /home.' },
            { front: 'What does tar -xzf do?', back: 'Extracts a gzipped tar archive. -x extracts, -z handles gzip compression, -f specifies the filename.' },
            { front: 'What does ps aux do?', back: 'Displays all running processes with detailed information including user, CPU, memory usage.' },
            { front: 'What does kill -9 do?', back: 'Forcefully terminates a process. -9 sends SIGKILL signal which cannot be ignored.' },
            { front: 'What does ssh do?', back: 'Secure Shell - allows secure remote login and command execution on another computer over a network.' },
            { front: 'What does tail -f do?', back: 'Displays the last lines of a file and follows it, showing new lines as they are added (useful for log files).' },
            { front: 'What does chown do?', back: 'Changes the owner and/or group of a file or directory. Example: chown user:group file.txt' },
            { front: 'What does wget do?', back: 'Downloads files from the web. Example: wget https://example.com/file.zip' },
            { front: 'What does curl do?', back: 'Transfers data to or from a server. Can be used for downloading files or making HTTP requests.' },
            { front: 'What does sed do?', back: 'Stream editor for filtering and transforming text. Example: sed "s/old/new/g" file.txt replaces "old" with "new".' },
            { front: 'What does awk do?', back: 'Pattern scanning and processing language. Useful for text processing and data extraction from files.' },
            { front: 'What does top do?', back: 'Displays real-time information about running processes, including CPU and memory usage.' },
            { front: 'What does htop do?', back: 'An interactive process viewer (enhanced version of top) with a more user-friendly interface.' },
            { front: 'What does df -h do?', back: 'Shows disk space usage of file systems in human-readable format (KB, MB, GB).' },
            { front: 'What does du -sh do?', back: 'Shows disk usage of a directory. -s summarizes, -h shows human-readable format.' },
            { front: 'What does scp do?', back: 'Secure copy - copies files between hosts on a network using SSH. Example: scp file.txt user@host:/path/' },
            { front: 'What does rsync do?', back: 'Synchronizes files and directories between locations. More efficient than scp for large transfers.' },
            { front: 'What does systemctl do?', back: 'Controls systemd services. Examples: systemctl start service, systemctl enable service, systemctl status service' },
            { front: 'What does journalctl do?', back: 'Views and manages systemd journal logs. Example: journalctl -u service-name shows logs for a service.' },
            { front: 'What does iptables do?', back: 'Configures Linux firewall rules. Used to set up packet filtering and NAT rules.' },
            { front: 'What does netstat do?', back: 'Shows network connections, routing tables, and network interface statistics.' },
            { front: 'What does lsof do?', back: 'Lists open files and the processes that opened them. Useful for finding what process is using a file or port.' },
            { front: 'What does strace do?', back: 'Traces system calls and signals made by a process. Useful for debugging and understanding program behavior.' },
            { front: 'What does tcpdump do?', back: 'Captures and analyzes network traffic. Example: tcpdump -i eth0 captures packets on interface eth0.' },
            { front: 'What does cron do?', back: 'Time-based job scheduler. Uses crontab to schedule commands to run periodically at fixed times.' },
            { front: 'What does screen do?', back: 'Terminal multiplexer that allows multiple terminal sessions within a single window. Sessions persist after disconnection.' }
        ]
    }
};

// App State
let currentDeck = null;
let currentCardIndex = 0;
let isFlipped = false;
let stats = {
    python: { known: 0, unknown: 0 },
    english: { known: 0, unknown: 0 },
    linux: { known: 0, unknown: 0 },
    generated: { known: 0, unknown: 0 }
};

// DOM Elements
const deckSelection = document.getElementById('deck-selection');
const studyScreen = document.getElementById('study-screen');
const deckCards = document.querySelectorAll('.deck-card');
const backBtn = document.getElementById('back-btn');
const flipBtn = document.getElementById('flip-btn');
const forgotBtn = document.getElementById('forgot-btn');
const knewBtn = document.getElementById('knew-btn');
const nextBtn = document.getElementById('next-btn');
const flashcard = document.getElementById('flashcard');
const cardFrontText = document.getElementById('card-front-text');
const cardBackText = document.getElementById('card-back-text');
const currentDeckName = document.getElementById('current-deck-name');
const cardNumber = document.getElementById('card-number');
const totalCards = document.getElementById('total-cards');
const deckKnown = document.getElementById('deck-known');
const deckUnknown = document.getElementById('deck-unknown');
const totalKnown = document.getElementById('total-known');
const totalUnknown = document.getElementById('total-unknown');

// Backend API configuration
// Automatically detect if we're in production or development
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api'
    : `${window.location.origin}/api`;
let useBackend = false;

// Initialize
async function init() {
    // Request microphone permission automatically on page load
    requestMicrophonePermission();
    
    loadStats();
    loadCEFRLevel(); // Load saved CEFR level preference
    await loadDecksFromBackend();
    updateDeckCounts();
    updateDeckGrid(); // Dynamically create deck cards
    updateStatsDisplay();
    setupEventListeners();
    setupModuleEventListeners(); // Setup new module listeners
    setupBottomNavigation(); // Setup bottom nav
    populateDeckExplorer(); // Populate deck explorer
    populateAIDeckSelect(); // Populate AI deck selector
    registerServiceWorker();
}

// Request microphone permission automatically
async function requestMicrophonePermission() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.log('MediaDevices API not supported');
        return;
    }
    
    try {
        // Request microphone permission
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Stop the stream immediately - we just needed permission
        stream.getTracks().forEach(track => track.stop());
        console.log('Microphone permission granted');
    } catch (error) {
        // Permission denied or error - that's okay, user can grant it later when they click Practice
        console.log('Microphone permission not granted yet:', error.name);
        // Don't show alert here - permission will be requested again when user clicks Practice
    }
}

// Load CEFR level from localStorage
function loadCEFRLevel() {
    const saved = localStorage.getItem('smartflash-cefr-level');
    const cefrSelect = document.getElementById('cefr-level');
    if (saved && cefrSelect) {
        cefrSelect.value = saved;
    }
}

// Save CEFR level to localStorage
function saveCEFRLevel() {
    const cefrSelect = document.getElementById('cefr-level');
    if (cefrSelect) {
        localStorage.setItem('smartflash-cefr-level', cefrSelect.value);
    }
}

// Try to load decks from backend, fallback to local data
async function loadDecksFromBackend() {
    try {
        const response = await fetch(`${API_BASE_URL}/decks`);
        if (response.ok) {
            const backendDecks = await response.json();
            // Merge backend decks with local decks (backend takes precedence for overlapping IDs)
            decks = { ...decks, ...backendDecks };
            useBackend = true;
            console.log('Loaded decks from backend:', Object.keys(backendDecks).length, 'decks');
        } else {
            console.log('Backend not available, using local data');
        }
    } catch (error) {
        console.log('Backend not available, using local data:', error.message);
        // Continue with local data
    }
}

// Update deck counts in UI
function updateDeckCounts() {
    const pythonCount = document.getElementById('python-count');
    const englishCount = document.getElementById('english-count');
    const linuxCount = document.getElementById('linux-count');
    
    if (pythonCount && decks.python) {
        pythonCount.textContent = `${decks.python.cards.length} cards`;
    }
    if (englishCount && decks.english) {
        englishCount.textContent = `${decks.english.cards.length} cards`;
    }
    if (linuxCount && decks.linux) {
        linuxCount.textContent = `${decks.linux.cards.length} cards`;
    }
    
    // Update counts for dynamically generated decks
    for (const [deckId, deckData] of Object.entries(decks)) {
        if (deckId.startsWith('gen-')) {
            const countElement = document.getElementById(`${deckId}-count`);
            if (countElement) {
                countElement.textContent = `${deckData.cards.length} cards`;
            }
        }
    }
}

// Get CEFR level display info
function getCEFRInfo(level) {
    const cefrInfo = {
        'A1': { label: 'A1 - Beginner', color: '#4CAF50', icon: '🟢' },
        'A2': { label: 'A2 - Elementary', color: '#8BC34A', icon: '🟡' },
        'B1': { label: 'B1 - Intermediate', color: '#FFC107', icon: '🟠' },
        'B2': { label: 'B2 - Upper Intermediate', color: '#FF9800', icon: '🟠' },
        'C1': { label: 'C1 - Advanced', color: '#F44336', icon: '🔴' },
        'C2': { label: 'C2 - Proficient', color: '#D32F2F', icon: '🔴' }
    };
    return cefrInfo[level] || { label: 'General', color: '#9E9E9E', icon: '⚪' };
}

// Dynamically update deck grid with all decks organized by CEFR level
function updateDeckGrid() {
    const deckCategories = document.getElementById('deck-categories');
    if (!deckCategories) return;
    
    // Clear existing content
    deckCategories.innerHTML = '';
    
    // Organize decks by CEFR level
    const decksByLevel = {
        'A1': [],
        'A2': [],
        'B1': [],
        'B2': [],
        'C1': [],
        'C2': [],
        'general': [] // For decks without CEFR level (python, linux, etc.)
    };
    
    // Categorize all decks
    for (const [deckId, deckData] of Object.entries(decks)) {
        const cefrLevel = deckData.cefrLevel || null;
        
        if (cefrLevel && decksByLevel[cefrLevel]) {
            decksByLevel[cefrLevel].push({ id: deckId, ...deckData });
        } else {
            // Main decks (python, english, linux) go to general
            if (['python', 'english', 'linux'].includes(deckId)) {
                decksByLevel.general.push({ id: deckId, ...deckData });
            } else {
                // Generated decks without CEFR level go to general
                decksByLevel.general.push({ id: deckId, ...deckData });
            }
        }
    }
    
    // Create category sections
    const cefrOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'general'];
    
    for (const level of cefrOrder) {
        const levelDecks = decksByLevel[level];
        if (levelDecks.length === 0) continue;
        
        // Create category header
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'deck-category';
        
        const cefrInfo = level === 'general' 
            ? { label: 'General Decks', color: '#9E9E9E', icon: '📚' }
            : getCEFRInfo(level);
        
        categoryDiv.innerHTML = `
            <div class="category-header" style="border-left: 4px solid ${cefrInfo.color}">
                <h3 class="category-title">${cefrInfo.icon} ${cefrInfo.label}</h3>
                <span class="category-count">${levelDecks.length} deck${levelDecks.length !== 1 ? 's' : ''}</span>
            </div>
            <div class="deck-grid"></div>
        `;
        
        const deckGrid = categoryDiv.querySelector('.deck-grid');
        
        // Add decks to this category
        for (const deck of levelDecks) {
            const deckCard = createDeckCard(deck.id, deck);
            deckGrid.appendChild(deckCard);
        }
        
        deckCategories.appendChild(categoryDiv);
    }
    
    // Re-attach event listeners for all deck cards
    setupDeckEventListeners();
}

// Create a deck card element
function createDeckCard(deckId, deckData) {
    const deckCard = document.createElement('div');
    deckCard.className = 'deck-card';
    deckCard.setAttribute('data-deck', deckId);
    
    // Determine icon based on deck type
    let icon = '📖';
    if (deckId === 'python') icon = '🐍';
    else if (deckId === 'english') icon = '📚';
    else if (deckId === 'linux') icon = '🐧';
    else if (deckId.startsWith('gen-')) icon = '📖';
    
    // Get CEFR badge if available
    let cefrBadge = '';
    if (deckData.cefrLevel) {
        const cefrInfo = getCEFRInfo(deckData.cefrLevel);
        cefrBadge = `<span class="cefr-badge" style="background: ${cefrInfo.color}">${deckData.cefrLevel}</span>`;
    }
    
    deckCard.innerHTML = `
        <div class="deck-icon">${icon}</div>
        <h2>${deckData.name}</h2>
        <p class="deck-count" id="${deckId}-count">${deckData.cards.length} cards</p>
        ${cefrBadge}
    `;
    
    return deckCard;
}

// Setup event listeners for deck cards
function setupDeckEventListeners() {
    const deckCards = document.querySelectorAll('.deck-card');
    deckCards.forEach(card => {
        // Remove existing listeners by cloning
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        
        // Add new listener
        newCard.addEventListener('click', () => {
            const deckKey = newCard.dataset.deck;
            if (deckKey && decks[deckKey]) {
                startDeck(deckKey);
            }
        });
    });
}

// Event Listeners
function setupEventListeners() {
    // Deck selection - use setupDeckEventListeners for dynamic decks
    setupDeckEventListeners();

    // Re-query DOM elements to ensure they exist (in case they weren't found initially)
    const backBtnEl = document.getElementById('back-btn');
    const flipBtnEl = document.getElementById('flip-btn');
    const forgotBtnEl = document.getElementById('forgot-btn');
    const knewBtnEl = document.getElementById('knew-btn');
    const nextBtnEl = document.getElementById('next-btn');
    const flashcardEl = document.getElementById('flashcard');

    // Back button
    if (backBtnEl) {
        backBtnEl.addEventListener('click', () => {
            showDeckSelection();
        });
    } else {
        console.warn('Back button not found');
    }

    // Flip button
    if (flipBtnEl) {
        flipBtnEl.addEventListener('click', flipCard);
    } else {
        console.warn('Flip button not found');
    }

    // Flashcard click
    if (flashcardEl) {
        flashcardEl.addEventListener('click', flipCard);
    } else {
        console.warn('Flashcard element not found');
    }

    // Action buttons
    if (forgotBtnEl) {
        forgotBtnEl.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Forgot button clicked');
            markCard(false);
        });
    } else {
        console.warn('Forgot button not found');
    }
    
    if (knewBtnEl) {
        knewBtnEl.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Knew button clicked');
            markCard(true);
        });
    } else {
        console.warn('Knew button not found');
    }

    // Next button
    if (nextBtnEl) {
        nextBtnEl.addEventListener('click', nextCard);
    } else {
        console.warn('Next button not found');
    }
    
    // Audio/TTS buttons
    const ttsWordBtn = document.getElementById('tts-word-btn');
    const ttsSentenceBtn = document.getElementById('tts-sentence-btn');
    const pronunciationBtn = document.getElementById('pronunciation-btn');
    
    if (ttsWordBtn) {
        ttsWordBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            speakWord();
        });
    }
    
    if (ttsSentenceBtn) {
        ttsSentenceBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            speakSentence();
        });
    }
    
    if (pronunciationBtn) {
        pronunciationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            startPronunciationPractice();
        });
    }
    
    // Close pronunciation modal function
    function closePronunciationModal(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const pronunciationModal = document.getElementById('pronunciation-modal');
        if (pronunciationModal) {
            pronunciationModal.style.display = 'none';
        }
    }
    
    // Close button
    const closeModalBtn = document.getElementById('close-pronunciation-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            closePronunciationModal(e);
        });
    }
    
    // Close modal when clicking overlay (outside modal content)
    const pronunciationModal = document.getElementById('pronunciation-modal');
    if (pronunciationModal) {
        // Click on modal overlay should close and prevent any other actions
        const overlay = pronunciationModal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                closePronunciationModal(e);
            });
        }
        
        // Click on modal container (but not content) should also close
        pronunciationModal.addEventListener('click', (e) => {
            // Only close if clicking directly on the modal container, not on modal-content
            if (e.target === pronunciationModal) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                closePronunciationModal(e);
            }
        });
        
        // Prevent closing when clicking inside modal content and stop propagation
        const modalContent = pronunciationModal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', (e) => {
                e.stopPropagation();
                e.stopImmediatePropagation();
            });
        }
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const pronunciationModal = document.getElementById('pronunciation-modal');
            if (pronunciationModal && pronunciationModal.style.display === 'flex') {
                e.preventDefault();
                e.stopPropagation();
                closePronunciationModal(e);
            }
        }
    });
    
    // Help button toggle
    const helpButtons = document.querySelectorAll('.help-btn');
    helpButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const helpId = btn.getAttribute('data-help');
            const helpPanel = document.getElementById(`help-${helpId}`);
            if (helpPanel) {
                const isVisible = helpPanel.style.display !== 'none';
                helpPanel.style.display = isVisible ? 'none' : 'block';
                // Update button appearance
                if (isVisible) {
                    btn.style.background = 'rgba(74, 144, 226, 0.1)';
                } else {
                    btn.style.background = 'rgba(74, 144, 226, 0.25)';
                    btn.style.borderColor = 'var(--primary-color)';
                }
            }
        });
    });
    
    // URL generation
    const generateBtn = document.getElementById('generate-btn');
    const urlInput = document.getElementById('url-input');
    const cefrSelect = document.getElementById('cefr-level');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', generateFlashcardsFromURL);
    }
    
    if (urlInput) {
        urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                generateFlashcardsFromURL();
            }
        });
    }
    
    // Save CEFR level when changed
    if (cefrSelect) {
        cefrSelect.addEventListener('change', saveCEFRLevel);
    }
    
    // CEFR info tooltip
    const cefrInfo = document.getElementById('cefr-info');
    if (cefrInfo) {
        cefrInfo.addEventListener('click', () => {
            const info = `
CEFR Levels:
• A1-A2: Beginner (1,000 most common words)
• B1-B2: Intermediate (3,000 most common words)
• C1-C2: Advanced (beyond 3,000 words)

Words are checked online for appropriate difficulty level.
            `.trim();
            alert(info);
        });
    }
}

// Deck Management
function startDeck(deckKey) {
    // Check if deck exists
    if (!decks[deckKey]) {
        console.error('Deck not found:', deckKey);
        alert('Deck not found. Please try again.');
        return;
    }
    
    // Check if deck has cards
    if (!decks[deckKey].cards || decks[deckKey].cards.length === 0) {
        alert('This deck is empty. Please generate some flashcards first.');
        return;
    }
    
    currentDeck = deckKey;
    currentCardIndex = 0;
    isFlipped = false;
    
    // Initialize stats for this deck if it doesn't exist
    if (!stats[deckKey]) {
        stats[deckKey] = { known: 0, unknown: 0 };
    }
    
    const currentDeckName = document.getElementById('current-deck-name');
    const totalCards = document.getElementById('total-cards');
    
    if (currentDeckName) {
        currentDeckName.textContent = decks[deckKey].name;
    }
    if (totalCards) {
        totalCards.textContent = decks[deckKey].cards.length;
    }
    
    showStudyScreen();
    displayCard();
    updateStudyStats();
}

function showDeckSelection() {
    deckSelection.classList.add('active');
    studyScreen.classList.remove('active');
    updateStatsDisplay();
}

function showStudyScreen() {
    deckSelection.classList.remove('active');
    studyScreen.classList.add('active');
}

// Card Display
function displayCard() {
    // Safety check
    if (!decks[currentDeck] || !decks[currentDeck].cards || decks[currentDeck].cards.length === 0) {
        console.error('No cards available for deck:', currentDeck);
        return;
    }
    
    const card = decks[currentDeck].cards[currentCardIndex];
    if (!card) {
        console.error('Card not found at index:', currentCardIndex);
        return;
    }
    
    cardFrontText.textContent = card.front;
    cardBackText.textContent = card.back;
    
    // Hide pronunciation modal when displaying new card
    const pronunciationModal = document.getElementById('pronunciation-modal');
    if (pronunciationModal) {
        pronunciationModal.style.display = 'none';
    }
    
    // Always ensure card shows front (word) when displaying
    isFlipped = false;
    const flashcardEl = document.getElementById('flashcard');
    if (flashcardEl) {
        flashcardEl.classList.remove('flipped');
    }
    
    // Update card number
    if (cardNumber) {
        cardNumber.textContent = currentCardIndex + 1;
    }
    
    // Re-query buttons to ensure they exist
    const forgotBtnEl = document.getElementById('forgot-btn');
    const knewBtnEl = document.getElementById('knew-btn');
    const nextBtnEl = document.getElementById('next-btn');
    
    // Disable action buttons until flipped
    if (forgotBtnEl) {
        forgotBtnEl.disabled = true;
    }
    if (knewBtnEl) {
        knewBtnEl.disabled = true;
    }
    if (nextBtnEl) {
        nextBtnEl.disabled = true;
    }
}

function flipCard(e) {
    // Don't flip if modal is open
    const pronunciationModal = document.getElementById('pronunciation-modal');
    if (pronunciationModal && pronunciationModal.style.display === 'flex') {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        return;
    }
    
    isFlipped = !isFlipped;
    const flashcardEl = document.getElementById('flashcard');
    if (flashcardEl) {
        flashcardEl.classList.toggle('flipped');
    }
    
    // Re-query buttons to ensure they exist
    const forgotBtnEl = document.getElementById('forgot-btn');
    const knewBtnEl = document.getElementById('knew-btn');
    
    // Enable action buttons after flip
    if (isFlipped) {
        if (forgotBtnEl) {
            forgotBtnEl.disabled = false;
        }
        if (knewBtnEl) {
            knewBtnEl.disabled = false;
        }
        console.log('Card flipped, buttons enabled');
    } else {
        if (forgotBtnEl) {
            forgotBtnEl.disabled = true;
        }
        if (knewBtnEl) {
            knewBtnEl.disabled = true;
        }
    }
}

function markCard(knew) {
    // Check if card is flipped
    if (!isFlipped) {
        console.log('Card not flipped yet');
        return;
    }
    
    // Check if currentDeck is set
    if (!currentDeck) {
        console.log('No deck selected');
        return;
    }
    
    // Initialize stats for this deck if it doesn't exist
    if (!stats[currentDeck]) {
        stats[currentDeck] = { known: 0, unknown: 0 };
    }
    
    // Update stats
    if (knew) {
        stats[currentDeck].known++;
    } else {
        stats[currentDeck].unknown++;
    }
    
    saveStats();
    updateStudyStats();
    
    // Re-query buttons to ensure they exist
    const forgotBtnEl = document.getElementById('forgot-btn');
    const knewBtnEl = document.getElementById('knew-btn');
    const nextBtnEl = document.getElementById('next-btn');
    
    // Enable next button
    if (nextBtnEl) {
        nextBtnEl.disabled = false;
    }
    
    // Disable action buttons to prevent double-clicking
    if (forgotBtnEl) {
        forgotBtnEl.disabled = true;
    }
    if (knewBtnEl) {
        knewBtnEl.disabled = true;
    }
    
    console.log('Card marked:', knew ? 'known' : 'unknown', 'Stats:', stats[currentDeck]);
}

function nextCard() {
    currentCardIndex++;
    
    if (currentCardIndex >= decks[currentDeck].cards.length) {
        // Deck finished
        alert(`You've completed the ${decks[currentDeck].name} deck!\n\nKnown: ${stats[currentDeck].known}\nUnknown: ${stats[currentDeck].unknown}`);
        showDeckSelection();
        return;
    }
    
    // Reset flip state immediately and ensure card shows front
    isFlipped = false;
    const flashcardEl = document.getElementById('flashcard');
    if (flashcardEl) {
        flashcardEl.classList.remove('flipped');
    }
    
    displayCard();
    updateStudyStats();
}

// Stats Management
function updateStatsDisplay() {
    let totalKnownCount = 0;
    let totalUnknownCount = 0;
    
    Object.values(stats).forEach(deckStats => {
        totalKnownCount += deckStats.known;
        totalUnknownCount += deckStats.unknown;
    });
    
    // Re-query elements to ensure they exist
    const totalKnownEl = document.getElementById('total-known');
    const totalUnknownEl = document.getElementById('total-unknown');
    
    if (totalKnownEl) {
        totalKnownEl.textContent = totalKnownCount;
    }
    if (totalUnknownEl) {
        totalUnknownEl.textContent = totalUnknownCount;
    }
}

function updateStudyStats() {
    // Initialize stats if they don't exist
    if (!stats[currentDeck]) {
        stats[currentDeck] = { known: 0, unknown: 0 };
    }
    
    // Re-query elements to ensure they exist
    const deckKnownEl = document.getElementById('deck-known');
    const deckUnknownEl = document.getElementById('deck-unknown');
    
    if (deckKnownEl) {
        deckKnownEl.textContent = stats[currentDeck].known;
    }
    if (deckUnknownEl) {
        deckUnknownEl.textContent = stats[currentDeck].unknown;
    }
}

function saveStats() {
    localStorage.setItem('smartflash-stats', JSON.stringify(stats));
    
    // Optionally save to backend
    if (useBackend) {
        fetch(`${API_BASE_URL}/stats`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ stats })
        }).catch(error => {
            console.log('Failed to save stats to backend:', error);
        });
    }
}

function loadStats() {
    const saved = localStorage.getItem('smartflash-stats');
    if (saved) {
        stats = JSON.parse(saved);
    }
}

// PWA Service Worker Registration
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        });
    }
}

// URL Generation
async function generateFlashcardsFromURL() {
    const urlInput = document.getElementById('url-input');
    const url = urlInput?.value.trim();
    
    if (!url) {
        showGenerationStatus('Please enter a URL', 'error');
        return;
    }
    
    // Validate URL
    try {
        new URL(url);
    } catch (error) {
        showGenerationStatus('Invalid URL format. Please enter a valid URL (e.g., https://example.com)', 'error');
        return;
    }
    
    // Disable button and show loading
    const generateBtn = document.getElementById('generate-btn');
    if (generateBtn) {
        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';
    }
    
    showGenerationStatus('Fetching webpage and processing...', 'loading');
    
    // Get CEFR level from selector
    const cefrLevelSelect = document.getElementById('cefr-level');
    const cefrLevel = cefrLevelSelect ? cefrLevelSelect.value : 'B1';
    
    try {
        const response = await fetch(`${API_BASE_URL}/generate-from-url`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url, cefrLevel })
        });
        
        const result = await response.json();
        
        if (result.success) {
            const deckName = result.deckName || 'New Deck';
            showGenerationStatus(
                `Created deck "${deckName}" with ${result.stats?.cardsCreated || 0} flashcards!`,
                'success'
            );
            
            // Reload decks to show new deck
            await loadDecksFromBackend();
            updateDeckCounts();
            updateDeckGrid(); // Dynamically update deck grid
            updateStatsDisplay();
            
            // Clear input after short delay
            setTimeout(() => {
                if (urlInput) urlInput.value = '';
            }, 2000);
        } else {
            showGenerationStatus(result.message || 'Failed to generate flashcards', 'error');
        }
    } catch (error) {
        console.error('Error generating flashcards:', error);
        showGenerationStatus('Failed to connect to server. Make sure the backend is running.', 'error');
    } finally {
        if (generateBtn) {
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate Flashcards';
        }
    }
}

function showGenerationStatus(message, type) {
    const generationStatus = document.getElementById('generation-status');
    if (!generationStatus) return;
    
    generationStatus.textContent = message;
    generationStatus.className = `generation-status ${type}`;
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (generationStatus.textContent === message) {
                generationStatus.textContent = '';
                generationStatus.className = 'generation-status';
            }
        }, 5000);
    }
}

// Module Functions

// Get difficulty label from CEFR level
function getDifficultyLabel(cefrLevel) {
    if (!cefrLevel) return { label: 'Unrated', class: 'unrated' };
    
    const difficultyMap = {
        'A1': { label: 'Easy', class: 'easy' },
        'A2': { label: 'Easy', class: 'easy' },
        'B1': { label: 'Medium', class: 'medium' },
        'B2': { label: 'Medium', class: 'medium' },
        'C1': { label: 'Hard', class: 'hard' },
        'C2': { label: 'Hard', class: 'hard' }
    };
    
    return difficultyMap[cefrLevel] || { label: 'Unrated', class: 'unrated' };
}

// Populate Deck Explorer
function populateDeckExplorer(filter = 'all') {
    const deckList = document.getElementById('deck-explorer-list');
    if (!deckList) return;
    
    deckList.innerHTML = '';
    
    // Check if decks object is empty or not loaded yet
    if (!decks || Object.keys(decks).length === 0) {
        deckList.innerHTML = '<div style="text-align: center; color: var(--text-light); padding: 20px;">No decks available. Generate some flashcards to get started!</div>';
        return;
    }
    
    let filteredDecks = [];
    
    for (const [deckId, deckData] of Object.entries(decks)) {
        // Ensure deckData has required properties
        if (!deckData || !deckData.name) continue;
        
        const cards = deckData.cards || [];
        const difficulty = getDifficultyLabel(deckData.cefrLevel);
        
        if (filter === 'all' || 
            (filter === 'easy' && difficulty.class === 'easy') ||
            (filter === 'medium' && difficulty.class === 'medium') ||
            (filter === 'hard' && difficulty.class === 'hard') ||
            (filter === 'unrated' && difficulty.class === 'unrated')) {
            
            filteredDecks.push({ 
                id: deckId, 
                name: deckData.name,
                cefrLevel: deckData.cefrLevel || null,
                cards: cards,
                difficulty: difficulty
            });
        }
    }
    
    if (filteredDecks.length === 0) {
        deckList.innerHTML = '<div style="text-align: center; color: var(--text-light); padding: 20px;">No decks found for this filter.</div>';
        return;
    }
    
    filteredDecks.forEach(deck => {
        const deckItem = document.createElement('div');
        deckItem.className = 'deck-list-item';
        const cardCount = deck.cards ? deck.cards.length : 0;
        deckItem.innerHTML = `
            <div class="deck-item-info">
                <div class="deck-item-title">${deck.name}</div>
                <div class="deck-item-meta">
                    <span>${cardCount} cards</span>
                    <span class="deck-item-difficulty difficulty-${deck.difficulty.class}">${deck.difficulty.label}</span>
                </div>
            </div>
            <button class="deck-item-open-btn" data-deck-id="${deck.id}">Open</button>
        `;
        deckList.appendChild(deckItem);
    });
    
    // Add click listeners to Open buttons
    deckList.querySelectorAll('.deck-item-open-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const deckId = btn.dataset.deckId;
            if (decks[deckId]) {
                startDeck(deckId);
            }
        });
    });
}

// Populate AI Deck Selector
function populateAIDeckSelect() {
    const aiDeckSelect = document.getElementById('ai-deck-select');
    if (!aiDeckSelect) return;
    
    // Clear existing options except the first one
    aiDeckSelect.innerHTML = '<option value="">Choose a deck...</option>';
    
    // Check if decks object is empty or not loaded yet
    if (!decks || Object.keys(decks).length === 0) {
        return;
    }
    
    for (const [deckId, deckData] of Object.entries(decks)) {
        // Ensure deckData has required properties
        if (!deckData || !deckData.name) continue;
        
        const cardCount = deckData.cards ? deckData.cards.length : 0;
        const option = document.createElement('option');
        option.value = deckId;
        option.textContent = `${deckData.name} (${cardCount} cards)`;
        aiDeckSelect.appendChild(option);
    }
}

// Setup Module Event Listeners
function setupModuleEventListeners() {
    // Deck Explorer Filter Chips
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Remove active class from all chips
            filterChips.forEach(c => c.classList.remove('active'));
            // Add active class to clicked chip
            chip.classList.add('active');
            // Filter decks
            const filter = chip.dataset.filter;
            populateDeckExplorer(filter);
        });
    });
    
    // Module URL Generation
    const moduleGenerateBtn = document.getElementById('module-generate-btn');
    const moduleUrlInput = document.getElementById('module-url-input');
    const moduleCefrLevel = document.getElementById('module-cefr-level');
    const topNInput = document.getElementById('topn-input');
    const moduleStatus = document.getElementById('module-generation-status');
    
    if (moduleGenerateBtn) {
        moduleGenerateBtn.addEventListener('click', () => {
            generateFlashcardsFromURLModule();
        });
    }
    
    if (moduleUrlInput) {
        moduleUrlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                generateFlashcardsFromURLModule();
            }
        });
    }
    
    // Quick Preview
    const quickPreviewBtn = document.getElementById('quick-preview-btn');
    if (quickPreviewBtn) {
        quickPreviewBtn.addEventListener('click', async () => {
            await handleQuickPreview();
        });
    }
    
    // AI Chat
    const aiAskBtn = document.getElementById('ai-ask-btn');
    if (aiAskBtn) {
        aiAskBtn.addEventListener('click', () => {
            handleAIChat();
        });
    }
    
    const aiPromptInput = document.getElementById('ai-prompt-input');
    if (aiPromptInput) {
        aiPromptInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                handleAIChat();
            }
        });
    }
    
    // Cleanup Empty Decks Button
    const cleanupBtn = document.getElementById('cleanup-empty-decks-btn');
    if (cleanupBtn) {
        cleanupBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (confirm('Delete all decks with no cards? This action cannot be undone.')) {
                await cleanupEmptyDecks();
            }
        });
    }
}

// Generate Flashcards from URL (Module Version)
async function generateFlashcardsFromURLModule() {
    const urlInput = document.getElementById('module-url-input');
    const cefrSelect = document.getElementById('module-cefr-level');
    const topNInput = document.getElementById('topn-input');
    const generateBtn = document.getElementById('module-generate-btn');
    const statusEl = document.getElementById('module-generation-status');
    
    const url = urlInput?.value.trim();
    const cefrLevel = cefrSelect ? cefrSelect.value : 'B1';
    const topN = topNInput ? parseInt(topNInput.value) || 20 : 20;
    
    if (!url) {
        showModuleStatus('Please enter a URL', 'error');
        return;
    }
    
    try {
        new URL(url);
    } catch (error) {
        showModuleStatus('Invalid URL format. Please enter a valid URL', 'error');
        return;
    }
    
    if (generateBtn) {
        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';
    }
    
    showModuleStatus('Fetching webpage and processing...', 'loading');
    
    try {
        const response = await fetch(`${API_BASE_URL}/generate-from-url`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url, cefrLevel, topN })
        });
        
        const result = await response.json();
        
        if (result.success) {
            const deckName = result.deckName || 'New Deck';
            showModuleStatus(
                `✓ Created deck "${deckName}" with ${result.stats?.cardsCreated || 0} flashcards!`,
                'success'
            );
            
            // Reload decks
            await loadDecksFromBackend();
            updateDeckCounts();
            updateDeckGrid();
            populateDeckExplorer(); // Refresh deck explorer
            populateAIDeckSelect(); // Refresh AI deck selector
            updateStatsDisplay();
            
            // Clear input after delay
            setTimeout(() => {
                if (urlInput) urlInput.value = '';
            }, 2000);
        } else {
            showModuleStatus(result.message || 'Failed to generate flashcards', 'error');
        }
    } catch (error) {
        console.error('Error generating flashcards:', error);
        showModuleStatus('Failed to connect to server. Make sure the backend is running.', 'error');
    } finally {
        if (generateBtn) {
            generateBtn.disabled = false;
            generateBtn.textContent = 'Create Cards';
        }
    }
}

// Handle Quick Preview
async function handleQuickPreview() {
    const urlInput = document.getElementById('module-url-input');
    const cefrSelect = document.getElementById('module-cefr-level');
    const topNInput = document.getElementById('topn-input');
    const previewBtn = document.getElementById('quick-preview-btn');
    
    const url = urlInput?.value.trim();
    const cefrLevel = cefrSelect ? cefrSelect.value : 'B1';
    const topN = topNInput ? parseInt(topNInput.value) || 20 : 20;
    
    if (!url) {
        showModuleStatus('Please enter a URL first', 'error');
        return;
    }
    
    try {
        new URL(url);
    } catch (error) {
        showModuleStatus('Invalid URL format. Please enter a valid URL', 'error');
        return;
    }
    
    if (previewBtn) {
        previewBtn.disabled = true;
        previewBtn.textContent = 'Previewing...';
    }
    
    showModuleStatus('Fetching webpage and analyzing...', 'loading');
    
    try {
        const response = await fetch(`${API_BASE_URL}/preview-url`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url, cefrLevel, topN })
        });
        
        const result = await response.json();
        
        if (result.success) {
            const wordList = result.words || [];
            const pageTitle = result.pageTitle || 'Preview';
            
            if (wordList.length === 0) {
                showModuleStatus('No words found that match your CEFR level. Try adjusting the difficulty or using a different article.', 'info');
            } else {
                const wordsText = wordList.slice(0, 20).join(', ');
                const moreText = wordList.length > 20 ? ` and ${wordList.length - 20} more...` : '';
                showModuleStatus(
                    `Preview: "${pageTitle}"\n\nWould extract ${wordList.length} words (CEFR ${cefrLevel}, top ${topN}):\n\n${wordsText}${moreText}`,
                    'success'
                );
            }
        } else {
            showModuleStatus(result.message || 'Failed to preview URL', 'error');
        }
    } catch (error) {
        console.error('Error in quick preview:', error);
        showModuleStatus('Failed to connect to server. Make sure the backend is running.', 'error');
    } finally {
        if (previewBtn) {
            previewBtn.disabled = false;
            previewBtn.textContent = 'Quick Preview';
        }
    }
}

// Show Module Status
function showModuleStatus(message, type) {
    const statusEl = document.getElementById('module-generation-status');
    if (!statusEl) return;
    
    statusEl.textContent = message;
    statusEl.className = `status-message ${type}`;
    
    if (type === 'success') {
        setTimeout(() => {
            if (statusEl.textContent === message) {
                statusEl.textContent = '';
                statusEl.className = 'status-message';
            }
        }, 10000); // Keep preview visible longer (10 seconds)
    }
}

// Handle AI Chat
async function handleAIChat() {
    const deckSelect = document.getElementById('ai-deck-select');
    const promptInput = document.getElementById('ai-prompt-input');
    const askBtn = document.getElementById('ai-ask-btn');
    const responseContainer = document.getElementById('ai-response-container');
    
    const deckId = deckSelect?.value;
    const prompt = promptInput?.value.trim();
    
    if (!deckId) {
        showAIResponse('Please select a deck first.', 'error');
        return;
    }
    
    if (!prompt) {
        showAIResponse('Please enter a question or request.', 'error');
        return;
    }
    
    if (askBtn) {
        askBtn.disabled = true;
        askBtn.textContent = 'Thinking...';
    }
    
    showAIResponse('Processing your request...', 'loading');
    
    try {
        const response = await fetch(`${API_BASE_URL}/ai-chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ deckId, prompt })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAIResponse(result.response || result.message, 'success');
        } else {
            showAIResponse(result.message || 'Failed to get AI response', 'error');
        }
    } catch (error) {
        console.error('Error in AI chat:', error);
        showAIResponse('Failed to connect to AI service. Please try again later.', 'error');
    } finally {
        if (askBtn) {
            askBtn.disabled = false;
            askBtn.textContent = 'Ask AI';
        }
    }
}

// Show AI Response
function showAIResponse(message, type) {
    const responseContainer = document.getElementById('ai-response-container');
    if (!responseContainer) return;
    
    // Clear placeholder if it exists
    const placeholder = responseContainer.querySelector('.ai-response-placeholder');
    if (placeholder) {
        placeholder.remove();
    }
    
    if (type === 'loading') {
        responseContainer.innerHTML = `<div class="ai-response loading">${message}</div>`;
    } else if (type === 'error') {
        responseContainer.innerHTML = `<div class="ai-response" style="color: #c62828;">${message}</div>`;
    } else {
        // Format the response with line breaks
        const formattedMessage = message.replace(/\n/g, '<br>');
        responseContainer.innerHTML = `<div class="ai-response">${formattedMessage}</div>`;
    }
}

// Bottom Navigation Setup
function setupBottomNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const modulesContainer = document.getElementById('modules-container');
    const deckCategories = document.getElementById('deck-categories');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const view = item.dataset.view;
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            // Hide modules container
            if (modulesContainer) {
                modulesContainer.style.display = 'none';
            }
            
            // Hide all module cards
            const allModuleCards = document.querySelectorAll('.module-card');
            allModuleCards.forEach(card => {
                card.style.display = 'none';
            });
            
            // Show appropriate view
            switch(view) {
                case 'home':
                    // Show deck categories, hide modules
                    if (deckCategories) {
                        deckCategories.style.display = 'block';
                    }
                    break;
                case 'explorer':
                    // Show deck explorer module
                    if (deckCategories) {
                        deckCategories.style.display = 'none';
                    }
                    if (modulesContainer) {
                        modulesContainer.style.display = 'grid';
                        modulesContainer.style.gridTemplateColumns = '1fr';
                    }
                    const explorerCard = document.querySelectorAll('.module-card')[0];
                    if (explorerCard) {
                        explorerCard.style.display = 'flex';
                    }
                    break;
                case 'generate':
                    // Show generate flashcards module
                    if (deckCategories) {
                        deckCategories.style.display = 'none';
                    }
                    if (modulesContainer) {
                        modulesContainer.style.display = 'grid';
                        modulesContainer.style.gridTemplateColumns = '1fr';
                    }
                    const generateCard = document.querySelectorAll('.module-card')[1];
                    if (generateCard) {
                        generateCard.style.display = 'flex';
                    }
                    break;
                case 'ai-chat':
                    // Show AI chat module
                    if (deckCategories) {
                        deckCategories.style.display = 'none';
                    }
                    if (modulesContainer) {
                        modulesContainer.style.display = 'grid';
                        modulesContainer.style.gridTemplateColumns = '1fr';
                    }
                    const aiCard = document.querySelectorAll('.module-card')[2];
                    if (aiCard) {
                        aiCard.style.display = 'flex';
                    }
                    break;
            }
        });
    });
}

// Delete a single deck
async function deleteDeck(deckId) {
    try {
        const response = await fetch(`${API_BASE_URL}/decks/${deckId}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Remove from local decks object
            delete decks[deckId];
            
            // Reload decks from backend
            await loadDecksFromBackend();
            updateDeckCounts();
            updateDeckGrid();
            populateDeckExplorer(); // Refresh deck explorer
            populateAIDeckSelect(); // Refresh AI deck selector
            updateStatsDisplay();
            
            console.log('Deck deleted:', deckId);
        } else {
            alert(result.error || 'Failed to delete deck');
        }
    } catch (error) {
        console.error('Error deleting deck:', error);
        alert('Failed to delete deck. Please try again.');
    }
}

// Cleanup all empty decks
async function cleanupEmptyDecks() {
    const cleanupBtn = document.getElementById('cleanup-empty-decks-btn');
    if (cleanupBtn) {
        cleanupBtn.disabled = true;
        cleanupBtn.textContent = 'Cleaning...';
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/decks/cleanup-empty`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            const count = result.deletedDecks ? result.deletedDecks.length : 0;
            if (count > 0) {
                alert(`Successfully deleted ${count} empty deck(s):\n\n${result.deletedDecks.join('\n')}`);
            } else {
                alert('No empty decks found. All decks have cards!');
            }
            
            // Reload decks from backend
            await loadDecksFromBackend();
            updateDeckCounts();
            updateDeckGrid();
            populateDeckExplorer(); // Refresh deck explorer
            populateAIDeckSelect(); // Refresh AI deck selector
            updateStatsDisplay();
        } else {
            alert(result.error || 'Failed to cleanup empty decks');
        }
    } catch (error) {
        console.error('Error cleaning up empty decks:', error);
        alert(`Failed to cleanup empty decks: ${error.message}. Please check the console for details.`);
    } finally {
        if (cleanupBtn) {
            cleanupBtn.disabled = false;
            cleanupBtn.innerHTML = '🗑️ Cleanup Empty';
        }
    }
}

// Text-to-Speech Functions
let currentSpeech = null;

function speakWord() {
    if (!currentDeck || !decks[currentDeck]) return;
    
    const card = decks[currentDeck].cards[currentCardIndex];
    if (!card) return;
    
    const word = card.front;
    
    // Stop any current speech
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
    
    // Use Web Speech API
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        // Try to use an American English voice
        const voices = window.speechSynthesis.getVoices();
        const americanVoice = voices.find(v => v.lang === 'en-US' && (v.name.includes('US') || v.name.includes('American'))) ||
                             voices.find(v => v.lang === 'en-US') ||
                             voices.find(v => v.lang.startsWith('en-US'));
        if (americanVoice) {
            utterance.voice = americanVoice;
        }
        
        currentSpeech = utterance;
        window.speechSynthesis.speak(utterance);
        
        // Update button state
        const btn = document.getElementById('tts-word-btn');
        if (btn) {
            btn.disabled = true;
            utterance.onend = () => {
                btn.disabled = false;
                currentSpeech = null;
            };
            utterance.onerror = () => {
                btn.disabled = false;
                currentSpeech = null;
            };
        }
    } else {
        alert('Text-to-speech is not supported in your browser.');
    }
}

function speakSentence() {
    if (!currentDeck || !decks[currentDeck]) return;
    
    const card = decks[currentDeck].cards[currentCardIndex];
    if (!card) return;
    
    // Extract sentence from card back (look for "Example:" or use definition)
    let sentence = '';
    const backText = card.back;
    
    // Try to find example sentence
    const exampleMatch = backText.match(/[Ee]xample[:\s]+(.+?)(?:\n|$)/);
    if (exampleMatch && exampleMatch[1]) {
        sentence = exampleMatch[1].trim();
    } else {
        // Use the definition as fallback
        sentence = backText.split('\n')[0].replace(/\[.*?\]\s*/, '').trim();
    }
    
    if (!sentence) {
        alert('No example sentence found for this card.');
        return;
    }
    
    // Stop any current speech
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
    
    // Use Web Speech API
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.lang = 'en-US';
        utterance.rate = 0.85;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        // Try to use an American English voice
        const voices = window.speechSynthesis.getVoices();
        const americanVoice = voices.find(v => v.lang === 'en-US' && (v.name.includes('US') || v.name.includes('American'))) ||
                             voices.find(v => v.lang === 'en-US') ||
                             voices.find(v => v.lang.startsWith('en-US'));
        if (americanVoice) {
            utterance.voice = americanVoice;
        }
        
        currentSpeech = utterance;
        window.speechSynthesis.speak(utterance);
        
        // Update button state
        const btn = document.getElementById('tts-sentence-btn');
        if (btn) {
            btn.disabled = true;
            utterance.onend = () => {
                btn.disabled = false;
                currentSpeech = null;
            };
            utterance.onerror = () => {
                btn.disabled = false;
                currentSpeech = null;
            };
        }
    } else {
        alert('Text-to-speech is not supported in your browser.');
    }
}

// Load voices when available
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
        // Voices loaded
    };
}

// Pronunciation Practice
let recognition = null;
let isRecording = false;

function initializeSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        return null;
    }
    
    try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';
        recognitionInstance.maxAlternatives = 1;
        
        return recognitionInstance;
    } catch (error) {
        console.error('Error initializing speech recognition:', error);
        return null;
    }
}

async function startPronunciationPractice() {
    if (!currentDeck || !decks[currentDeck]) return;
    
    const card = decks[currentDeck].cards[currentCardIndex];
    if (!card) return;
    
    const word = card.front;
    const pronunciationBtn = document.getElementById('pronunciation-btn');
    const resultDiv = document.getElementById('pronunciation-result');
    
    // Check browser support first
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
        return;
    }
    
    // Initialize recognition if not already done
    if (!recognition) {
        recognition = initializeSpeechRecognition();
        if (!recognition) {
            alert('Failed to initialize speech recognition. Please refresh the page and try again.');
            return;
        }
        
        // Set up event handlers
        recognition.onresult = async (event) => {
            if (event.results && event.results.length > 0 && event.results[0].length > 0) {
                const transcript = event.results[0][0].transcript.trim().toLowerCase();
                const targetWord = word.toLowerCase();
                
                isRecording = false;
                if (pronunciationBtn) {
                    pronunciationBtn.classList.remove('recording');
                    pronunciationBtn.innerHTML = '<span class="audio-icon">🎤</span><span class="audio-label">Practice</span>';
                    pronunciationBtn.disabled = false;
                }
                
                // Evaluate pronunciation
                await evaluatePronunciation(targetWord, transcript);
            } else {
                isRecording = false;
                if (pronunciationBtn) {
                    pronunciationBtn.classList.remove('recording');
                    pronunciationBtn.innerHTML = '<span class="audio-icon">🎤</span><span class="audio-label">Practice</span>';
                    pronunciationBtn.disabled = false;
                }
                const modal = document.getElementById('pronunciation-modal');
                const resultDiv = document.getElementById('pronunciation-result');
                if (modal && resultDiv) {
                    modal.style.display = 'flex';
                    resultDiv.innerHTML = '<div style="text-align: center; padding: 40px; color: #ff9800; font-size: 1.1rem;">No speech detected. Please try again.</div>';
                }
            }
        };
        
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            isRecording = false;
            if (pronunciationBtn) {
                pronunciationBtn.classList.remove('recording');
                pronunciationBtn.innerHTML = '<span class="audio-icon">🎤</span><span class="audio-label">Practice</span>';
                pronunciationBtn.disabled = false;
            }
            
            let errorMsg = '';
            if (event.error === 'no-speech') {
                errorMsg = 'No speech detected. Please speak clearly and try again.';
            } else if (event.error === 'audio-capture') {
                errorMsg = 'No microphone found. Please check your microphone permissions and try again.';
            } else if (event.error === 'not-allowed') {
                errorMsg = 'Microphone permission denied. Please allow microphone access and try again.';
            } else if (event.error === 'aborted') {
                // User stopped it, don't show error
                return;
            } else if (event.error === 'network') {
                errorMsg = 'Network error. Please check your connection and try again.';
            } else {
                errorMsg = 'Speech recognition error. Please try again.';
            }
            
            if (errorMsg) {
                const modal = document.getElementById('pronunciation-modal');
                const resultDiv = document.getElementById('pronunciation-result');
                if (modal && resultDiv) {
                    modal.style.display = 'flex';
                    resultDiv.innerHTML = `<div style="text-align: center; padding: 40px; color: #f44336; font-size: 1.1rem;">${errorMsg}</div>`;
                }
            }
        };
        
        recognition.onend = () => {
            isRecording = false;
            if (pronunciationBtn) {
                pronunciationBtn.classList.remove('recording');
                pronunciationBtn.innerHTML = '<span class="audio-icon">🎤</span><span class="audio-label">Practice</span>';
                pronunciationBtn.disabled = false;
            }
        };
        
        recognition.onstart = () => {
            console.log('Speech recognition started');
            // Don't show modal while listening
        };
    }
    
    if (isRecording) {
        // Stop recording
        try {
            recognition.stop();
        } catch (error) {
            console.error('Error stopping recognition:', error);
        }
        isRecording = false;
        if (pronunciationBtn) {
            pronunciationBtn.classList.remove('recording');
            pronunciationBtn.innerHTML = '<span class="audio-icon">🎤</span><span class="audio-label">Practice</span>';
            pronunciationBtn.disabled = false;
        }
        return;
    }
    
    // Check if we have microphone permission, request if needed
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Stop the stream immediately, we just needed permission
        stream.getTracks().forEach(track => track.stop());
    } catch (error) {
        console.error('Microphone permission error:', error);
        const modal = document.getElementById('pronunciation-modal');
        const resultDiv = document.getElementById('pronunciation-result');
        
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
            if (modal && resultDiv) {
                modal.style.display = 'flex';
                resultDiv.innerHTML = '<div style="text-align: center; padding: 40px; color: #f44336; font-size: 1.1rem;">⚠️ Microphone permission denied. Please allow microphone access in your browser settings and try again.</div>';
            }
        } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
            if (modal && resultDiv) {
                modal.style.display = 'flex';
                resultDiv.innerHTML = '<div style="text-align: center; padding: 40px; color: #f44336; font-size: 1.1rem;">⚠️ No microphone found. Please connect a microphone and try again.</div>';
            }
        } else {
            if (modal && resultDiv) {
                modal.style.display = 'flex';
                resultDiv.innerHTML = '<div style="text-align: center; padding: 40px; color: #f44336; font-size: 1.1rem;">⚠️ Microphone access error. Please check your microphone settings and try again.</div>';
            }
        }
        isRecording = false;
        if (pronunciationBtn) {
            pronunciationBtn.classList.remove('recording');
            pronunciationBtn.innerHTML = '<span class="audio-icon">🎤</span><span class="audio-label">Practice</span>';
            pronunciationBtn.disabled = false;
        }
        return;
    }
    
    // Start recording
    isRecording = true;
    if (pronunciationBtn) {
        pronunciationBtn.classList.add('recording');
        pronunciationBtn.innerHTML = '<span class="audio-icon">⏹️</span><span class="audio-label">Stop</span>';
        pronunciationBtn.disabled = false;
    }
    
    // Don't show modal while listening, just show in console
    console.log('Listening for pronunciation...');
    
    try {
        // Add a small delay to ensure recognition is ready
        setTimeout(() => {
            if (recognition && isRecording) {
                recognition.start();
            }
        }, 100);
    } catch (error) {
        console.error('Error starting recognition:', error);
        isRecording = false;
        if (pronunciationBtn) {
            pronunciationBtn.classList.remove('recording');
            pronunciationBtn.innerHTML = '<span class="audio-icon">🎤</span><span class="audio-label">Practice</span>';
            pronunciationBtn.disabled = false;
        }
        const modal = document.getElementById('pronunciation-modal');
        const resultDiv = document.getElementById('pronunciation-result');
        if (modal && resultDiv) {
            modal.style.display = 'flex';
            resultDiv.innerHTML = '<div style="text-align: center; padding: 40px; color: #f44336; font-size: 1.1rem;">Failed to start recording. Please try again.</div>';
        }
    }
}

async function evaluatePronunciation(targetWord, userSpeech) {
    const modal = document.getElementById('pronunciation-modal');
    const resultDiv = document.getElementById('pronunciation-result');
    if (!modal || !resultDiv) return;
    
    // Show modal
    modal.style.display = 'flex';
    resultDiv.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">Analyzing pronunciation...</div>';
    
    try {
        // Call backend API for pronunciation evaluation
        const response = await fetch(`${API_BASE_URL}/pronunciation-evaluate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                targetWord: targetWord,
                userSpeech: userSpeech
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            displayPronunciationResult(result);
        } else {
            // Fallback to simple comparison if API fails
            const simpleResult = simplePronunciationCheck(targetWord, userSpeech);
            displayPronunciationResult(simpleResult);
        }
    } catch (error) {
        console.error('Error evaluating pronunciation:', error);
        // Fallback to simple comparison
        const simpleResult = simplePronunciationCheck(targetWord, userSpeech);
        displayPronunciationResult(simpleResult);
    }
}

function simplePronunciationCheck(targetWord, userSpeech) {
    // Simple similarity check based on character matching
    const target = targetWord.toLowerCase().replace(/[^a-z]/g, '');
    const user = userSpeech.toLowerCase().replace(/[^a-z]/g, '');
    
    // Calculate similarity
    let matches = 0;
    const maxLen = Math.max(target.length, user.length);
    
    for (let i = 0; i < Math.min(target.length, user.length); i++) {
        if (target[i] === user[i]) {
            matches++;
        }
    }
    
    const similarity = (matches / maxLen) * 100;
    
    // Find incorrect phonemes (simplified - just character differences)
    const incorrectPhonemes = [];
    for (let i = 0; i < Math.min(target.length, user.length); i++) {
        if (target[i] !== user[i]) {
            incorrectPhonemes.push({
                position: i,
                expected: target[i],
                actual: user[i]
            });
        }
    }
    
    // Generate suggestions
    const suggestions = [];
    if (similarity < 70) {
        suggestions.push('Try to pronounce each syllable more clearly');
        suggestions.push('Listen to the word again using the "Read Word" button');
    } else if (similarity < 90) {
        suggestions.push('You\'re close! Focus on the parts highlighted above');
        suggestions.push('Practice saying the word slowly, then speed up');
    } else {
        suggestions.push('Great pronunciation! Keep practicing to perfect it');
    }
    
    return {
        success: true,
        similarity: Math.round(similarity),
        incorrectPhonemes: incorrectPhonemes.slice(0, 5), // Limit to 5
        suggestions: suggestions
    };
}

function displayPronunciationResult(result) {
    const modal = document.getElementById('pronunciation-modal');
    const resultDiv = document.getElementById('pronunciation-result');
    if (!modal || !resultDiv) return;
    
    const similarity = result.similarity || 0;
    let scoreClass = 'poor';
    let scoreLabel = 'Needs Practice';
    
    if (similarity >= 90) {
        scoreClass = 'excellent';
        scoreLabel = 'Excellent!';
    } else if (similarity >= 75) {
        scoreClass = 'good';
        scoreLabel = 'Good!';
    } else if (similarity >= 60) {
        scoreClass = 'needs-improvement';
        scoreLabel = 'Getting There';
    }
    
    let html = `<div class="score ${scoreClass}">${scoreLabel} - ${similarity}% Match</div>`;
    
    if (result.incorrectPhonemes && result.incorrectPhonemes.length > 0) {
        html += `<div class="phonemes"><strong>Areas to improve:</strong><ul>`;
        result.incorrectPhonemes.forEach(phoneme => {
            html += `<li>Position ${phoneme.position + 1}: Expected "${phoneme.expected}", heard "${phoneme.actual}"</li>`;
        });
        html += `</ul></div>`;
    }
    
    if (result.suggestions && result.suggestions.length > 0) {
        html += `<div class="suggestions"><strong>Tips:</strong><ul>`;
        result.suggestions.forEach(suggestion => {
            html += `<li>${suggestion}</li>`;
        });
        html += `</ul></div>`;
    }
    
    resultDiv.innerHTML = html;
    // Modal is already displayed from evaluatePronunciation
    // Ensure modal is visible
    if (modal && modal.style.display !== 'flex') {
        modal.style.display = 'flex';
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM is already loaded
    init();
}

