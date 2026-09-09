import { useState, useEffect, useRef } from 'react';
import './style.css';
import {
  DRAWING_OBJECTS,
  getRandomObject,
  calculateScore,
  getResultMessage,
  getEmoji,
} from './gameEngine';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
  const [screen, setScreen] = useState('landing');
  const [round, setRound] = useState(1);
  const [usedObjects, setUsedObjects] = useState([]);
  const [currentObject, setCurrentObject] = useState('');
  const [timeLeft, setTimeLeft] = useState(12); // 12 seconds countdown
  const [score, setScore] = useState(0);
  const [roundsWon, setRoundsWon] = useState(0);
  const [drawing, setDrawing] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const timerRef = useRef(null);
  const submittedRef = useRef(false);

  // Web Audio API sound generators (no external files needed)
  const playTickSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      // Classic clock tick-tock sound
      // First tick - lower frequency click
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(600, ctx.currentTime);
      gain1.gain.setValueAtTime(0.2, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.04);

      // Second tick - higher frequency (tock)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1000, ctx.currentTime + 0.05);
      gain2.gain.setValueAtTime(0.22, ctx.currentTime + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.05);
      osc2.stop(ctx.currentTime + 0.09);
    } catch (e) {
      // Ignore audio context blocks prior to user interaction
    }
  };

  const playBeepSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  };

  const startGame = () => {
    const obj = getRandomObject([]);
    setCurrentObject(obj);
    setUsedObjects([obj]);
    setRound(1);
    setScore(0);
    setRoundsWon(0);
    setTimeLeft(10);
    setScreen('drawing');
    setError(null);
    submittedRef.current = false;
  };

  useEffect(() => {
    if (screen === 'drawing' && currentObject) {
      startTimer();
      initCanvas();
    }
  }, [screen, round, currentObject]);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(12); // 12 seconds countdown
    playTickSound(); // Play tick sound when countdown begins
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          playBeepSound();
          submitDrawing();
          return 0;
        }
        playTickSound();
        return prev - 1;
      });
    }, 1000);
  };

  const initCanvas = () => {
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        isDrawingRef.current = false;
      }
    }, 50);
  };

  const getCoords = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
    const clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  useEffect(() => {
    if (screen !== 'drawing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000';

    const startDrawing = (e) => {
      isDrawingRef.current = true;
      const { x, y } = getCoords(e, canvas);
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const draw = (e) => {
      if (!isDrawingRef.current) return;
      const { x, y } = getCoords(e, canvas);
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const stopDrawing = () => {
      isDrawingRef.current = false;
      ctx.closePath();
    };

    const handleTouchStart = (e) => {
      e.preventDefault();
      startDrawing(e.touches[0]);
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      draw(e.touches[0]);
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [screen, round]);

  const isCanvasEmpty = () => {
    const canvas = canvasRef.current;
    if (!canvas) return true;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] > 128) return false;
    }
    return true;
  };

  const submitDrawing = async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    if (timerRef.current) clearInterval(timerRef.current);

    if (isCanvasEmpty()) {
      setError('empty');
      submittedRef.current = false;
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const canvas = canvasRef.current;
      const imageData = canvas.toDataURL('image/png');
      setDrawing(imageData);

      const response = await fetch(`${API_BASE_URL}/api/analyze-drawing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target: currentObject,
          image: imageData,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        if (data.error === 'empty_drawing') {
          setError('empty');
        } else {
          setError('api');
        }
        setLoading(false);
        submittedRef.current = false;
        return;
      }

      const data = await response.json();
      const isWin = data.match;
      const roundScore = calculateScore(timeLeft, data.confidence, isWin);

      setResult({
        guess: data.guess,
        confidence: data.confidence,
        isWin,
        roundScore,
      });

      setScore((prev) => prev + roundScore);
      if (isWin) setRoundsWon((prev) => prev + 1);
      setScreen('result');
    } catch (err) {
      console.error('Network Error:', err);
      setError('network');
      submittedRef.current = false;
    }

    setLoading(false);
  };

  const nextRound = () => {
    if (round < 3) {
      const obj = getRandomObject(usedObjects);
      setCurrentObject(obj);
      setUsedObjects((prev) => [...prev, obj]);
      setRound((prev) => prev + 1);
      setTimeLeft(12);
      setError(null);
      submittedRef.current = false;
      setScreen('drawing');
    } else {
      setScreen('final');
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const accuracy = roundsWon > 0 ? Math.round((roundsWon / round) * 100) : 0;

  return (
    <div className="app">
      {screen === 'landing' && (
        <div className="screen landing">
          <div className="landing-content">
            <h1 className="title">🎨 AI DRAW CHALLENGE</h1>
            <div className="welcome-box">
              <h2>WELCOME TO OUR STALL! 🎉</h2>
              <p className="tagline">Have Fun • Draw • Let AI Code-Guess • Win! 🏆</p>
              <p className="subtitle">Think your drawing compiles successfully? 🤖</p>
              <p className="description">
                Draw the object before the <strong>12-second</strong> sprint timer runs out and pass strict code review!
              </p>
              <button className="btn-primary" onClick={startGame}>
                🚀 START PLAYING
              </button>
              <p className="footer">🎁 Play • Challenge Yourself • Win!</p>
            </div>
          </div>
        </div>
      )}

      {screen === 'drawing' && currentObject && (
        <div className="screen drawing">
          <div className="drawing-header">
            <div className="round-info">Round {round}/3</div>
            {/* Big prominent timer display */}
            <div className="timer-big" style={{ color: timeLeft <= 2 ? '#ff4444' : '#fff' }}>
              ⏱ 0:0{timeLeft}
            </div>
          </div>

          <div className="object-section">
            <h2>DRAW THIS</h2>
            <div className="object-display">
              <div className="emoji-large">{getEmoji(currentObject)}</div>
              <div className="object-name">{currentObject.toUpperCase()}</div>
            </div>
          </div>

          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="drawing-canvas"
          ></canvas>

          {error === 'empty' && (
            <div className="error-message">✏️ Draw something first before pushing!</div>
          )}
          {error === 'network' && (
            <div className="error-message">⚠️ Connection error. Is the server running?</div>
          )}
          {error === 'api' && (
            <div className="error-message">🤖 AI build failed. Please try again!</div>
          )}

          <div className="button-group">
            <button className="btn-secondary" onClick={clearCanvas}>
              🗑 CLEAR
            </button>
            <button className="btn-primary" onClick={submitDrawing} disabled={loading}>
              {loading ? (
                <span className="spinner-container">
                  <span className="spinner"></span> COMPILING...
                </span>
              ) : (
                '✅ DONE'
              )}
            </button>
          </div>
        </div>
      )}

      {screen === 'result' && result && (
        <div className="screen result">
          {result.isWin && <div className="confetti"></div>}

          <div className="result-content">
            <h1 className={result.isWin ? 'result-title-win' : 'result-title-loss'}>
              {result.isWin ? '🎉 BUILD SUCCESSFUL!' : '💥 BUILD FAILED!'}
            </h1>

            <div className="result-box">
              <div className="result-target">
                EXPECTED CODE OUTPUT<br />
                <span className="big-text">
                  {getEmoji(currentObject)} {currentObject.toUpperCase()}
                </span>
              </div>

              <div className="result-drawing">
                {drawing && <img src={drawing} alt="Your drawing" />}
              </div>

              <div className="result-guess">
                🤖 AI CODE REVIEW<br />
                <span className="big-text">"{result.guess}"</span>
                <div className="confidence">{Math.round(result.confidence * 100)}% CONFIDENCE</div>
              </div>
            </div>

            <div className="result-message">
              {getResultMessage(currentObject, result.guess, result.confidence, result.isWin).main}
            </div>

            <div className={`score-box ${result.isWin ? 'win' : 'loss'}`}>
              {result.isWin && <span className="score-label">+{result.roundScore} POINTS</span>}
              {!result.isWin && <span className="score-label">0 POINTS</span>}
            </div>

            <button className="btn-primary" onClick={nextRound}>
              {round < 3 ? '➡️ NEXT CHALLENGE' : '🏆 SEE FINAL SCORE'}
            </button>
          </div>
        </div>
      )}

      {screen === 'final' && (
        <div className="screen final">
          <div className="final-content">
            <h1>🏆 DEPLOYMENT COMPLETE!</h1>
            <p className="final-subtitle">ALL SPRINTS FINISHED!</p>

            <div className="final-stats">
              <div className="stat-box">
                <div className="stat-label">TOTAL SCORE</div>
                <div className="stat-value">{score}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">ROUNDS WON</div>
                <div className="stat-value">
                  {roundsWon} / 3
                </div>
              </div>
              <div className="stat-box">
                <div className="stat-label">ACCURACY</div>
                <div className="stat-value">{accuracy}%</div>
              </div>
            </div>

            <p className="final-message">
              {score > 700
                ? '🚀 LEGEND STATUS UNLOCKED! Your code is so good, even Elon Musk wants to hire you! NASA called - they want to use your algorithm to land on Mars! You broke the internet AND fixed it before anyone noticed! 🌟'
                : score > 500
                  ? '🎯 PRETTY AWESOME! Your code is like a plot twist in a Netflix series - unexpected but somehow it works! Even your cat is impressed! Your rubber duck is requesting a raise! 🦆'
                  : score > 300
                    ? '😅 HILARIOUSLY MEDIOCRE! Your code is like a dad joke - nobody understands it but somehow it\'s endearing! You\'ve achieved the perfect balance between genius and chaos! Your keyboard is now requiring therapy! 🎹'
                    : '💥 CATASTROPHICALLY HILARIOUS! Your code didn\'t fail - it achieved ENLIGHTENMENT and decided to reject your reality! Stack Overflow just flagged you as a "special case"! Your IDE sent flowers (as a breakup gift)! Even Skynet is like "Nope, that\'s too broken!" 🤖💔'}
            </p>

            <p className={`winner-message ${accuracy >= 80 ? 'winner' : 'loser'}`}>
              {accuracy >= 80
                ? '🏅 YOU ARE A WINNER! Congratulations! 🎉'
                : '💪 BETTER LUCK NEXT TIME! Keep practicing! 🚀'}
            </p>

            <button className="btn-primary" onClick={startGame}>
              🎮 PLAY AGAIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;