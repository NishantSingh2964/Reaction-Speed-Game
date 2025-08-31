import React, { createContext, useContext, useState, useEffect, useRef } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const startGame = () => {
    clearInterval(timerRef.current);
    setScore(0);
    setTimeLeft(30);
    setIsRunning(true);
    setIsPaused(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          setIsPaused(false); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setIsPaused(true);
  };

  const resumeGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(true);
    setIsPaused(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          setIsPaused(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetGame = () => {
    clearInterval(timerRef.current);
    setScore(0);
    setTimeLeft(30);
    setIsRunning(false);
    setIsPaused(false);
  };

  const increaseScore = () => {
    if (isRunning && !isPaused) setScore((prev) => prev + 1);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <GameContext.Provider
      value={{
        score,
        timeLeft,
        isRunning,
        isPaused,
        startGame,
        pauseGame,
        resumeGame,
        resetGame,
        increaseScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
