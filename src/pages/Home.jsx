import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Particle from "../components/Particle";
import useClickSound from "../Hook/useClickSound";

export default function Home() {
  const bgMusicRef = useRef(null);
  const playClick = useClickSound(); 

  // Autoplay background music or play on first interaction
  useEffect(() => {
    const playMusic = () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.play().catch(() => {});
      }
    };

    playMusic();

    const handleUserInteraction = () => playMusic();
    window.addEventListener("click", handleUserInteraction, { once: true });
    window.addEventListener("touchstart", handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  // Button click wrapper
  const handleClick = (callback) => () => {
    playClick();
    if (callback) callback();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white">
      {/* Particle Background */}
      <Particle />

      {/* Background Music */}
      <audio ref={bgMusicRef} src="/sounds/background2.mp3" loop preload="auto" />

      {/* Top Right Code Button */}
      <a
        href="https://github.com/NishantSingh2964/Reaction-Speed-Game"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick()}
        className="absolute top-4 right-4 z-50 px-4 py-2 bg-gray-800 hover:bg-gray-900 rounded-lg font-semibold shadow-md transition"
      >
        Get Code
      </a>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-slate-900/80 p-10 rounded-2xl shadow-2xl max-w-lg text-center border border-slate-700">
          <h1 className="text-4xl font-bold mb-4">⚡ Reaction Speed</h1>
          <p className="text-slate-300 mb-8">
            Test your reflexes! Click the targets as fast as you can before the
            timer runs out. Difficulty increases each round.
          </p>

          <div className="flex flex-col gap-4">
            <Link
              to="/game"
              replace
              onClick={handleClick()}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold shadow-md transition"
            >
              Play Game
            </Link>
            <Link
              to="/about"
              replace
              onClick={handleClick()}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold shadow-md transition"
            >
              How to Play
            </Link>
            <Link
              to="/leaderboard"
              replace
              onClick={handleClick()}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold shadow-md transition"
            >
              Leaderboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
