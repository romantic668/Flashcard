# SmartFlash - Flashcard Study Tool

A modern, installable PWA flashcard application for studying Python, English Vocabulary, and Linux Commands.

🌐 **Live Demo**: [https://flashcard-iula.onrender.com/](https://flashcard-iula.onrender.com/)

## Features

- 🎴 **3 Flashcard Decks**: Python (25 cards), English Vocabulary (30 cards), Linux Commands (30 cards)
- 🔄 **Smooth Flip Animation**: 3D card flip effect
- 📊 **Stats Tracking**: Track known vs unknown cards per deck
- 📱 **Mobile-Friendly**: Responsive design that works on all devices
- 🔌 **Backend API**: Optional Node.js/Express backend for data management
- 📦 **PWA Ready**: Installable as a Progressive Web App

## Quick Start (Frontend Only)

Simply open `index.html` in your browser. The app works standalone with local data.

## Running with Backend

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

The frontend will automatically try to connect to the backend API. If the backend is not available, it will fall back to using local data.

## API Endpoints

### Get All Decks
```
GET /api/decks
```

### Get Specific Deck
```
GET /api/decks/:deckId
```

### Get Cards from Deck
```
GET /api/decks/:deckId/cards
```

### Add Card to Deck
```
POST /api/decks/:deckId/cards
Body: { "front": "Question", "back": "Answer" }
```

### Update Card
```
PUT /api/decks/:deckId/cards/:cardIndex
Body: { "front": "Question", "back": "Answer" }
```

### Delete Card
```
DELETE /api/decks/:deckId/cards/:cardIndex
```

### Save Stats
```
POST /api/stats
Body: { "stats": {...} }
```

## Project Structure

```
smartflash/
├── index.html          # Main HTML file
├── style.css           # Styles and animations
├── script.js           # Frontend JavaScript
├── manifest.json       # PWA manifest
├── service-worker.js   # Service worker for offline support
├── server.js           # Backend Express server
├── database.js         # SQLite database module
├── package.json        # Node.js dependencies
├── smartflash.db       # SQLite database (created on first run)
├── icons/              # PWA icons
│   ├── icon-192.png
│   └── icon-512.png
└── README.md           # This file
```

## Usage

1. **Select a Deck**: Click on one of the three deck cards (Python, English Vocabulary, or Linux Commands)
2. **Study Cards**: Click "Flip Card" or click the card itself to see the answer
3. **Mark Progress**: Click "I knew this" or "I forgot" to track your progress
4. **Navigate**: Click "Next Card" to move to the next flashcard
5. **View Stats**: See your known vs unknown statistics at the bottom

## Technology Stack

- **Frontend**: Pure HTML, CSS, JavaScript (no frameworks)
- **Backend**: Node.js with Express
- **Database**: SQLite (file-based, no separate server needed)
- **Storage**: LocalStorage (frontend), SQLite database (backend)
- **PWA**: Service Worker + Web App Manifest

## License

MIT

