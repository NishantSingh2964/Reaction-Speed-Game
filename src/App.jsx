import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";

import Home from "./pages/Home";
import Game from "./pages/Game";
import Leaderboard from "./Leaderboard/Leaderboard";
import About from "./pages/About";

export default function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

