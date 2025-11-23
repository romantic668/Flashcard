const { getDatabase, query, queryOne } = require('./database');

async function viewDatabase() {
    console.log('=== SmartFlash Database Viewer ===\n');
    
    try {
        // Get all decks
        console.log('📚 DECKS:');
        console.log('─'.repeat(50));
        const decks = await query('SELECT id, name, created_at FROM decks ORDER BY id');
        for (const deck of decks) {
            console.log(`  ${deck.id}: ${deck.name} (created: ${deck.created_at})`);
        }
        console.log('');
        
        // Get card counts per deck
        console.log('📊 CARD COUNTS:');
        console.log('─'.repeat(50));
        for (const deck of decks) {
            const count = await queryOne(
                'SELECT COUNT(*) as count FROM cards WHERE deck_id = ?',
                [deck.id]
            );
            console.log(`  ${deck.name}: ${count.count} cards`);
        }
        console.log('');
        
        // Get stats
        console.log('📈 STATISTICS:');
        console.log('─'.repeat(50));
        const stats = await query('SELECT deck_id, user_id, known, unknown, updated_at FROM stats');
        if (stats.length === 0) {
            console.log('  No statistics recorded yet.');
        } else {
            for (const stat of stats) {
                const deck = await queryOne('SELECT name FROM decks WHERE id = ?', [stat.deck_id]);
                console.log(`  ${deck.name} (${stat.user_id}):`);
                console.log(`    Known: ${stat.known}, Unknown: ${stat.unknown}`);
                console.log(`    Last updated: ${stat.updated_at}`);
            }
        }
        console.log('');
        
        // Show sample cards from each deck
        console.log('🃏 SAMPLE CARDS (first 3 from each deck):');
        console.log('─'.repeat(50));
        for (const deck of decks) {
            const cards = await query(
                'SELECT id, front, back FROM cards WHERE deck_id = ? ORDER BY id LIMIT 3',
                [deck.id]
            );
            console.log(`\n  ${deck.name}:`);
            for (const card of cards) {
                console.log(`    [${card.id}] Q: ${card.front.substring(0, 50)}...`);
                console.log(`         A: ${card.back.substring(0, 50)}...`);
            }
        }
        
        console.log('\n✅ Database view complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error viewing database:', error);
        process.exit(1);
    }
}

viewDatabase();

