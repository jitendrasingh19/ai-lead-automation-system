"use client";

import type { LeadStatus } from "@/types/leadStatus";

type StatusFilterProps = {
  value: "ALL" | LeadStatus;
  onChange: (value: "ALL" | LeadStatus) => void;
};

const statuses: ("ALL" | LeadStatus)[] = [
  "ALL",
  "New",
  "Contacted",
  "Qualified",
  "Meeting",
  "Won",
  "Lost",
];

export default function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded mb-4 ml-2"
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}