"use client";

import { motion } from "framer-motion";

export function DealFunnel({ stages, loading }: { stages: any[]; loading?: boolean }) {
  if (loading) {
    return (
      <div className="h-[420px] animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-900" />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
    >
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">Pipeline</p>
        <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Deal Stage Funnel</h3>
      </div>
      <div className="mt-5 space-y-3">
        {stages.map((stage, index) => (
          <div key={stage.stage}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700 dark:text-slate-200">{stage.stage}</span>
              <span className="text-slate-500 dark:text-slate-400">{stage.count} · {stage.percent}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className={`h-full rounded-full ${
                  index === 0
                    ? "bg-gradient-to-r from-indigo-500 to-cyan-500"
                    : index === 1
                      ? "bg-gradient-to-r from-violet-500 to-indigo-500"
                      : index === 2
                        ? "bg-gradient-to-r from-sky-500 to-cyan-500"
                        : index === 3
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                          : index === 4
                            ? "bg-gradient-to-r from-amber-500 to-orange-500"
                            : "bg-gradient-to-r from-rose-500 to-pink-500"
                }`}
                style={{ width: `${stage.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
