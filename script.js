// Flashcard Data
const decks = {
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
            { front: 'What is PEP 8?', back: 'Python Enhancement Proposal 8, the style guide for Python code that defines conventions for writing readable code.' }
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
            { front: 'Paradox', back: 'A statement that contradicts itself but might be true.' }
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
            { front: 'What does tail -f do?', back: 'Displays the last lines of a file and follows it, showing new lines as they are added (useful for log files).' }
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

// Initialize
function init() {
    loadStats();
    updateStatsDisplay();
    setupEventListeners();
    registerServiceWorker();
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

