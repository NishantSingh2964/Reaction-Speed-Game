import React from "react";
import { motion } from "framer-motion";

export default function TargetButton({ pos, onHit }) {
  return (
    <motion.button
      onClick={onHit}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="absolute w-16 h-16 rounded-full bg-pink-500 shadow-lg shadow-pink-500/50 flex items-center justify-center hover:scale-110 focus:outline-none"
      style={{ left: pos.x, top: pos.y }}
    >
      <span className="text-white text-lg font-bold">🎯</span>
    </motion.button>
  );
}
