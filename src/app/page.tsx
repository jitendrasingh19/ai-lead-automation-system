import Image from "next/image";
import QuoteForm from "../components/QuoteForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50 dark:from-black dark:to-zinc-900 font-sans text-zinc-900 dark:text-zinc-50">
      <header className="border-b border-zinc-100 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-indigo-600 text-white px-3 py-2 font-semibold">AI</div>
            <div>
              <h1 className="text-lg font-bold">AI Lead Automation System</h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Automate lead enrichment & outreach</p>
            </div>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:underline">Features</a>
            <a href="#pricing" className="hover:underline">Pricing</a>
            <a href="#docs" className="hover:underline">Docs</a>
            <a href="#" className="rounded-full border px-4 py-2 text-sm">Sign in</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight">Turn qualified prospects into customers — automatically.</h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">AI-powered lead enrichment, segmentation, and outreach workflows that increase conversion while saving hours of manual work.</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="#get-started" className="inline-flex items-center rounded-md bg-indigo-600 px-5 py-3 text-white font-medium hover:bg-indigo-700">Get started — it's free</a>
              <a href="#demo" className="inline-flex items-center rounded-md border border-zinc-200 px-5 py-3 text-zinc-800 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800">Request a demo</a>
            </div>

            <div className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">Trusted by sales teams at startups and enterprises. No credit card required for trial.</div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-xl bg-white shadow-lg dark:bg-zinc-900 p-6">
              <h3 className="font-semibold">Live preview</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">New leads enriched</div>
                    <div className="text-xs text-zinc-500">Automatically enriched with company & contact data</div>
                  </div>
                  <div className="text-2xl font-bold text-indigo-600">+1,248</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Active campaigns</div>
                    <div className="text-xs text-zinc-500">Personalized outreach sequences</div>
                  </div>
                  <div className="text-2xl font-bold">42</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-16">
          <h3 className="text-2xl font-bold">Key features</h3>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-lg border p-5 bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800">
              <h4 className="font-semibold">Lead enrichment</h4>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Auto-fill profiles with company size, tech stack, roles, and intent signals.</p>
            </div>
            <div className="rounded-lg border p-5 bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800">
              <h4 className="font-semibold">Automated outreach</h4>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Create multi-channel sequences with AI-personalized messages at scale.</p>
            </div>
            <div className="rounded-lg border p-5 bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800">
              <h4 className="font-semibold">Analytics & reporting</h4>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Track opens, replies, conversions, and ROI from a single dashboard.</p>
            </div>
          </div>
        </section>

        <section id="cta" className="mt-16 flex items-center justify-center">
          <div className="rounded-lg bg-indigo-600 text-white px-6 py-6 sm:px-12 sm:py-8">
            <div className="text-center">
              <div className="text-xl font-bold">Ready to automate your lead flow?</div>
              <div className="mt-3 text-sm text-indigo-100">Start a free trial and see revenue-boosting automation in action.</div>
              <div className="mt-6 flex items-center justify-center gap-4">
                <a href="#get-started" className="rounded-md bg-white text-indigo-600 px-5 py-3 font-semibold">Start free trial</a>
                <a href="#contact" className="text-indigo-100 underline">Contact sales</a>
              </div>
            </div>
          </div>
        </section>

        <section id="quote" className="mt-12 flex items-center justify-center">
          <QuoteForm />
        </section>
      </main>

      <footer className="border-t border-zinc-100 dark:border-zinc-800 mt-24">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-zinc-500">
          <div>© {new Date().getFullYear()} AI Lead Automation System</div>
          <div className="flex items-center gap-4 mt-3 sm:mt-0">
            <a href="#privacy" className="hover:underline">Privacy</a>
            <a href="#terms" className="hover:underline">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
