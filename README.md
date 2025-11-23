# SmartFlash - Advanced Flashcard Study Tool

A modern, intelligent flashcard application with AI-powered features, URL-based vocabulary extraction, and comprehensive study tools.

🌐 **Live Demo**: [https://flashcard-iula.onrender.com/](https://flashcard-iula.onrender.com/)

## ✨ Features

### 🎴 Core Flashcard Features
- **Multiple Decks**: Python, English Vocabulary, Linux Commands, and dynamically generated decks
- **Smooth 3D Flip Animation**: Interactive card flipping experience
- **Stats Tracking**: Track known vs unknown cards per deck with persistent storage
- **CEFR Level Classification**: Decks organized by difficulty (A1-C2)
- **Mobile-Friendly**: Fully responsive design with bottom navigation

### 🤖 AI-Powered Features
- **AI Chat with Decks**: Interactive chat to help you study
  - Quiz generation
  - Word explanations
  - Practice cards
  - Example sentences
  - Study tips
  - Statistics and analysis
  - Similar word suggestions
  - Difficulty analysis

### 🌐 URL-Based Flashcard Generation
- **Automatic Vocabulary Extraction**: Generate flashcards from any webpage
- **CEFR Level Filtering**: Extract words matching your English level (A1-C2)
- **Smart Word Selection**: Filters common words, duplicates, and user-known vocabulary
- **Quick Preview**: Preview words before generating the deck
- **Configurable Word Count**: Choose how many words to extract (5-50)
- **Intelligent Text Extraction**: Robust extraction from various webpage structures

### 🎨 Modern UI/UX
- **3-Module Layout**: Organized interface with Deck Explorer, Generator, and AI Chat
- **Bottom Navigation**: Mobile app-style navigation with 4 icons
- **Modern SaaS Design**: Clean, soft gradients, rounded corners, smooth animations
- **Deck Filtering**: Filter decks by difficulty (Easy, Medium, Hard, Unrated)
- **Dynamic Deck Management**: Automatically organize and display generated decks

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/romantic668/Flashcard.git
cd Flashcard
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

The app will automatically initialize the SQLite database on first run.

## 📖 Usage Guide

### Basic Study Flow

1. **Select a Deck**: Click on a deck card or use the Deck Explorer module
2. **Study Cards**: Click "Flip Card" or click the card itself to see the answer
3. **Mark Progress**: Click "I knew this" or "I forgot" to track your progress
4. **Navigate**: Click "Next Card" to move to the next flashcard
5. **View Stats**: See your known vs unknown statistics

### Generate Flashcards from URL

1. Navigate to the "Generate" tab in bottom navigation
2. Select your CEFR level (A1-C2)
3. Enter a webpage URL (e.g., article, blog post)
4. Set the number of words to extract (topN)
5. Click "Quick Preview" to see words that would be extracted
6. Click "Create Cards" to generate the deck

### AI Chat Features

1. Navigate to the "AI Chat" tab
2. Select a deck from the dropdown
3. Try these commands:
   - `"Quiz me"` - Get practice questions
   - `"Show random cards"` - Practice with random cards
   - `"Explain [word]"` - Get word definitions
   - `"Give me examples"` - See example sentences
   - `"What's the hardest word?"` - Find complex words
   - `"Show all words"` - List all words in deck
   - `"Statistics"` - Get deck statistics
   - `"Help me study"` - Get study tips

### Deck Explorer

1. Navigate to the "Decks" tab
2. Use filter chips to filter by difficulty (All, Easy, Medium, Hard, Unrated)
3. Click "Open" on any deck to start studying
4. View deck information: name, card count, difficulty level

## 🔌 API Endpoints

### Deck Management
```
GET    /api/decks                    # Get all decks with cards
GET    /api/decks/:deckId            # Get specific deck
GET    /api/decks/:deckId/cards      # Get cards from deck
POST   /api/decks/:deckId/cards      # Add card to deck
PUT    /api/decks/:deckId/cards/:cardId  # Update card
DELETE /api/decks/:deckId/cards/:cardId  # Delete card
DELETE /api/decks/:deckId            # Delete deck
```

### Flashcard Generation
```
POST   /api/generate-from-url        # Generate flashcards from URL
Body: { "url": "...", "cefrLevel": "B1", "topN": 20 }
```

### Preview
```
POST   /api/preview-url              # Preview words without creating deck
Body: { "url": "...", "cefrLevel": "B1", "topN": 20 }
```

### AI Chat
```
POST   /api/ai-chat                  # Chat with AI about a deck
Body: { "deckId": "...", "prompt": "..." }
```

### Statistics
```
POST   /api/stats                    # Save user statistics
Body: { "stats": {...} }
```

## 📁 Project Structure

```
smartflash/
├── index.html              # Main HTML with 3-module layout
├── style.css               # Modern SaaS-style CSS
├── script.js               # Frontend JavaScript logic
├── server.js               # Express backend server
├── database.js             # SQLite database operations
├── url-processor.js        # URL processing & flashcard generation
├── view-db.js              # Database viewer utility
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker for offline support
├── package.json            # Node.js dependencies
├── smartflash.db           # SQLite database (auto-created)
├── icons/                  # PWA icons
│   ├── icon-192.png
│   └── icon-512.png
├── README.md               # This file
├── URL_FEATURE.md          # URL generation documentation
├── DB_VIEWER.md            # Database viewer docs
└── DEPLOY.md               # Deployment guide
```

## 🛠️ Technology Stack

### Frontend
- **Pure HTML/CSS/JavaScript**: No frameworks, vanilla JS
- **PWA**: Service Worker + Web App Manifest for offline support
- **Modern CSS**: Gradients, animations, responsive grid layouts

### Backend
- **Node.js + Express**: RESTful API server
- **SQLite**: File-based database (no separate server needed)
- **Cheerio**: HTML parsing and text extraction
- **Natural**: NLP for tokenization and word processing
- **node-fetch**: HTTP requests for URL fetching

### Features
- **CEFR Classification**: Common European Framework of Reference for Languages
- **Word Difficulty Scoring**: Algorithm-based difficulty assessment
- **Frequency Filtering**: Filters common words using frequency data
- **Part-of-Speech Filtering**: Intelligent word selection

## 🎯 Key Features Explained

### CEFR Level System
- **A1-A2 (Beginner)**: Top 1,000 most common words
- **B1-B2 (Intermediate)**: Top 3,000 most common words
- **C1-C2 (Advanced)**: Beyond top 3,000 words

Words are automatically classified and filtered based on your selected CEFR level.

### Text Extraction
The system uses multiple strategies to extract text from webpages:
1. Semantic HTML5 elements (article, main, etc.)
2. Common content selectors (.content, .post-content, etc.)
3. Paragraph extraction with filtering
4. Div-based content extraction
5. Fallback to body text

### Word Processing Pipeline
1. Fetch webpage content
2. Extract and clean text
3. Tokenize and filter common words
4. Check against existing vocabulary
5. Score words by difficulty
6. Filter by CEFR level
7. Select top N words
8. Get definitions and create flashcards

## 🐛 Troubleshooting

### Port Already in Use
If you see `EADDRINUSE` error:
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Database Issues
The database is automatically created on first run. If you need to reset it, delete `smartflash.db` and restart the server.

### Text Extraction Fails
- The webpage may be JavaScript-heavy (requires browser rendering)
- The page may require authentication
- The page may have very little text content
- Try a different article or webpage

## 📝 Development

### Running in Development
```bash
npm start
```

### Viewing Database
```bash
node view-db.js
```

## 🚀 Deployment

See `DEPLOY.md` for deployment instructions to platforms like Render, Heroku, etc.

## 📄 License

MIT

## 🙏 Acknowledgments

- Uses [Free Dictionary API](https://dictionaryapi.dev/) for word definitions
- Built with Natural Language Processing for intelligent word extraction
- Modern UI inspired by SaaS design principles
