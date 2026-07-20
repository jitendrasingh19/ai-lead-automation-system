import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request: Request) {
  try {
    const text = await request.text();
    if (!text) {
      return NextResponse.json({ error: "Empty request body" }, { status: 400 });
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(text) as Record<string, unknown>;
    } catch (error) {
      console.error("Invalid JSON body", error);
      return NextResponse.json(
        {
          error: "Invalid JSON body",
          details: error instanceof Error ? error.message : String(error),
        },
        { status: 400 }
      );
    }

    // Basic server-side validation for required fields
    const required = ["email", "companyName", "companySize", "budgetRange", "timeline", "requirements"];
    for (const key of required) {
      const value = body[key];
      if (!value || String(value).trim() === "") {
        return NextResponse.json({ error: `${key} is required` }, { status: 400 });
      }
    }

    try {
      await pool.query(
        `
      INSERT INTO leads (
        first_name,
        last_name,
        email,
        phone,
        company_name,
        job_title,
        company_size,
        budget_range,
        timeline,
        lead_volume,
        preferred_channels,
        requirements,
        current_stack,
        created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      `,
        [
          body.firstName ?? "",
          body.lastName ?? "",
          body.email,
          body.phone ?? "",
          body.companyName,
          body.jobTitle ?? "",
          body.companySize,
          body.budgetRange,
          body.timeline,
          body.leadVolume ?? "",
          body.preferredChannels ?? "",
          body.requirements,
          body.currentStack ?? "",
          new Date().toISOString(),
        ]
      );
    } catch (dbErr) {
      console.error("DB insert error:", dbErr, { body });
      return NextResponse.json(
        {
          error: "db insert failed",
          details:
            process.env.NODE_ENV === "development"
              ? dbErr instanceof Error
                ? dbErr.message
                : String(dbErr)
              : "internal",
        },
        { status: 500 }
      );
    }

    const webhook = process.env.N8N_WEBHOOK || process.env.NEXT_PUBLIC_N8N_WEBHOOK;

    if (!webhook) {
      console.warn("N8N webhook is not configured.");
      return NextResponse.json(
        { success: false, error: "n8n webhook is not configured." },
        { status: 500 }
      );
    }

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (process.env.N8N_API_KEY) {
        headers["x-api-key"] = process.env.N8N_API_KEY;
      }

      console.log("Calling n8n webhook:", webhook);

      const resp = await fetch(webhook, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const responseText = await resp.text();

      if (!resp.ok) {
        console.error("n8n returned:", resp.status, responseText);
        return NextResponse.json(
          {
            success: false,
            error: "n8n webhook rejected the request",
            details: responseText || `HTTP ${resp.status}`,
          },
          { status: 502 }
        );
      }

      console.log("n8n accepted request:", responseText);
    } catch (err) {
      console.error("Failed to call n8n:", err);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to reach n8n webhook",
          details: err instanceof Error ? err.message : String(err),
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Quote submitted successfully.",
    });

    
  } catch (err) {
    console.error("Quote submission error:", err);
    return NextResponse.json(
      {
        error: "server error",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
