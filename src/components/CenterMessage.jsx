import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CenterMessage({ children }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center z-20"
      >
        <div className="bg-slate-900/80 border border-slate-700 rounded-2xl px-6 py-4 shadow-xl text-center">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
