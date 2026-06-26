import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  sparkline: number[];
  loading?: boolean;
}

function Sparkline({ points }: { points: number[] }) {
  const width = 120;
  const height = 44;
  const max = Math.max(...points);
  const min = Math.min(...points);

  const path = points
    .map((point, index) => {
      const x = (index / (points.length - 1 || 1)) * width;
      const y = height - ((point - min) / (max - min || 1)) * height;
      return `${index === 0 ? "M" : "L"}${x} ${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-10 w-28">
      <path d={path} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function KpiCards({ data, loading }: { data: any[]; loading?: boolean }) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-36 animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-900" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {data.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.06 }}
          className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
              <div className="mt-3 flex items-end gap-2">
                <h3 className="text-3xl font-semibold text-slate-900 dark:text-white">{item.value}</h3>
                <span className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
                  item.trend === "up"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                )}>
                  {item.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {item.change}
                </span>
              </div>
            </div>
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-2xl",
              index === 0 && "bg-indigo-500/10 text-indigo-600",
              index === 1 && "bg-rose-500/10 text-rose-600",
              index === 2 && "bg-emerald-500/10 text-emerald-600",
              index === 3 && "bg-cyan-500/10 text-cyan-600"
            )}>
              <span className="text-xs font-semibold">{index + 1}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className={cn(
              "text-sm font-medium",
              item.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
            )}>
              {item.trend === "up" ? "Trending up" : "Trending down"}
            </div>
            <div className={cn(
              "flex items-center",
              item.trend === "up" ? "text-emerald-500" : "text-rose-500"
            )}>
              <Sparkline points={item.sparkline} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
