import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic server-side validation for required fields
    const required = ["email", "companyName", "companySize", "budgetRange", "timeline", "requirements"];
    for (const key of required) {
      if (!body[key] || String(body[key]).trim() === "") {
        return NextResponse.json({ error: `${key} is required` }, { status: 400 });
      }
    }

    const webhook = process.env.N8N_WEBHOOK;
    if (!webhook) {
      return NextResponse.json({ error: "n8n webhook not configured on server" }, { status: 500 });
    }

    const headers: Record<string,string> = { "Content-Type": "application/json" };
    if (process.env.N8N_API_KEY) headers["x-api-key"] = process.env.N8N_API_KEY;

    const resp = await fetch(webhook, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      return NextResponse.json({ error: "n8n forward failed", details: txt }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
