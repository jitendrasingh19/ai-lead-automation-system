import type { Lead } from "@/types/lead";
import LeadActions from "./LeadActions";
import LeadScoreBadge from "./LeadScoreBadge";
import LeadStatusBadge from "./LeadStatusBadge";

type Props = {
  lead: Lead;
  onDelete: (id: string) => void;
  onEdit: (lead: Lead) => void;
};

export default function LeadRow({ lead, onDelete, onEdit }: Props) {
  return (
    <tr>
      <td className="border p-2">{lead.name}</td>
      <td className="border p-2">{lead.email}</td>

      <td className="border p-2">
        <LeadStatusBadge status={lead.status} />
      </td>

      <td className="border p-2">
        <LeadActions
          id={lead.id}
          onDelete={onDelete}
          onEdit={() => onEdit(lead)}
        />
      </td>

      <td className="border p-2">
        <LeadScoreBadge score={lead.score} />
      </td>
    </tr>
  );
}