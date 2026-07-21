"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  Sparkles,
  TrendingUp,
  Target,
  ShieldCheck,
} from "lucide-react";

type Props = {
  insights: string[];
  loading?: boolean;
};

export function AIInsightsPanel({
  insights,
  loading = false,
}: Props) {
  if (loading) {
    return (
      <div className="h-[460px] animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-900" />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 text-white shadow-2xl"
    >
      {/* Header */}
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-100">
              Artificial Intelligence
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              AI Insights
            </h2>

            <p className="mt-2 text-sm text-indigo-100">
              Real-time lead intelligence generated from your CRM.
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
            <BrainCircuit className="h-8 w-8" />
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6">
        {/* Score */}
        <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-indigo-100">
                AI Confidence
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                96%
              </h2>
            </div>

            <div className="rounded-2xl bg-emerald-400/20 p-3">
              <ShieldCheck className="text-emerald-300" />
            </div>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/20">
            <div className="h-full w-[96%] rounded-full bg-emerald-400" />
          </div>
        </div>

        {/* Insights */}
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white/10 p-2">
                  <Sparkles size={18} />
                </div>

                <p className="text-sm leading-6 text-white/90">
                  {insight}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recommendation */}
        <div className="rounded-3xl border border-cyan-300/20 bg-cyan-500/10 p-5 backdrop-blur">
          <div className="flex items-center gap-3">
            <Target className="text-cyan-200" />
            <h3 className="font-semibold">
              Recommended Next Action
            </h3>
          </div>

          <p className="mt-3 text-sm leading-6 text-cyan-50">
            Prioritize hot leads with budgets above $20K.
            Schedule follow-up calls within the next 24 hours to
            maximize conversion probability.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <TrendingUp className="mb-3 h-5 w-5 text-emerald-300" />

            <p className="text-xs uppercase text-indigo-100">
              Conversion
            </p>

            <h3 className="mt-1 text-2xl font-bold">
              +18%
            </h3>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <BrainCircuit className="mb-3 h-5 w-5 text-cyan-300" />

            <p className="text-xs uppercase text-indigo-100">
              AI Accuracy
            </p>

            <h3 className="mt-1 text-2xl font-bold">
              94%
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
}