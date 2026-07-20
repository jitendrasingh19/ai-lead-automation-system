"use client";

import React, { useState } from "react";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  jobTitle: string;
  companySize: string;
  budgetRange: string;
  timeline: string;
  leadVolume: string;
  preferredChannels: string;
  requirements: string;
  currentStack: string;
};

const steps = [
  {
    title: "Contact details",
    subtitle: "Who should we reach out to?",
    fields: ["firstName", "lastName", "email", "phone"] as const,
    required: ["firstName", "lastName", "email", "phone"] as const,
  },
  {
    title: "Company profile",
    subtitle: "Tell us about your team and business.",
    fields: ["companyName", "jobTitle", "companySize"] as const,
    required: ["companyName", "jobTitle", "companySize"] as const,
  },
  {
    title: "Goals & budget",
    subtitle: "What are you hoping to achieve?",
    fields: ["budgetRange", "timeline", "leadVolume"] as const,
    required: ["budgetRange", "timeline", "leadVolume"] as const,
  },
  {
    title: "Workflow needs",
    subtitle: "Share the details that matter most.",
    fields: ["preferredChannels", "currentStack", "requirements"] as const,
    required: ["requirements"] as const,
  },
  {
    title: "Review & submit",
    subtitle: "Confirm everything before sending.",
    fields: [] as const,
    required: [] as const,
  },
];

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  companyName: "",
  jobTitle: "",
  companySize: "",
  budgetRange: "",
  timeline: "",
  leadVolume: "",
  preferredChannels: "",
  requirements: "",
  currentStack: "",
};

export default function QuoteForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const apiEndpoint = "/api/quote";

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name as keyof FormState]: value }));
    setErrors((prev) => ({ ...prev, [name as keyof FormState]: "" }));
  }

  function validateStep(stepIndex: number) {
    const step = steps[stepIndex];
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    step.required.forEach((field) => {
      if (!form[field]) {
        nextErrors[field] = "This field is required.";
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleNext() {
    if (!validateStep(activeStep)) return;
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  }

  function handlePrevious() {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateStep(activeStep)) return;
    setStatus("sending");
    setStatusMessage("");

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
        setStatusMessage("Request sent — we will contact you soon.");
        setForm(initialForm);
        setActiveStep(0);
      } else {
        const text = await res.text();
        console.error("Server responded with", res.status, text);
        let message = "Failed to send. Check webhook or console.";

        try {
          const data = JSON.parse(text);
          if (typeof data?.error === "string") {
            message = data.error;
          }
          if (typeof data?.details === "string") {
            message = `${message}: ${data.details}`;
          }
        } catch {
          if (text) message = text;
        }

        setStatusMessage(message);
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatusMessage("Network error. Please try again.");
      setStatus("error");
    }
  }

  const currentStep = steps[activeStep];
  const progressPercent = ((activeStep + 1) / steps.length) * 100;

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl shadow-indigo-100/30 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none"
    >
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-indigo-600">Step {activeStep + 1} of {steps.length}</p>
            <h4 className="mt-1 text-2xl font-semibold">{currentStep.title}</h4>
          </div>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-200">
            {Math.round(progressPercent)}%
          </span>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="mt-4 flex items-center gap-2">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-1 items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                  index <= activeStep
                    ? "bg-indigo-600 text-white"
                    : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1 flex-1 rounded-full ${index < activeStep ? "bg-indigo-600" : "bg-zinc-200 dark:bg-zinc-700"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ animation: "fadeIn 0.25s ease-out" }} className="rounded-xl border border-zinc-100 bg-zinc-50 p-5 transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-950/60">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{currentStep.subtitle}</p>

        {activeStep === 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { name: "firstName", label: "First name", type: "text", required: true },
              { name: "lastName", label: "Last name", type: "text", required: true },
              { name: "email", label: "Work email", type: "email", required: true, full: true },
              { name: "phone", label: "Phone number", type: "tel", required: true, full: true },
            ].map((field) => (
              <div key={field.name} className={field.full ? "sm:col-span-2" : ""}>
                <label className="mb-1 block text-sm font-medium">{field.label}</label>
                <input
                  name={field.name}
                  type={field.type}
                  value={form[field.name as keyof FormState]}
                  onChange={onChange}
                  required={field.required}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-indigo-500/20"
                />
                {errors[field.name as keyof FormState] && (
                  <p className="mt-1 text-xs text-red-600">{errors[field.name as keyof FormState]}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {activeStep === 1 && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { name: "companyName", label: "Company name", required: true, full: true },
              { name: "jobTitle", label: "Your role", required: true, full: true },
              {
                name: "companySize",
                label: "Company size",
                required: true,
                type: "select",
                options: [
                  "1-10",
                  "11-50",
                  "51-200",
                  "201-1000",
                  "1000+",
                ],
              },
            ].map((field) => (
              <div key={field.name} className={field.full ? "sm:col-span-2" : ""}>
                <label className="mb-1 block text-sm font-medium">{field.label}</label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={form[field.name as keyof FormState]}
                    onChange={onChange}
                    required={field.required}
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-indigo-500/20"
                  >
                    <option value="">Select an option</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={field.name}
                    value={form[field.name as keyof FormState]}
                    onChange={onChange}
                    required={field.required}
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-indigo-500/20"
                  />
                )}
                {errors[field.name as keyof FormState] && (
                  <p className="mt-1 text-xs text-red-600">{errors[field.name as keyof FormState]}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {activeStep === 2 && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Budget range</label>
              <select
                name="budgetRange"
                value={form.budgetRange}
                onChange={onChange}
                required
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-indigo-500/20"
              >
                <option value="">Select a range</option>
                <option value="<5k">Less than $5k</option>
                <option value="5k-20k">$5k - $20k</option>
                <option value="20k-50k">$20k - $50k</option>
                <option value=">50k">More than $50k</option>
              </select>
              {errors.budgetRange && <p className="mt-1 text-xs text-red-600">{errors.budgetRange}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Timeline</label>
              <select
                name="timeline"
                value={form.timeline}
                onChange={onChange}
                required
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-indigo-500/20"
              >
                <option value="">Select timeline</option>
                <option value="immediately">Immediately</option>
                <option value="1-3 months">1 - 3 months</option>
                <option value="3-6 months">3 - 6 months</option>
                <option value="6+ months">6+ months</option>
              </select>
              {errors.timeline && <p className="mt-1 text-xs text-red-600">{errors.timeline}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">Estimated monthly leads</label>
              <select
                name="leadVolume"
                value={form.leadVolume}
                onChange={onChange}
                required
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-indigo-500/20"
              >
                <option value="">Select volume</option>
                <option value="0-50">0 - 50</option>
                <option value="51-200">51 - 200</option>
                <option value="201-1000">201 - 1000</option>
                <option value="1000+">1000+</option>
              </select>
              {errors.leadVolume && <p className="mt-1 text-xs text-red-600">{errors.leadVolume}</p>}
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="mt-4 grid grid-cols-1 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Preferred channels</label>
              <input
                name="preferredChannels"
                value={form.preferredChannels}
                onChange={onChange}
                placeholder="Email, LinkedIn, SMS, calls..."
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Current stack / tools</label>
              <input
                name="currentStack"
                value={form.currentStack}
                onChange={onChange}
                placeholder="HubSpot, Salesforce, Clay, Apollo..."
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Project requirements</label>
              <textarea
                name="requirements"
                value={form.requirements}
                onChange={onChange}
                required
                rows={5}
                placeholder="Describe your goals, constraints, integrations, or any special requirements..."
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-indigo-500/20"
              />
              {errors.requirements && <p className="mt-1 text-xs text-red-600">{errors.requirements}</p>}
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-xs uppercase tracking-wide text-zinc-500">Contact</p>
              <p className="mt-1 font-medium">{form.firstName} {form.lastName}</p>
              <p className="text-sm text-zinc-500">{form.email} · {form.phone}</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-xs uppercase tracking-wide text-zinc-500">Company</p>
                <p className="mt-1 font-medium">{form.companyName}</p>
                <p className="text-sm text-zinc-500">{form.jobTitle} · {form.companySize}</p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-xs uppercase tracking-wide text-zinc-500">Goals</p>
                <p className="mt-1 font-medium">{form.budgetRange} budget</p>
                <p className="text-sm text-zinc-500">{form.timeline} · {form.leadVolume} leads/mo</p>
              </div>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-xs uppercase tracking-wide text-zinc-500">Workflow details</p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{form.preferredChannels || "No preferred channels specified"}</p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{form.currentStack || "No tools listed"}</p>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">{form.requirements}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={activeStep === 0}
          className="rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Previous
        </button>

        {activeStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Submit request"}
          </button>
        )}
      </div>

      {status === "success" && (
        <div className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-500/10 dark:text-green-200">
          Request sent — we will contact you soon.
        </div>
      )}
      {status === "error" && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-200">
          {statusMessage || "Failed to send. Check webhook or console."}
        </div>
      )}
    </form>
  );
}
