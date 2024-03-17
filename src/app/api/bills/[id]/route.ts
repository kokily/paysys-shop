import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';

export async function GET(_: NextRequest, { params: { id } }: any) {
  try {
    const bill = await db.bill.findUnique({ where: { id } });

    if (!bill) {
      return NextResponse.json({ error: '해당 빌지가 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(bill);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
