import type { Lead } from "@/types/lead";
import LeadRow from "./LeadRow";

type LeadTableProps = {
  leads: Lead[];
  onDelete: (id: string) => void;
  onEdit: (lead: Lead) => void;
};


export default function LeadTable({ leads, onDelete, onEdit }: LeadTableProps) {
  return (
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2 text-left">Name</th>
          <th className="border p-2 text-left">Email</th>
          <th className="border p-2 text-left">Status</th>
          <th className="border p-2 text-left">Action</th>
          <th className="border p-2 text-left">Score</th>
          
        </tr>
      </thead>

      <tbody>
        {leads.map((lead) => (
          <LeadRow key={lead.id} lead={lead} onDelete={onDelete} onEdit={onEdit} />

          
        ))}
      </tbody>
    </table>
  );
}