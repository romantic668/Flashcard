const express = require('express');
const cors = require('cors');
const path = require('path');
const { initializeDatabase, query, queryOne, run } = require('./database');

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
    })
    .catch((error) => {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    });

// API Routes

// Get all decks with card counts
app.get('/api/decks', async (req, res) => {
    try {
        const decks = await query('SELECT id, name FROM decks');
        const result = {};
        
        for (const deck of decks) {
            const cards = await query(
                'SELECT id, front, back FROM cards WHERE deck_id = ? ORDER BY id',
                [deck.id]
            );
            result[deck.id] = {
                name: deck.name,
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

// Serve the main app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`SmartFlash server running on http://localhost:${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api/decks`);
    console.log(`Database: smartflash.db`);
});
