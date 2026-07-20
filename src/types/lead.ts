import type { LeadStatus } from "@/types/leadStatus";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  companySize?: string;
  budget?: string;
  timeline?: string;
  leadVolume?: string;
  preferredChannels?: string;
  requirements?: string;
  currentStack?: string;
  status: LeadStatus;
  score: number;
  createdAt?: string;
};
