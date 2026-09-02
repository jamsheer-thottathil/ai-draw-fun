import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
// Strict threshold to prevent dissimilar drawings from passing
const THRESHOLD = parseFloat(process.env.AI_MATCH_THRESHOLD) || 0.75;

// Initialize official OpenAI client configured for AICredits
const aiClient = new OpenAI({
  apiKey: process.env.AICREDITS_API_KEY,
  baseURL: process.env.AICREDITS_ENDPOINT || 'https://api.aicredits.in/v1',
});

// Middleware configuration
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

// Normalize strings for comparison
function normalize(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/^(a|an|the)\s+/, '')
    .replace(/[^\w\s]/g, '')
    .trim();
}

// Check if drawing is empty (mostly white canvas)
function isDrawingEmpty(imageData) {
  try {
    const base64 = imageData.split(',')[1] || imageData;
    return Buffer.byteLength(base64, 'base64') < 300;
  } catch (e) {
    return true;
  }
}

app.post('/api/analyze-drawing', async (req, res) => {
  try {
    const { target, image } = req.body;

    if (!target || typeof target !== 'string' || !image || typeof image !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid target/image payload' });
    }

    if (isDrawingEmpty(image)) {
      return res.status(400).json({ error: 'empty_drawing' });
    }

    const prompt = `You are an extremely strict code review and shape-recognition engine for a drawing game.
The player was asked to draw: "${target}"
Analyze the supplied drawing carefully. 

Return ONLY valid JSON in this exact format:
{
  "guess": "string",
  "confidence": 0.0,
  "match": true
}

Rules:
- confidence must be a float between 0 and 1 representing how clearly the drawing resembles the target object.
- match must be true ONLY if the drawing accurately and unmistakably represents "${target}". If it looks like something else, or is too vague/scribbled, match must be false.
- Be strict: dissimilar drawings, random lines, or incorrect objects must fail (match: false).
- Do not include any markdown formatting or extra text outside the JSON block.`;

    const response = await aiClient.chat.completions.create({
      model: process.env.AICREDITS_MODEL || 'openai/gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: image } },
          ],
        },
      ],
      max_tokens: 300,
      response_format: { type: 'json_object' },
    });

    const aiText = response.choices?.[0]?.message?.content || '{}';
    
    let parsed;
    try {
      const firstBrace = aiText.indexOf('{');
      const lastBrace = aiText.lastIndexOf('}');
      const jsonString = (firstBrace !== -1 && lastBrace !== -1) 
        ? aiText.substring(firstBrace, lastBrace + 1) 
        : aiText;
        
      parsed = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('JSON Parse Error for text:', aiText);
      return res.status(502).json({ error: 'Invalid format received from AI model' });
    }

    const confidence = parseFloat(parsed.confidence) || 0;
    const guess = typeof parsed.guess === 'string' ? parsed.guess : 'unknown';

    const normalTarget = normalize(target);
    const normalGuess = normalize(guess);

    // Strict evaluation: must have match set to true and clear the high threshold
    const finalMatch = parsed.match === true && confidence >= THRESHOLD;

    return res.json({
      guess: guess,
      confidence: Math.round(confidence * 100) / 100,
      match: finalMatch,
      guessNormalized: normalGuess,
      targetNormalized: normalTarget,
    });

  } catch (error) {
    console.error('API Error Details:', error.message);
    
    if (error.status === 401) {
      return res.status(401).json({ error: 'API authentication failed' });
    }
    
    return res.status(500).json({ error: 'Internal server error processing drawing' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🎨 AI Draw Challenge backend running securely on port ${PORT}`);
});