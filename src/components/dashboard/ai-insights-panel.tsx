"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Sparkles } from "lucide-react";

export function AIInsightsPanel({ insights, loading }: { insights: string[]; loading?: boolean }) {
  if (loading) {
    return (
      <div className="h-[420px] animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-900" />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 p-6 text-white"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-indigo-100">AI Intelligence</p>
          <h3 className="mt-1 text-xl font-semibold">Insights</h3>
        </div>
        <div className="rounded-2xl bg-white/10 p-3">
          <BrainCircuit size={18} />
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {insights.map((insight, index) => (
          <div
            key={insight}
            className={`rounded-2xl border p-4 backdrop-blur-sm ${
              index === 0
                ? "border-cyan-300/30 bg-cyan-500/10"
                : index === 1
                  ? "border-violet-300/30 bg-violet-500/10"
                  : "border-emerald-300/30 bg-emerald-500/10"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-xl bg-white/10 p-2">
                <Sparkles size={16} />
              </div>
              <p className="text-sm leading-6 text-white/90">{insight}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
