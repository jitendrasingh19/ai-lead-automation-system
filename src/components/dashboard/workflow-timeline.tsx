"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock3 } from "lucide-react";

export function WorkflowTimeline({ items, loading }: { items: any[]; loading?: boolean }) {
  if (loading) {
    return (
      <div className="h-[430px] animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-900" />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
    >
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">Automation</p>
        <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Workflow Activity</h3>
      </div>
      <div className="mt-5 space-y-4">
        {items.map((item, index) => (
          <div key={item.step} className="flex gap-3">
            <div className="flex flex-col items-center">
              {item.status === "complete" ? (
                <CheckCircle2 size={18} className="text-emerald-500" />
              ) : item.status === "in-progress" ? (
                <Clock3 size={18} className="text-amber-500" />
              ) : (
                <Circle size={18} className="text-slate-300 dark:text-slate-600" />
              )}
              {index < items.length - 1 && <div className="mt-2 h-10 w-px bg-slate-200 dark:bg-slate-700" />}
            </div>
            <div className="flex-1 pb-3">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{item.step}</p>
                <span className="text-xs text-slate-500 dark:text-slate-400">{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
