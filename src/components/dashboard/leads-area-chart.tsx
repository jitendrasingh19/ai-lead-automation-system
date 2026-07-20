"use client";

import { motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function LeadsAreaChart({ data, loading }: { data: any[]; loading?: boolean }) {
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
          <p className="text-sm text-slate-500 dark:text-slate-400">Leads Flow</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Leads Per Day</h3>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">+8.2% vs last week</span>
      </div>
      <div className="mt-6 h-[340px] w-full min-w-0">
        <ResponsiveContainer width="100%" height={340}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorLeads" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.32} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} className="text-xs fill-slate-500" />
            <YAxis tickLine={false} axisLine={false} className="text-xs fill-slate-500" />
            <Tooltip
              cursor={{ stroke: "#cbd5e1", strokeDasharray: "4 4" }}
              contentStyle={{
                background: "white",
                borderRadius: 16,
                border: "1px solid #e2e8f0",
              }}
            />
            <Area type="monotone" dataKey="leads" stroke="#4f46e5" strokeWidth={3} fill="url(#colorLeads)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
