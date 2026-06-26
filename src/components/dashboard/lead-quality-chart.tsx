"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { motion } from "framer-motion";

export function LeadQualityChart({ data, loading }: { data: any[]; loading?: boolean }) {
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
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Lead Quality</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Distribution</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">Updated today</span>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="h-[320px] w-full min-w-0">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={data}
                innerRadius={62}
                outerRadius={96}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border: "none",
                  borderRadius: 16,
                  color: "white",
                }}
                formatter={(value) => [`${value ?? 0} leads`, "Count"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/80">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.name}</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900 dark:text-white">{item.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{Math.round((item.value / 2487) * 100)}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
