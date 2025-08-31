import React, { useEffect, useState } from "react";
import Particle from "../components/Particle";
import { Link } from "react-router-dom";
import useClickSound from "../Hook/useClickSound"; 

const mockLeaderboard = [
  { name: "Alex", score: 120 },
  { name: "Sam", score: 95 },
  { name: "Jordan", score: 80 },
  { name: "Taylor", score: 70 },
  { name: "Riley", score: 60 },
];

export default function Leaderboard({ overlay }) {
  const [bestScore, setBestScore] = useState(null);
  const playClick = useClickSound();

  useEffect(() => {
    const stored = localStorage.getItem("bestScore");
    if (stored) setBestScore(parseInt(stored, 10));
  }, []);

  const handleClick = (callback) => () => {
    playClick();
    if (callback) callback();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white">
      <Particle />

      <div
        className={`${
          overlay
            ? "fixed inset-0 flex items-center justify-center z-50 p-4"
            : "absolute inset-0 flex items-center justify-center z-10 p-6"
        }`}
      >
        <div className="w-full max-w-4xl bg-slate-900/80 border border-slate-700 rounded-3xl p-8 shadow-2xl backdrop-blur-sm text-center">
          <h1 className="text-4xl font-bold mb-8 text-yellow-400 drop-shadow-lg">
            🏆 Leaderboard
          </h1>

          <ul className="divide-y divide-slate-700 rounded-lg overflow-hidden mb-6">
            {mockLeaderboard.map((player, idx) => (
              <li
                key={idx}
                className={`flex justify-between items-center px-6 py-4 transition-all hover:bg-slate-700/70 ${
                  idx % 2 === 0 ? "bg-slate-800/60" : "bg-slate-800/50"
                }`}
              >
                <span className="font-medium text-slate-300">{player.name}</span>
                <span className="font-semibold text-slate-100">{player.score}</span>
              </li>
            ))}

            {bestScore !== null && (
              <li className="flex justify-between items-center px-6 py-4 mt-4 bg-green-600/70 shadow-lg rounded-lg animate-pulse transform scale-105">
                <span className="text-green-200 font-bold">You</span>
                <span className="font-bold text-green-100">{bestScore}</span>
              </li>
            )}
          </ul>

          {!overlay && (
            <Link
              to="/"
              replace
              onClick={handleClick()}
              className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold shadow-md transition"
            >
              Back to Home
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
