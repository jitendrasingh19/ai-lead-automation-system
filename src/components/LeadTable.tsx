import type { Lead } from "@/types/lead";
import LeadCard from "./LeadCard";

type LeadTableProps = {
  leads: Lead[];
  onDelete: (id: string) => void;
  onEdit: (lead: Lead) => void;
};

export default function LeadTable({
  leads,
  onDelete,
  onEdit,
}: LeadTableProps) {
  if (!leads.length) {
    return (
      <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-sm text-slate-500">
        No leads found for the current filters.
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
      {leads.map((lead) => (
        <LeadCard
          key={lead.id}
          lead={lead}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}