export type DealStage = 'new' | 'contacted' | 'negotiation' | 'won' | 'lost';

export type Deal = {
  id: number;
  lead_id: number;
  title: string;
  value: number | null;
  stage: DealStage;
  owner: string | null;
  probability: number | null;
  expected_close: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};