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
      className="group cursor-pointer rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
    >

      <div className="p-6">

        <div className="flex justify-between">

          <div className="flex gap-3">

            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <UserCircle2 className="text-indigo-600" size={34}/>
            </div>

            <div>

              <h2 className="font-bold text-lg">
                {lead.name}
              </h2>

              <p className="text-gray-500 text-sm">
                {lead.company || "No Company"}
              </p>

            </div>

          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[lead.status]}`}
          >
            {lead.status}
          </span>

        </div>

        <div className="space-y-3 mt-6">

          <div className="flex gap-3 items-center text-gray-600">

            <Mail size={18}/>

            {lead.email}

          </div>

          <div className="flex gap-3 items-center text-gray-600">

            <Phone size={18}/>

            {lead.phone || "Not Available"}

          </div>

          <div className="flex gap-3 items-center text-gray-600">

            <Building2 size={18}/>

            {lead.jobTitle || "Website Development"}

          </div>

          <div className="flex gap-3 items-center text-gray-600">

            <IndianRupee size={18}/>

            {lead.budget || "N/A"}

          </div>

          <div className="flex gap-3 items-center text-gray-500 text-sm">

            <Calendar size={16}/>

            {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "Not Available"}

          </div>

        </div>

      </div>

      <div
        className="border-t px-6 py-4 flex justify-between"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          type="button"
          onClick={() => onEdit(lead)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <Pencil size={18}/>
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(lead.id)}
          className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium"
        >
          <Trash2 size={18}/>
          Delete
        </button>

      </div>

    </div>
  );
}