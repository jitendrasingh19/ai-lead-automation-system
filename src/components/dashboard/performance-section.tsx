"use client";

import { motion } from "framer-motion";

export function PerformanceSection({ metrics, loading }: { metrics: any[]; loading?: boolean }) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-900" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${metric.accent}`} />
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{metric.label}</p>
          <h4 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{metric.value}</h4>
        </motion.div>
      ))}
    </div>
  );
}
