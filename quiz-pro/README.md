# Quiz Pro

A premium, highly interactive, and visually stunning web application for testing web technology skills.

## Features
- **Categories**: HTML5 Mastery, CSS3 Styling, and JavaScript ES6+.
- **Dynamic Timer**: 15 seconds per question with color-coded alerts (turns red under 5 seconds).
- **Progress Tracking**: Visual top progress bar showing current question completion.
- **Score Report**: Real-time scoring out of 20 with responsive grading messages.
- **Smooth Interaction**: Modern hover/click effects, brand-colored glowing indicators, and glassmorphic card layouts.
- **Zero Dependencies**: Runs entirely in the client-side browser with no server requirements, circumventing local CORS restrictions when loaded via the `file://` protocol.

## How to Run
To run the quiz app, locate the project folder and **double-click the `index.html` file** to open it directly in your favorite web browser (Chrome, Firefox, Safari, Edge, etc.).

Alternatively, if you wish to serve it over a local server, you can use any static file server:
```bash
# Python 3
python -m http.server 8000

# Node.js (if installed)
npx serve .
```

## File Structure
- `index.html` - Core HTML skeleton with embedded SVG icons and semantic structure.
- `style.css` - Custom styling rules, glassmorphic layout tokens, responsive media queries, and transition keyframes.
- `questions.js` - Global database containing 20+ questions per category.
- `script.js` - Client-side state machine, quiz loops, score counters, and timers.
