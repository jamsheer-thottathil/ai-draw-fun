# Quick Start

## 1. Backend Setup (Terminal 1)

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your AICredits credentials
npm run dev
```

Backend runs on `http://localhost:3001`

## 2. Frontend Setup (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## 3. Play the Game

Open `http://localhost:3000` in your browser and start playing!

## Project Structure

```
ai-draw-challenge/
├── backend/
│   ├── server.js           # Express server + AICredits integration
│   ├── package.json
│   └── .env.example        # Copy to .env
│
└── frontend/
    ├── src/
    │   ├── App.jsx         # Main game component
    │   ├── gameEngine.js   # Game logic (objects, scoring, messages)
    │   ├── main.jsx        # React entry point
    │   └── style.css       # All styling
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Key Features Implemented

✅ Landing screen with call-to-action
✅ 5-round drawing game (20s per round)
✅ HTML5 Canvas with mouse & touch support
✅ Timer countdown with auto-submit
✅ Backend AICredits integration (secure)
✅ Smart AI response parsing
✅ Funny result messages (generated locally)
✅ Score calculation with time/confidence bonuses
✅ Final screen with stats
✅ Mobile-responsive design
✅ No unnecessary dependencies

## Customization

### Add more objects to draw:
Edit `frontend/src/gameEngine.js`:
```javascript
export const DRAWING_OBJECTS = [
  'elephant',
  'car',
  // Add more here
];
```

### Change AI confidence threshold:
Edit `backend/.env`:
```env
AI_MATCH_THRESHOLD=0.60
```

### Customize funny messages:
Edit `frontend/src/gameEngine.js`, modify the message arrays:
```javascript
const funnyWins = [...]
const funnyLosses = [...]
```

## Troubleshooting

**Canvas not drawing?**
- Check browser console for errors
- Verify canvas ref is initialized
- Try refreshing the page

**AI errors?**
- Check AICredits API key in `.env`
- Verify model name is correct
- Check backend logs for API response

**Frontend can't reach backend?**
- Ensure backend is running on port 3001
- Check CORS settings in server.js
- Verify vite proxy in vite.config.js

## Performance Notes

- Images sent to AI are optimized automatically
- Only ONE AI request per round (on submit or timer)
- Funny messages generated locally (no extra API calls)
- No unnecessary re-renders or state updates
- Canvas drawing is smooth and responsive

Enjoy! 🎨
