"use client";

import React, { useState } from "react";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phone: string;
  jobTitle: string;
  companySize: string;
  budgetRange: string;
  timeline: string;
  requirements: string;
};

export default function QuoteForm() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    phone: "",
    jobTitle: "",
    companySize: "",
    budgetRange: "",
    timeline: "",
    requirements: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Client posts to our server endpoint which forwards to n8n.
  const apiEndpoint = "/api/quote";

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const payload = {
      ...form,
      page: typeof window !== "undefined" ? window.location.href : null,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ firstName: "", lastName: "", email: "", companyName: "", phone: "", jobTitle: "", companySize: "", budgetRange: "", timeline: "", requirements: "" });
      } else {
        const text = await res.text();
        console.error("Server responded with", res.status, text);
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 w-full max-w-xl rounded-lg bg-white dark:bg-zinc-900 p-6 shadow-md border border-zinc-100 dark:border-zinc-800">
      <h4 className="text-lg font-semibold">Request a quote</h4>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input name="firstName" value={form.firstName} onChange={onChange} placeholder="First name" className="px-3 py-2 rounded border border-zinc-200 dark:border-zinc-800 bg-transparent" />
        <input name="lastName" value={form.lastName} onChange={onChange} placeholder="Last name" className="px-3 py-2 rounded border border-zinc-200 dark:border-zinc-800 bg-transparent" />

        <input name="email" value={form.email} onChange={onChange} required type="email" placeholder="Email (required)" className="px-3 py-2 rounded border border-zinc-200 dark:border-zinc-800 bg-transparent sm:col-span-2" />

        <input name="companyName" value={form.companyName} onChange={onChange} required placeholder="Company name (required)" className="px-3 py-2 rounded border border-zinc-200 dark:border-zinc-800 bg-transparent sm:col-span-2" />

        <input name="phone" value={form.phone} onChange={onChange} placeholder="Phone number (optional)" className="px-3 py-2 rounded border border-zinc-200 dark:border-zinc-800 bg-transparent sm:col-span-2" />

        <input name="jobTitle" value={form.jobTitle} onChange={onChange} placeholder="Job title (optional)" className="px-3 py-2 rounded border border-zinc-200 dark:border-zinc-800 bg-transparent sm:col-span-2" />

        <select name="companySize" value={form.companySize} onChange={onChange} required className="px-3 py-2 rounded border border-zinc-200 dark:border-zinc-800 bg-transparent">
          <option value="">Company size (required)</option>
          <option value="1-10">1-10</option>
          <option value="11-50">11-50</option>
          <option value="51-200">51-200</option>
          <option value="201-1000">201-1000</option>
          <option value="1000+">1000+</option>
        </select>

        <select name="budgetRange" value={form.budgetRange} onChange={onChange} required className="px-3 py-2 rounded border border-zinc-200 dark:border-zinc-800 bg-transparent">
          <option value="">Budget range (required)</option>
          <option value="<5k">&lt; $5k</option>
          <option value="5k-20k">$5k - $20k</option>
          <option value="20k-50k">$20k - $50k</option>
          <option value=">50k">&gt; $50k</option>
        </select>

        <select name="timeline" value={form.timeline} onChange={onChange} required className="px-3 py-2 rounded border border-zinc-200 dark:border-zinc-800 bg-transparent">
          <option value="">Timeline (required)</option>
          <option value="immediately">Immediately</option>
          <option value="1-3 months">1 - 3 months</option>
          <option value="3-6 months">3 - 6 months</option>
          <option value="6+ months">6+ months</option>
        </select>

        <textarea name="requirements" value={form.requirements} onChange={onChange} required placeholder="Requirements (required)" rows={4} className="px-3 py-2 rounded border border-zinc-200 dark:border-zinc-800 bg-transparent sm:col-span-2" />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button type="submit" disabled={status === "sending"} className="rounded-md bg-indigo-600 text-white px-4 py-2 font-medium disabled:opacity-60">
          {status === "sending" ? "Sending..." : "Send quote request"}
        </button>
        {status === "success" && <div className="text-sm text-green-600">Request sent — we will contact you soon.</div>}
        {status === "error" && <div className="text-sm text-red-600">Failed to send. Check webhook or console.</div>}
      </div>
    </form>
  );
}
