import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

const ALLOWED_STAGES = ['new', 'contacted', 'negotiation', 'won', 'lost'];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ dealsId: string }> }
) {
  const { dealsId } = await params;
  // ...rest stays the same
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ dealsId: string }> }
) {
  const { dealsId } = await params;
  // ...rest stays the same
}
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { dealsId: string } }
// ) {
//   try {
//     const { dealsId } = params;
//     const result = await pool.query('DELETE FROM deals WHERE id = $1 RETURNING id', [dealsId]);

//     if (result.rows.length === 0) {
//       return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
//     }

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error('DELETE /api/deals error:', err);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }