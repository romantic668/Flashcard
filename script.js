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
    linux: { known: 0, unknown: 0 }
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
const API_BASE_URL = 'http://localhost:3000/api';
let useBackend = false;

// Initialize
async function init() {
    loadStats();
    await loadDecksFromBackend();
    updateDeckCounts();
    updateStatsDisplay();
    setupEventListeners();
    registerServiceWorker();
}

// Try to load decks from backend, fallback to local data
async function loadDecksFromBackend() {
    try {
        const response = await fetch(`${API_BASE_URL}/decks`);
        if (response.ok) {
            const backendDecks = await response.json();
            decks = backendDecks;
            useBackend = true;
            console.log('Loaded decks from backend');
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
}

// Event Listeners
function setupEventListeners() {
    // Deck selection
    if (deckCards && deckCards.length > 0) {
        deckCards.forEach(card => {
            card.addEventListener('click', () => {
                const deckKey = card.dataset.deck;
                if (deckKey && decks[deckKey]) {
                    startDeck(deckKey);
                }
            });
        });
    }

    // Back button
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            showDeckSelection();
        });
    }

    // Flip button
    if (flipBtn) {
        flipBtn.addEventListener('click', flipCard);
    }

    // Flashcard click
    if (flashcard) {
        flashcard.addEventListener('click', flipCard);
    }

    // Action buttons
    if (forgotBtn) {
        forgotBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Forgot button clicked');
            markCard(false);
        });
    }
    
    if (knewBtn) {
        knewBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Knew button clicked');
            markCard(true);
        });
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', nextCard);
    }
}

// Deck Management
function startDeck(deckKey) {
    currentDeck = deckKey;
    currentCardIndex = 0;
    isFlipped = false;
    
    currentDeckName.textContent = decks[deckKey].name;
    totalCards.textContent = decks[deckKey].cards.length;
    
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
    const card = decks[currentDeck].cards[currentCardIndex];
    cardFrontText.textContent = card.front;
    cardBackText.textContent = card.back;
    
    // Reset flip state
    if (isFlipped) {
        flashcard.classList.remove('flipped');
        isFlipped = false;
    }
    
    // Update card number
    if (cardNumber) {
        cardNumber.textContent = currentCardIndex + 1;
    }
    
    // Disable action buttons until flipped
    if (forgotBtn) {
        forgotBtn.disabled = true;
    }
    if (knewBtn) {
        knewBtn.disabled = true;
    }
    if (nextBtn) {
        nextBtn.disabled = true;
    }
}

function flipCard() {
    isFlipped = !isFlipped;
    if (flashcard) {
        flashcard.classList.toggle('flipped');
    }
    
    // Enable action buttons after flip
    if (isFlipped) {
        if (forgotBtn) {
            forgotBtn.disabled = false;
        }
        if (knewBtn) {
            knewBtn.disabled = false;
        }
        console.log('Card flipped, buttons enabled');
    } else {
        if (forgotBtn) {
            forgotBtn.disabled = true;
        }
        if (knewBtn) {
            knewBtn.disabled = true;
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
    
    // Update stats
    if (knew) {
        stats[currentDeck].known++;
    } else {
        stats[currentDeck].unknown++;
    }
    
    saveStats();
    updateStudyStats();
    
    // Enable next button
    if (nextBtn) {
        nextBtn.disabled = false;
    }
    
    // Disable action buttons to prevent double-clicking
    if (forgotBtn) {
        forgotBtn.disabled = true;
    }
    if (knewBtn) {
        knewBtn.disabled = true;
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
    
    isFlipped = false;
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
    
    totalKnown.textContent = totalKnownCount;
    totalUnknown.textContent = totalUnknownCount;
}

function updateStudyStats() {
    deckKnown.textContent = stats[currentDeck].known;
    deckUnknown.textContent = stats[currentDeck].unknown;
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

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM is already loaded
    init();
}

