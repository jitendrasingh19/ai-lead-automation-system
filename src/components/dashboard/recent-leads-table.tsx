"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const tempStyles = {
  Hot: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300",
  Warm: "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Cold: "bg-sky-500/10 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
};

export function RecentLeadsTable({ data, loading }: { data: any[]; loading?: boolean }) {
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
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Activity</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Recent Leads</h3>
        </div>
        <button className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
          View all <ArrowUpRight size={16} />
        </button>
      </div>
      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-950/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Company</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">AI Score</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Lead Temp.</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {data.map((lead) => (
              <tr key={lead.name} className="hover:bg-slate-50 dark:hover:bg-slate-950/50">
                <td className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white">{lead.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{lead.company}</td>
                <td className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200">{lead.score}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${tempStyles[lead.temperature as keyof typeof tempStyles]}`}>
                    {lead.temperature}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{lead.status}</td>
                <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">{lead.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
