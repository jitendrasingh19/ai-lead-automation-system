"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  Download,
  LayoutGrid,
  LifeBuoy,
  LogOut,
  Menu,
  MoreHorizontal,
  Search,
  Settings,
  Sparkles,
  Users,
  Workflow,
  BarChart3,
  BriefcaseBusiness,
  Contact,
  Orbit,
  Bot,
  FileText,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { LeadQualityChart } from "@/components/dashboard/lead-quality-chart";
import { LeadsAreaChart } from "@/components/dashboard/leads-area-chart";
import { DealFunnel } from "@/components/dashboard/deal-funnel";
import { RecentLeadsTable } from "@/components/dashboard/recent-leads-table";
import { AIInsightsPanel } from "@/components/dashboard/ai-insights-panel";
import { WorkflowTimeline } from "@/components/dashboard/workflow-timeline";
import { PerformanceSection } from "@/components/dashboard/performance-section";
import {
  kpiData,
  qualityDistribution,
  leadsByDay,
  funnelStages,
  recentLeads,
  insights,
  workflowTimeline,
  performanceMetrics,
} from "@/lib/mock-data";

const navItems = [
  { icon: LayoutGrid, label: "Dashboard", active: true },
  { icon: Users, label: "Leads" },
  { icon: BriefcaseBusiness, label: "Deals" },
  { icon: Contact, label: "Contacts" },
  { icon: Bot, label: "AI Insights" },
  { icon: Workflow, label: "Workflow Logs" },
  { icon: Orbit, label: "Integrations" },
  { icon: Settings, label: "Settings" },
];

export function DashboardShell() {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Just now");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 30000);
    return () => window.clearInterval(interval);
  }, []);

  const handleExport = () => {
    const csv = [
      ["Name", "Company", "AI Score", "Lead Temperature", "Status", "Created Date"],
      ...recentLeads.map((lead) => [
        lead.name,
        lead.company,
        lead.score,
        lead.temperature,
        lead.status,
        lead.date,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lead-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const currentDate = useMemo(() => {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date());
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_18%),linear-gradient(to_bottom,#f8fafc_0%,#eef2ff_100%)] dark:bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.95),_transparent_20%),linear-gradient(to_bottom,#020617_0%,#0f172a_100%)]">
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="rounded-3xl border border-slate-200/70 bg-white/70 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70">
          <header className="flex items-center justify-between border-b border-slate-200/70 px-4 py-4 dark:border-slate-800/80 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 md:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={18} />
              </button>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/20">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Workspace</p>
                  <h1 className="text-lg font-semibold text-slate-900 dark:text-white">LeadFlow AI</h1>
                </div>
              </div>
            </div>

            <div className="hidden flex-1 items-center justify-end gap-3 md:flex">
              <div className="flex min-w-[320px] items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-900">
                <Search size={16} className="text-slate-400" />
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  placeholder="Search leads, accounts, insights"
                />
              </div>
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                onClick={() => setIsDark((v) => !v)}
              >
                <Settings size={18} />
              </button>
              <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
                <Bell size={18} />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-2 py-1.5 transition hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=80&q=80" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Jordan Lee</p>
                      <p className="text-xs text-slate-500">RevOps Lead</p>
                    </div>
                    <ChevronDown size={16} className="text-slate-500" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Preferences</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <div className="flex">
            <aside className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200/70 bg-white/90 backdrop-blur-xl transition duration-300 dark:border-slate-800/80 dark:bg-slate-950/90 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:static md:translate-x-0`}>
              <div className="flex h-full flex-col px-4 py-5">
                <div className="flex items-center justify-between md:hidden">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Menu</p>
                  <button onClick={() => setSidebarOpen(false)}>
                    <MoreHorizontal size={18} className="text-slate-500" />
                  </button>
                </div>
                <nav className="mt-4 space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.label}
                        className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                          item.active
                            ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/20"
                            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                        }`}
                      >
                        <Icon size={18} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-auto rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-900 to-cyan-800 p-4 text-white">
                  <p className="text-xs uppercase tracking-[0.22em] text-cyan-100">Automation Health</p>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-semibold">96.4%</p>
                      <p className="mt-1 text-sm text-cyan-100/90">Workflow success</p>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs">+4.8%</span>
                  </div>
                </div>
              </div>
            </aside>

            {sidebarOpen && (
              <button
                className="fixed inset-0 z-30 bg-slate-900/30 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            <main className="flex-1 p-4 sm:p-6">
              <div className="flex flex-col gap-3 border-b border-slate-200/70 pb-5 dark:border-slate-800/80 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Overview · {currentDate}</p>
                  <h2 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">Pipeline Performance</h2>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
                    <BarChart3 size={16} />
                    Last 30 days
                  </button>
                  <button
                    onClick={handleExport}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
                  >
                    <Download size={16} />
                    Export CSV
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-900/60">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Live updates</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Last sync at {lastUpdated}</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Online
                </span>
              </div>

              <div className="mt-6 space-y-6">
                <KpiCards data={kpiData} loading={isLoading} />
                <div className="grid gap-6 xl:grid-cols-[1.2fr_0.95fr]">
                  <LeadQualityChart data={qualityDistribution} loading={isLoading} />
                  <AIInsightsPanel insights={insights} loading={isLoading} />
                </div>
                <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                  <LeadsAreaChart data={leadsByDay} loading={isLoading} />
                  <DealFunnel stages={funnelStages} loading={isLoading} />
                </div>
                <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
                  <RecentLeadsTable data={recentLeads} loading={isLoading} />
                  <WorkflowTimeline items={workflowTimeline} loading={isLoading} />
                </div>
                <PerformanceSection metrics={performanceMetrics} loading={isLoading} />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
