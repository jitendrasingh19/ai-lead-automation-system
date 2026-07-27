import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const stage = searchParams.get('stage');

  try {
    const result = stage
      ? await pool.query('SELECT * FROM deals WHERE stage = $1 ORDER BY id DESC', [stage])
      : await pool.query('SELECT * FROM deals ORDER BY id DESC');

    return NextResponse.json(result.rows);
  } catch (err) {
    console.error('GET /api/deals error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, value, stage, lead_id, owner, probability, expected_close, notes } = body;

    if (!title || !stage) {
      return NextResponse.json({ error: 'title and stage are required' }, { status: 400 });
    }

    if (!lead_id) {
      return NextResponse.json({ error: 'lead_id is required' }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO deals (title, value, stage, lead_id, owner, probability, expected_close, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        title,
        value ?? null,
        stage,
        lead_id,
        owner ?? null,
        probability ?? 10,
        expected_close ?? null,
        notes ?? null,
      ]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (err) {
    console.error('POST /api/deals error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}