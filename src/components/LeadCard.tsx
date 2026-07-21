"use client";

import { useRouter } from "next/navigation";
import { Lead } from "@/types/lead";
import {
  Mail,
  Phone,
  Calendar,
  Pencil,
  Trash2,
  UserCircle2,
  Building2,
  IndianRupee,
} from "lucide-react";

interface Props {
  lead: Lead;
  onDelete: (id: string) => void;
  onEdit: (lead: Lead) => void;
}

const statusColor = {
  New: "bg-blue-100 text-blue-700",
  Qualified: "bg-green-100 text-green-700",
  Contacted: "bg-yellow-100 text-yellow-700",
  Meeting: "bg-purple-100 text-purple-700",
  Won: "bg-emerald-100 text-emerald-700",
  Lost: "bg-red-100 text-red-700",
};

export default function LeadCard({
  lead,
  onDelete,
  onEdit,
}: Props) {
  const router = useRouter();

  const handleOpenDetails = () => {
    router.push(`/admin/leads/${lead.id}`);
  };

  return (
    <div
      onClick={handleOpenDetails}
      className="group cursor-pointer rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
              <UserCircle2 className="text-indigo-600" size={30} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{lead.name}</h2>
              <p className="text-sm text-slate-500">{lead.company || "No Company"}</p>
            </div>
          </div>

          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[lead.status]}`}>
            {lead.status}
          </span>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Mail size={18} className="text-indigo-500" />
            <span>{lead.email}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Phone size={18} className="text-indigo-500" />
            <span>{lead.phone || "Not Available"}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Building2 size={18} className="text-indigo-500" />
            <span>{lead.jobTitle || "Website Development"}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-600">
            <IndianRupee size={18} className="text-indigo-500" />
            <span>{lead.budget || "N/A"}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-500">
            <Calendar size={16} className="text-indigo-500" />
            <span>{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "Not Available"}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between border-t border-slate-200 px-6 py-4" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => onEdit(lead)}
          className="flex items-center gap-2 font-medium text-indigo-600 transition hover:text-indigo-800"
        >
          <Pencil size={18} />
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(lead.id)}
          className="flex items-center gap-2 font-medium text-red-600 transition hover:text-red-800"
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </div>
  );
}