# AI Draw Challenge

A fun, simple AI drawing game for event stalls. Players draw objects, AI guesses them.

## Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your AICredits credentials
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000`

## Requirements

- Node.js 16+
- AICredits API key
- AICredits model name

## Environment Variables (Backend)

```env
AICREDITS_API_KEY=your_key
AICREDITS_MODEL=your_model
PORT=3001
AI_MATCH_THRESHOLD=0.60
```

## Game Flow

1. Landing screen - player starts
2. 5 rounds of drawing (20s each)
3. AI analyzes each drawing
4. Funny result screen
5. Final score after round 5

## Customization

- Edit `frontend/src/gameEngine.js` to add/change drawing objects
- Modify `backend/.env` to adjust AI confidence threshold
- Customize messages in `frontend/src/gameEngine.js`
