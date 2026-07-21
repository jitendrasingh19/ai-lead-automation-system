import Link from "next/link";
import type { Lead } from "@/types/lead";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Mail, Phone, MessageCircle, MoreHorizontal } from "lucide-react";

type PageProps = {
  params: Promise<{
    leadId: string;
  }>;
};

async function getLead(leadId: string): Promise<Lead | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/api/leads`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const leads = (await res.json()) as Lead[];
    return leads.find((lead) => lead.id === leadId) ?? null;
  } catch {
    return null;
  }
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "L";
}

export default async function LeadDetailsPage({ params }: PageProps) {
  const { leadId } = await params;
  const lead = await getLead(leadId);

  if (!lead) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <Link href="/admin/leads" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600">
            <ArrowLeft size={18} />
            Back to leads
          </Link>
          <h1 className="mt-6 text-2xl font-semibold text-slate-900">Lead not found</h1>
          <p className="mt-2 text-sm text-slate-500">The requested lead could not be loaded.</p>
        </div>
      </div>
    );
  }

  const detailItems = [
    { label: "Email", value: lead.email || "—" },
    { label: "Phone", value: lead.phone || "—" },
    { label: "Company", value: lead.company || "—" },
    { label: "Job title", value: lead.jobTitle || "—" },
    { label: "Company size", value: lead.companySize || "—" },
    { label: "Budget range", value: lead.budget || "—" },
    { label: "Timeline", value: lead.timeline || "—" },
    { label: "Lead volume", value: lead.leadVolume || "—" },
    { label: "Preferred channels", value: lead.preferredChannels || "—" },
    { label: "Current stack", value: lead.currentStack || "—" },
    { label: "Created at", value: lead.createdAt ? new Date(lead.createdAt).toLocaleString() : "—" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl">
        <Link href="/admin/leads" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600">
          <ArrowLeft size={18} />
          Back to leads
        </Link>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-28 w-28 border-4 border-indigo-100 shadow-lg">
              <AvatarImage src="" />
              <AvatarFallback className="bg-indigo-500 text-4xl text-white">
                {getInitials(lead.name)}
              </AvatarFallback>
            </Avatar>

            <h1 className="mt-6 text-3xl font-bold text-slate-900">{lead.name}</h1>
            <p className="mt-2 text-lg text-slate-500">{lead.company || "No company provided"}</p>
            <span className="mt-4 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
              {lead.status}
            </span>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" className="rounded-2xl border border-slate-200 p-3 text-slate-600 transition hover:border-indigo-500 hover:text-indigo-600">
                <Mail className="h-5 w-5" />
              </button>
              <button type="button" className="rounded-2xl border border-slate-200 p-3 text-slate-600 transition hover:border-indigo-500 hover:text-indigo-600">
                <Phone className="h-5 w-5" />
              </button>
              <button type="button" className="rounded-2xl border border-slate-200 p-3 text-slate-600 transition hover:border-indigo-500 hover:text-indigo-600">
                <MessageCircle className="h-5 w-5" />
              </button>
              <button type="button" className="rounded-2xl border border-slate-200 p-3 text-slate-600 transition hover:border-indigo-500 hover:text-indigo-600">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>

            <button type="button" className="mt-8 w-full max-w-md rounded-2xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600">
              Convert to Contact
            </button>

            <p className="mt-6 text-sm text-slate-500">
              🟢 Last Activity • {lead.createdAt ? new Date(lead.createdAt).toLocaleString() : "Recently"}
            </p>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-8">
            <h2 className="text-xl font-semibold text-slate-900">Lead information</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {detailItems.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-800">{item.value}</p>
                </div>
              ))}
            </div>

            {lead.requirements && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Project requirements</p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-slate-800">{lead.requirements}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}