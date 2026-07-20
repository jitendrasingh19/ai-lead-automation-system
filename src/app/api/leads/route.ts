import { NextResponse } from "next/server";
import pool from "@/lib/db";
import type { Lead } from "@/types/lead";
import type { LeadStatus } from "@/types/leadStatus";

function normalizeStatus(value: unknown): LeadStatus {
  const status = String(value ?? "New").trim().toLowerCase();

  switch (status) {
    case "qualified":
      return "Qualified";
    case "contacted":
      return "Contacted";
    case "meeting":
      return "Meeting";
    case "won":
      return "Won";
    case "lost":
      return "Lost";
    case "new":
    default:
      return "New";
  }
}

function mapLead(row: Record<string, unknown>, index: number): Lead {
  const firstName = String(row.first_name ?? "");
  const lastName = String(row.last_name ?? "");
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || String(row.name ?? row.company_name ?? row.companyName ?? row.full_name ?? row.email ?? `Lead ${index + 1}`);

  return {
    id: String(row.id ?? row.lead_id ?? row.leadId ?? row.email ?? index),
    name: fullName,
    email: String(row.email ?? ""),
    phone: String(row.phone ?? ""),
    company: String(row.company_name ?? row.companyName ?? ""),
    jobTitle: String(row.job_title ?? row.jobTitle ?? ""),
    companySize: String(row.company_size ?? row.companySize ?? ""),
    budget: String(row.budget_range ?? row.budgetRange ?? ""),
    timeline: String(row.timeline ?? ""),
    leadVolume: String(row.lead_volume ?? row.leadVolume ?? ""),
    preferredChannels: String(row.preferred_channels ?? row.preferredChannels ?? ""),
    requirements: String(row.requirements ?? ""),
    currentStack: String(row.current_stack ?? row.currentStack ?? ""),
    status: normalizeStatus(row.status ?? row.lead_status ?? row.pipeline_status ?? "New"),
    score: Number(row.score ?? row.lead_score ?? 0) || 0,
    createdAt: String(row.created_at ?? row.createdAt ?? ""),
  };
}

// GET all leads
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM leads ORDER BY id DESC");
    const leads = result.rows.map((row, index) => mapLead(row, index));

    return NextResponse.json(leads);
  } catch (error) {
    console.error("Failed to load leads from database:", error);
    return NextResponse.json([]);
  }
}

// DELETE lead
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, error: "Lead id is required" }, { status: 400 });
    }

    await pool.query("DELETE FROM leads WHERE id = $1", [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete lead from database:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// UPDATE lead
export async function PATCH(req: Request) {
  try {
    const updatedLead = await req.json();

    if (!updatedLead?.id) {
      return NextResponse.json({ success: false, error: "Lead id is required" }, { status: 400 });
    }

    await pool.query(
      `
      UPDATE leads
      SET name = $1, email = $2, status = $3, score = $4
      WHERE id = $5
      `,
      [updatedLead.name, updatedLead.email, updatedLead.status, updatedLead.score, updatedLead.id]
    );

    return NextResponse.json(updatedLead);
  } catch (error) {
    console.error("Failed to update lead in database:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}