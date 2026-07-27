import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

const ALLOWED_STAGES = ['new', 'contacted', 'negotiation', 'won', 'lost'];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ dealsId: string }> }
) {
  try {
    const { dealsId } = await params;
    const body = await req.json();

    if (body.stage && !ALLOWED_STAGES.includes(body.stage)) {
      return NextResponse.json({ error: 'Invalid stage' }, { status: 400 });
    }

    const result = await pool.query(
      `UPDATE deals
       SET stage = COALESCE($1, stage),
           value = COALESCE($2, value)
       WHERE id = $3
       RETURNING *`,
      [body.stage ?? null, body.value ?? null, dealsId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error('PATCH /api/deals error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ dealsId: string }> }
) {
  try {
    const { dealsId } = await params;
    const result = await pool.query('DELETE FROM deals WHERE id = $1 RETURNING id', [dealsId]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/deals error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}