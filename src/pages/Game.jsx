import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Particle from "../components/Particle";
import Arena from "../components/Arena";
import { useGame } from "../context/GameContext";
import Leaderboard from "../Leaderboard/Leaderboard";
import useClickSound from "../Hook/useClickSound";

export default function Game() {
  const {
    score,
    timeLeft,
    isRunning,
    isPaused,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
  } = useGame();

  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [gameEndedSoundPlayed, setGameEndedSoundPlayed] = useState(false);
  const playClick = useClickSound();
  const backgroundAudioRef = useRef(null);

  const gameEnded = !isRunning && !isPaused && score > 0;

  // Play game-end sound once
  useEffect(() => {
    if (gameEnded && !gameEndedSoundPlayed) {
      new Audio("/sounds/game-over.mp3").play();
      setGameEndedSoundPlayed(true);
    }
    if (!gameEnded) setGameEndedSoundPlayed(false);
  }, [gameEnded, gameEndedSoundPlayed]);

  // Background music
  useEffect(() => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.volume = 0.3;
      backgroundAudioRef.current.play().catch((err) => console.log(err));
    }
  }, []);

  const handleStartGame = () => { playClick(); startGame(); };
  const handlePauseResume = () => { playClick(); isPaused ? resumeGame() : pauseGame(); };
  const handleReset = () => { playClick(); resetGame(); };
  const handleButtonClick = (callback) => () => { playClick(); if (callback) callback(); };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-white p-4">
      <Particle />
      <audio ref={backgroundAudioRef} src="/sounds/background.mp3" loop autoPlay />

      {/* Floating Links */}
      <div className="w-full flex justify-between absolute top-4 px-4 z-50">
        <Link
          to="/"
          replace
          onClick={handleButtonClick()}
          className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-500/80 hover:bg-blue-500/100 text-white rounded-lg font-semibold shadow-md transition text-sm sm:text-base"
        >
          Back Home
        </Link>
        <Link
          to="/about"
          replace
          onClick={handleButtonClick()}
          className="px-3 py-2 sm:px-4 sm:py-2 bg-purple-500/80 hover:bg-purple-500/100 text-white rounded-lg font-semibold shadow-md transition text-sm sm:text-base"
        >
          About
        </Link>
      </div>

      {/* Leaderboard Overlay */}
      {showLeaderboard && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <Leaderboard overlay={true} />
        </div>
      )}

      {/* Game UI */}
      {!showLeaderboard && (
        <div className="flex flex-col items-center justify-center z-10 mt-16 w-full max-w-[95%] sm:max-w-[900px]">
          
          {/* Scoreboard */}
          {(isRunning || isPaused) && (
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6">
              <div className="bg-slate-900/80 px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-slate-700 shadow-md text-sm sm:text-base">
                <span className="text-slate-300">Score:</span>{" "}
                <span className="font-bold text-green-400">{score}</span>
              </div>
              <div className="bg-slate-900/80 px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-slate-700 shadow-md text-sm sm:text-base">
                <span className="text-slate-300">Time:</span>{" "}
                <span className={`font-bold ${timeLeft <= 3 ? "text-red-400" : "text-blue-400"}`}>
                  {timeLeft}
                </span>
              </div>
            </div>
          )}

          {/* Game Running / Paused */}
          {(isRunning || isPaused) && (
            <div className="flex flex-col items-center w-full">
              <Arena />

              {/* Pause / Resume and Reset Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                  onClick={handlePauseResume}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-base sm:text-lg font-bold shadow-md transition"
                >
                  {isPaused ? "Resume" : "Pause"}
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-red-500 hover:bg-red-600 rounded-lg text-base sm:text-lg font-bold shadow-md transition"
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          {/* Start Game Button */}
          {!isRunning && !isPaused && !gameEnded && (
            <button
              onClick={handleStartGame}
              className="px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-700 rounded-lg text-base sm:text-lg font-bold shadow-md mt-4"
            >
              Start Game
            </button>
          )}

          {/* Game Over Overlay */}
          {gameEnded && (
            <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 animate-fadeIn mt-4 sm:mt-6 w-full max-w-[90%] sm:max-w-md">
              <h2 className="text-3xl sm:text-4xl font-bold text-red-500 mb-2">🎮 Game Over</h2>
              <p className="text-slate-200 text-base sm:text-lg">
                Your Score: <span className="font-bold text-green-400">{score}</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                  onClick={handleButtonClick(() => setShowLeaderboard(true))}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-base sm:text-lg font-bold shadow-md transition"
                >
                  Show Leaderboard
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-green-500 hover:bg-green-600 rounded-lg text-base sm:text-lg font-bold shadow-md transition"
                >
                  Restart Game
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
