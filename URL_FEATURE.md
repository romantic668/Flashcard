# URL to Flashcards Feature

## Overview
This feature allows users to input any URL, and the system will automatically:
1. Fetch the webpage
2. Extract main text content
3. Identify unfamiliar English words
4. Generate flashcards with definitions
5. Store them in the SQLite database

## How It Works

### Pipeline:
```
URL → Fetch → Extract Text → Tokenize → Remove Stopwords → 
Lemmatize → Filter Common Words → Identify Unknown Words → 
Get Definitions → Build Example Sentences → Insert Flashcards → 
Return Created List
```

### Technical Details:

1. **URL Fetching**: Uses `node-fetch` to retrieve webpage content
2. **Text Extraction**: Uses `cheerio` to parse HTML and extract main content from:
   - `<article>` tags
   - `<main>` content areas
   - Paragraphs (`<p>` tags)
   - Removes scripts, styles, navigation, ads

3. **Text Processing**:
   - Tokenizes text using Natural Language Processing
   - Removes common English words (stopwords + common vocabulary)
   - Filters words already in database
   - Identifies top 20 most frequent unknown words

4. **Word Definition**:
   - Uses Free Dictionary API (https://dictionaryapi.dev/)
   - Gets part of speech, definition, and example sentences
   - Falls back to context-based examples if API doesn't provide

5. **Flashcard Creation**:
   - Front: Capitalized word
   - Back: [Part of Speech] Definition + Example sentence
   - Stored in "english" deck

## Usage

1. Enter a URL in the input field (e.g., `https://example.com/article`)
2. Click "Generate Flashcards"
3. Wait for processing (may take 10-30 seconds)
4. New flashcards will appear in the English Vocabulary deck

## API Endpoint

```
POST /api/generate-from-url
Body: { "url": "https://example.com/article" }
Response: {
  "success": true,
  "message": "Successfully generated X flashcards...",
  "cards": [...],
  "stats": {
    "totalWords": 15,
    "cardsCreated": 12
  }
}
```

## Dependencies

- `cheerio`: HTML parsing and text extraction
- `node-fetch`: HTTP requests for fetching webpages
- `natural`: Natural language processing (tokenization, stemming)

## Limitations

- Works best with article/blog content
- May not work with JavaScript-heavy sites (SPAs)
- Rate limited by dictionary API (200ms delay between requests)
- Only processes English words
- Minimum 3 characters per word
- Skips words already in database

## Future Enhancements

- Support for multiple languages
- Custom word difficulty levels
- Batch URL processing
- Export/import word lists
- Custom stopword lists
- Image extraction for context

