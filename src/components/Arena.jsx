import React, { useState, useEffect } from "react";
import { useGame } from "../context/GameContext";

export default function Arena() {
  const { increaseScore, isRunning } = useGame();
  const [targets, setTargets] = useState([]);
  const [particles, setParticles] = useState([]);

  const clickSound = new Audio("/sounds/click.mp3");

  // Spawn random targets
  useEffect(() => {
    if (!isRunning) {
      setTargets([]);
      return;
    }

    const spawnTarget = () => {
      const id = Date.now();
      setTargets((prev) => [
        ...prev,
        {
          id,
          x: Math.random() * 80 + 10,
          y: Math.random() * 70 + 10,
          clicked: false,
        },
      ]);
      setTimeout(() => {
        setTargets((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    };

    const interval = setInterval(spawnTarget, 1200);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Handle click
  const handleClick = (id, x, y) => {
    increaseScore();
    clickSound.currentTime = 0;
    clickSound.play();

    setTargets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, clicked: true } : t))
    );
    setTimeout(() => {
      setTargets((prev) => prev.filter((t) => t.id !== id));
    }, 300);

    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x,
      y,
      dx: Math.cos((i * 45 * Math.PI) / 180) * 40,
      dy: Math.sin((i * 45 * Math.PI) / 180) * 40,
      active: false,
    }));
    setParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles((prev) =>
        prev.map((p) =>
          newParticles.some((np) => np.id === p.id) ? { ...p, active: true } : p
        )
      );
    }, 10);

    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.some((np) => np.id === p.id))
      );
    }, 400);
  };

  return (
    <div className="relative w-[800px] h-[420px] bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
      {/* Targets */}
      {targets.map((t) => (
        <div
          key={t.id}
          onClick={() => handleClick(t.id, t.x, t.y)}
          className={`
            absolute w-16 h-16 rounded-full cursor-pointer
            bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
            shadow-[0_0_20px_rgba(255,0,255,0.6)]
            flex items-center justify-center
            transition-all duration-300
            ${t.clicked ? "scale-0 opacity-0 shadow-none" : "animate-pulse rotate-slow"}
          `}
          style={{ left: `${t.x}%`, top: `${t.y}%` }}
        >
          <div className="w-10 h-10 rounded-full bg-white/30 animate-pulse" />
        </div>
      ))}

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute w-3 h-3 bg-yellow-400 rounded-full transition-all duration-300`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: p.active
              ? `translate(${p.dx}px, ${p.dy}px) scale(0)`
              : "translate(0,0) scale(1)",
            opacity: p.active ? 0 : 1,
          }}
        />
      ))}
    </div>
  );
}
