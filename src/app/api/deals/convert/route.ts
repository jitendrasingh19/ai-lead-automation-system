import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request: Request) {
  console.log("✅ Convert API Hit");
  try {
    const { leadId } = await request.json();

    // Find lead
    const leadResult = await pool.query(
      `SELECT * FROM leads WHERE id = $1`,
      [leadId]
    );

    if (leadResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      );
    }

    const lead = leadResult.rows[0];

    // Prevent duplicate conversion
    const dealExists = await pool.query(
      `SELECT id FROM deals WHERE lead_id = $1`,
      [leadId]
    );

    if (dealExists.rows.length > 0) {
      return NextResponse.json(
        { error: "Lead already converted" },
        { status: 400 }
      );
    }

    // Create Deal
    await pool.query(
      `
      INSERT INTO deals
      (
        lead_id,
        title,
        value,
        stage,
        probability
      )
      VALUES
      ($1,$2,$3,'New',10)
      `,
      [
        lead.id,
        `${lead.company_name} - AI Automation`,
        Number(lead.budget_range?.replace(/[^0-9.]/g, "")) || 0
      ]
    );

    // Update lead status
    await pool.query(
      `
      UPDATE leads
      SET status='qualified'
      WHERE id=$1
      `,
      [lead.id]
    );

    return NextResponse.json({
      success: true
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}