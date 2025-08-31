import React from "react";

export default function StatCard({ label, value }) {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 shadow-md min-w-[90px]">
      <span className="text-xs text-slate-400 uppercase tracking-wide mb-1">{label}</span>
      <span className="text-lg font-bold text-slate-100 tabular-nums">{value}</span>
    </div>
  );
}
