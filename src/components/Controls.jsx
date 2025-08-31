import React, { useEffect, useRef } from "react";
import { useGame } from "../context/GameContext";

export default function Controls() {
  const { isRunning, isPaused, startGame, pauseGame, resumeGame, resetGame } = useGame();
  const startSoundRef = useRef(null);

  useEffect(() => {
    startSoundRef.current = new Audio("/sounds/start.mp3");
  }, []);

  const playStartSound = () => {
    if (startSoundRef.current) {
      startSoundRef.current.currentTime = 0;
      startSoundRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="flex gap-6 mt-8">
      {/* Start Button */}
      {!isRunning && !isPaused && (
        <button
          onClick={() => { playStartSound(); startGame(); }}
          className="px-6 py-3 rounded-xl bg-green-500 text-white font-semibold shadow-lg hover:bg-green-600 transition"
        >
          Start
        </button>
      )}

      {/* Pause Button */}
      {isRunning && !isPaused && (
        <button
          onClick={pauseGame}
          className="px-6 py-3 rounded-xl bg-yellow-500 text-white font-semibold shadow-lg hover:bg-yellow-600 transition"
        >
          Pause
        </button>
      )}

      {/* Play/Resume Button */}
      {isPaused && (
        <button
          onClick={resumeGame}
          className="px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold shadow-lg hover:bg-blue-600 transition"
        >
          Play
        </button>
      )}

      {/* Reset Button */}
      {(isRunning || isPaused) && (
        <button
          onClick={resetGame}
          className="px-6 py-3 rounded-xl bg-red-500 text-white font-semibold shadow-lg hover:bg-red-600 transition"
        >
          Reset
        </button>
      )}
    </div>
  );
}
