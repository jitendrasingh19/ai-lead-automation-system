"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import QuoteForm from "@/components/QuoteForm";

const benefits = [
  {
    title: "AI lead scoring",
    text: "Rank new leads by intent, fit, and likelihood to close in seconds.",
  },
  {
    title: "Instant routing",
    text: "Send leads to the right rep or workflow automatically.",
  },
  {
    title: "Smart follow-ups",
    text: "Trigger reminders, emails, and Slack alerts based on behavior.",
  },
];

const workflowSteps = [
  { label: "Form Submit", accent: "from-indigo-500 to-blue-500" },
  { label: "AI Enrichment", accent: "from-fuchsia-500 to-violet-500" },
  { label: "Lead Score", accent: "from-emerald-500 to-teal-500" },
  { label: "Sales Handoff", accent: "from-amber-500 to-orange-500" },
];

const testimonials = [
  {
    name: "Avery Kim",
    role: "VP Sales",
    company: "Northstar Cloud",
    quote: "LeadFlow AI cut our response time in half and improved our conversion rate dramatically.",
  },
  {
    name: "Marcus Patel",
    role: "Revenue Ops Lead",
    company: "Pulse Systems",
    quote: "The scoring engine helped our team prioritize the right leads every single day.",
  },
  {
    name: "Jasmine Reed",
    role: "Growth Manager",
    company: "Arc Studio",
    quote: "Our workflows are now fully automated, and our pipeline visibility is much stronger.",
  },
];

export default function Home() {
  const [score, setScore] = useState(72);
  const [selectedStage, setSelectedStage] = useState("Qualified");

  const scoreLabel = useMemo(() => {
    if (score >= 85) return "High intent";
    if (score >= 65) return "Strong fit";
    return "Needs nurture";
  }, [score]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.08),_transparent_16%),linear-gradient(to_bottom,#f8fafc_0%,#eef2ff_100%)] text-slate-900 dark:bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.9),_transparent_18%),linear-gradient(to_bottom,#020617_0%,#0f172a_100%)] dark:text-slate-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.08),_transparent_18%)]" />
        <header className="relative z-10 mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white font-semibold">LF</div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Platform</p>
                <h1 className="text-base font-semibold">LeadFlow AI</h1>
              </div>
            </div>
            <nav className="hidden items-center gap-6 text-sm text-slate-600 dark:text-slate-300 md:flex">
              <a href="#benefits" className="hover:text-indigo-600">Benefits</a>
              <a href="#workflow" className="hover:text-indigo-600">Workflow</a>
              <a href="#demo" className="hover:text-indigo-600">Demo</a>
              <Link href="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
            </nav>
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="hidden rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900 sm:inline-flex">View Dashboard</Link>
              <a href="#quote" className="inline-flex rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20">Get a Quote</a>
            </div>
          </div>
        </header>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-24 lg:pt-12">
          <div>
            <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200">AI-powered lead automation</span>
            <h2 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">Turn inbound demand into revenue faster.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">Enrich leads, route them intelligently, and automate your pipeline with AI workflows that help your team move faster.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#quote" className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20">Request a quote</a>
              <Link href="/dashboard" className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-950">Open dashboard</Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <span>Trusted by 300+ teams</span>
              <span>•</span>
              <span>99.2% workflow uptime</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-600/10 via-cyan-500/5 to-transparent" />
            <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Live pipeline</p>
                  <h3 className="mt-1 text-3xl font-semibold">$482K</h3>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">+15.2%</span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500">Qualified leads</p>
                  <p className="mt-2 text-2xl font-semibold">1,642</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500">Meeting booked</p>
                  <p className="mt-2 text-2xl font-semibold">318</p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>AI score distribution</span>
                  <span>82 avg</span>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-2 w-[78%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section id="benefits" className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-indigo-600">Benefits</p>
          <h3 className="mt-2 text-3xl font-semibold">Why teams upgrade to LeadFlow AI</h3>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h4 className="text-lg font-semibold">{benefit.title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{benefit.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-indigo-600">Workflow</p>
              <h3 className="mt-2 text-3xl font-semibold">How the automation works</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {workflowSteps.map((step, index) => (
                <div key={step.label} className="flex items-center gap-2">
                  <span className={`inline-flex rounded-full bg-gradient-to-r ${step.accent} px-3 py-1 text-xs font-semibold text-white`}>{step.label}</span>
                  {index < workflowSteps.length - 1 && <span className="text-slate-400">→</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {workflowSteps.map((step) => (
              <div key={step.label} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
                <div className={`mb-3 h-2 w-16 rounded-full bg-gradient-to-r ${step.accent}`} />
                <p className="font-semibold">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm font-semibold text-indigo-600">Interactive demo</p>
            <h3 className="mt-2 text-3xl font-semibold">Lead scoring in action</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Adjust the signal strength to see how the AI updates the lead score and recommended next step.</p>
            <div className="mt-8 rounded-3xl bg-slate-50 p-6 dark:bg-slate-900">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-500">AI score</p>
                  <h4 className="mt-2 text-5xl font-semibold">{score}</h4>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">{scoreLabel}</span>
              </div>
              <input
                type="range"
                min="35"
                max="98"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="mt-6 h-2 w-full accent-indigo-600"
              />
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Qualified",
                  "Discovery Call",
                  "Proposal Sent",
                  "Negotiation",
                ].map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setSelectedStage(stage)}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium ${selectedStage === stage ? "bg-indigo-600 text-white" : "bg-white text-slate-600 dark:bg-slate-800 dark:text-slate-200"}`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 p-8 text-white shadow-xl shadow-indigo-500/10">
            <p className="text-sm text-indigo-100">Recommended action</p>
            <h3 className="mt-2 text-3xl font-semibold">{selectedStage}</h3>
            <div className="mt-6 rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-sm text-indigo-50">This lead's score suggests a high-probability match for {selectedStage.toLowerCase()}.</p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs text-indigo-100">Fit</p>
                <p className="mt-2 text-2xl font-semibold">92%</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs text-indigo-100">Intent</p>
                <p className="mt-2 text-2xl font-semibold">88%</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs text-indigo-100">Speed</p>
                <p className="mt-2 text-2xl font-semibold">1.2x</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-indigo-600">Testimonials</p>
          <h3 className="mt-2 text-3xl font-semibold">Loved by revenue teams</h3>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">“{item.quote}”</p>
              <div className="mt-6">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-slate-500">{item.role} · {item.company}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="quote" className="mx-auto max-w-7xl px-6 pb-16 pt-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950">
          <div className="mb-6 text-center">
            <p className="text-sm font-medium text-indigo-600">Get started</p>
            <h3 className="mt-2 text-3xl font-semibold">Tell us about your pipeline goals</h3>
          </div>
          <QuoteForm />
        </div>
      </section>
    </main>
  );
}
