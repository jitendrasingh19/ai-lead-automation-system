'use client';

import { useEffect, useState } from "react";
import type { Lead } from "@/types/lead";
import type { LeadStatus } from "@/types/leadStatus";
import LeadTable from "@/components/LeadTable";
import SearchBar from "@/components/SearchBar";
import StatusFilter from "@/components/StatusFilter";

export default function LeadsPage() {
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Leads</h1>

      <div className="flex gap-2">
        <SearchBar value={search} onChange={setSearch} />
        <StatusFilter value={status} onChange={setStatus} />
      </div>

      {loading ? (
        <p className="mt-4 text-sm text-gray-500">Loading leads from the database...</p>
      ) : (
        <LeadTable
          leads={filteredLeads}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      {/* EDIT MODAL */}
      {editingLead && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">Edit Lead</h2>

            <input
              className="border p-2 w-full mb-2"
              value={editingLead.name}
              onChange={(e) =>
                setEditingLead({ ...editingLead, name: e.target.value })
              }
            />

            <input
              className="border p-2 w-full mb-2"
              value={editingLead.email}
              onChange={(e) =>
                setEditingLead({ ...editingLead, email: e.target.value })
              }
            />

            <select
              className="border p-2 w-full mb-4"
              value={editingLead.status}
              onChange={(e) =>
                setEditingLead({ ...editingLead, status: e.target.value as LeadStatus })
              }
            >
              <option value="New">New</option>
              <option value="Qualified">Qualified</option>
              <option value="Contacted">Contacted</option>
              <option value="Meeting">Meeting</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditingLead(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}