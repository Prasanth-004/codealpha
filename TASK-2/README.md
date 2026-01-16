# Music Player

A simple music player web application built with HTML, CSS, and JavaScript.

## Features

- Play, pause, next, and previous controls
- Display song title, artist, and duration
- Progress bar for seeking
- Volume control
- Playlist with clickable songs
- Autoplay to next song when current ends

## Usage

1. Place your audio files (MP3 format) in the same directory as the HTML file.
2. Update the `playlist` array in `script.js` with your song details:
   ```javascript
   const playlist = [
       { title: 'Your Song Title', artist: 'Artist Name', src: 'your-song.mp3' },
       // Add more songs...
   ];
   ```
3. Open `index.html` in a web browser or run a local server.

## Running Locally

To run the application locally:

1. Ensure you have Python installed.
2. Open a terminal in the project directory.
3. Run: `python -m http.server 8000`
4. Open `http://localhost:8000` in your browser.

## Files

- `index.html`: Main HTML structure
- `styles.css`: CSS styling
- `script.js`: JavaScript functionality