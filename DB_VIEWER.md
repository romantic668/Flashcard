# How to View SQLite Database

## Option 1: Use the Node.js Viewer Script (Easiest)

Run the included script:
```bash
node view-db.js
```

This will show:
- All decks
- Card counts per deck
- Statistics
- Sample cards from each deck

## Option 2: Install SQLite CLI

### Windows:
1. Download SQLite from: https://www.sqlite.org/download.html
2. Extract `sqlite3.exe` to a folder in your PATH
3. Or use Chocolatey: `choco install sqlite`

### Then use:
```bash
# Open database
sqlite3 smartflash.db

# View tables
.tables

# View all decks
SELECT * FROM decks;

# View all cards
SELECT * FROM cards;

# View stats
SELECT * FROM stats;

# Count cards per deck
SELECT d.name, COUNT(c.id) as card_count 
FROM decks d 
LEFT JOIN cards c ON d.id = c.deck_id 
GROUP BY d.id;

# Exit
.quit
```

## Option 3: Use a GUI Tool (Recommended for Visual Viewing)

### DB Browser for SQLite (Free)
- Download: https://sqlitebrowser.org/
- Open `smartflash.db` file
- Browse tables, run queries, edit data visually

### VS Code Extension
- Install: "SQLite Viewer" extension
- Right-click `smartflash.db` → "Open Database"
- View tables in sidebar

### Other Options:
- **DBeaver** (Free, supports many databases): https://dbeaver.io/
- **SQLiteStudio** (Free): https://sqlitestudio.pl/
- **TablePlus** (Paid, beautiful UI): https://tableplus.com/

## Quick Commands Reference

```sql
-- View all tables
.tables

-- View schema
.schema

-- View all decks
SELECT * FROM decks;

-- View cards for a specific deck
SELECT * FROM cards WHERE deck_id = 'python';

-- Count total cards
SELECT COUNT(*) FROM cards;

-- View statistics
SELECT * FROM stats;

-- View with formatting
.mode column
.headers on
SELECT * FROM decks;
```

