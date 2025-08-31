import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Particle from "../components/Particle";
import useClickSound from "../Hook/useClickSound";

export default function About() {
  const audioRef = useRef(null);
  const [audioStarted, setAudioStarted] = useState(false);
  const playClick = useClickSound(); 

  const startAudio = () => {
    if (!audioStarted && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setAudioStarted(true);
    }
  };

  const handleClick = (callback) => () => {
    playClick();
    if (callback) callback();
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-white"
      onClick={startAudio} 
    >

      <Particle />

      <audio ref={audioRef} loop src="/sounds/home-background.mp3" />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-slate-900/80 p-10 rounded-2xl shadow-2xl max-w-2xl text-center border border-slate-700">
          <h1 className="text-3xl font-bold mb-4">ℹ️ About the Game</h1>
          <p className="text-slate-300 mb-6 leading-relaxed">
            <strong>Reaction Speed</strong> is a fast-paced reflex game where
            you must click the targets before the timer runs out. Each round
            becomes harder as the time decreases and targets move faster.
          </p>

          <ul className="text-left text-slate-300 mb-6 space-y-2 list-disc list-inside">
            <li>🎯 Click targets as fast as possible to score points.</li>
            <li>⏳ Watch out—the timer decreases every round.</li>
            <li>📈 Difficulty scales: faster targets, shorter time.</li>
            <li>🏆 Your best score is saved in local storage.</li>
            <li>⏸️ You can pause/resume anytime.</li>
          </ul>

          <div className="flex justify-center gap-4">
            <Link
              to="/"
              replace
              onClick={handleClick()}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold shadow-md transition"
            >
              Back Home
            </Link>
            <Link
              to="/game"
              replace
              onClick={handleClick()}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold shadow-md transition"
            >
              Play Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
