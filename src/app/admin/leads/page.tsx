'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Lead } from "@/types/lead";
import type { LeadStatus } from "@/types/leadStatus";
import LeadTable from "@/components/LeadTable";
import SearchBar from "@/components/SearchBar";
import StatusFilter from "@/components/StatusFilter";

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | LeadStatus>("ALL");
  const [loading, setLoading] = useState(true);

  // EDIT STATE
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const res = await fetch("/api/leads", { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Failed to fetch leads");
        }

        const data = await res.json();
        setLeads(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load leads:", error);
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };

    loadLeads();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("/api/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete lead");
      }

      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (error) {
      console.error("Failed to delete lead:", error);
    }
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
  };

  const handleUpdate = async () => {
    if (!editingLead) {
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingLead),
      });

      if (!res.ok) {
        throw new Error("Failed to update lead");
      }

      setLeads((prev) =>
        prev.map((l) => (l.id === editingLead.id ? editingLead : l))
      );
      setEditingLead(null);
    } catch (error) {
      console.error("Failed to update lead:", error);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "ALL" || lead.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">Admin workspace</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Leads</h1>
            <p className="mt-2 text-sm text-slate-500">Track and manage all incoming leads in one polished view.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
            >
              ← Back to Dashboard
            </button>
            <div className="rounded-2xl bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-700">
              {filteredLeads.length} visible leads
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <StatusFilter value={status} onChange={setStatus} />
        </div>

        {loading ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
            Loading leads from the database...
          </div>
        ) : (
          <LeadTable
            leads={filteredLeads}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}

        {/* EDIT MODAL */}
        {editingLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
              <h2 className="text-xl font-bold text-slate-900">Edit Lead</h2>

              <input
                className="mb-2 mt-4 w-full rounded-2xl border border-slate-200 p-3"
                value={editingLead.name}
                onChange={(e) => setEditingLead({ ...editingLead, name: e.target.value })}
              />

              <input
                className="mb-2 w-full rounded-2xl border border-slate-200 p-3"
                value={editingLead.email}
                onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
              />

              <select
                className="mb-4 w-full rounded-2xl border border-slate-200 p-3"
                value={editingLead.status}
                onChange={(e) => setEditingLead({ ...editingLead, status: e.target.value as LeadStatus })}
              >
                <option value="New">New</option>
                <option value="Qualified">Qualified</option>
                <option value="Contacted">Contacted</option>
                <option value="Meeting">Meeting</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>

              <div className="flex gap-2">
                <button onClick={handleUpdate} className="rounded-2xl bg-indigo-600 px-4 py-2 font-medium text-white">
                  Save
                </button>

                <button onClick={() => setEditingLead(null)} className="rounded-2xl bg-slate-200 px-4 py-2 font-medium text-slate-700">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}