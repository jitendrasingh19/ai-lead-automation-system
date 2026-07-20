import Link from "next/link";
import type { Lead } from "@/types/lead";

type PageProps = {
  params: Promise<{
    leadId: string;
  }>;
};

async function getLead(leadId: string): Promise<Lead | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
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

export default async function LeadDetailsPage({ params }: PageProps) {
  const { leadId } = await params;
  const lead = await getLead(leadId);

  if (!lead) {
    return (
      <div className="p-6">
        <Link href="/admin/leads" className="text-sm font-medium text-indigo-600">
          ← Back to leads
        </Link>
        <h1 className="mt-4 text-2xl font-semibold">Lead not found</h1>
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
    <div className="p-6">
      <Link href="/admin/leads" className="text-sm font-medium text-indigo-600">
        ← Back to leads
      </Link>

      <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 border-b pb-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">Lead details</p>
            <h1 className="mt-1 text-2xl font-semibold">{lead.name}</h1>
            <p className="mt-1 text-sm text-gray-600">{lead.company || "No company provided"}</p>
          </div>

          <span className="inline-flex w-fit rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            {lead.status}
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {detailItems.map((item) => (
            <div key={item.label} className="rounded-xl border bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{item.label}</p>
              <p className="mt-1 text-sm text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>

        {lead.requirements && (
          <div className="mt-6 rounded-xl border bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Project requirements</p>
            <p className="mt-2 whitespace-pre-wrap text-sm text-gray-800">{lead.requirements}</p>
          </div>
        )}
      </div>
    </div>
  );
}