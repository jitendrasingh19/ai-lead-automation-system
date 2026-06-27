import type { LeadStatus } from "@/types/leadStatus";

export type Lead = {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  score: number;
};
