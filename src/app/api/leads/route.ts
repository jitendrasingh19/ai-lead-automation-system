import { NextResponse } from "next/server";

let leads = [
  { id: "1", name: "John Doe", email: "john@example.com", status: "NEW", score: 92 },
  { id: "2", name: "Jane Smith", email: "jane@example.com", status: "QUALIFIED", score: 67 },
  { id: "3", name: "Robert", email: "robert@example.com", status: "CONTACTED", score: 35 },
];

// GET all leads
export async function GET() {
  return NextResponse.json(leads);
}

// DELETE lead
export async function DELETE(req: Request) {
  const { id } = await req.json();
  leads = leads.filter((l) => l.id !== id);

  return NextResponse.json({ success: true });
}

// UPDATE lead
export async function PATCH(req: Request) {
  const updatedLead = await req.json();

  leads = leads.map((l) =>
    l.id === updatedLead.id ? updatedLead : l
  );

  return NextResponse.json(updatedLead);
}