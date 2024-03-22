import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';

export async function GET(_: NextRequest, { params: { id } }: any) {
  try {
    const item = await db.item.findUnique({ where: { id } });

    if (!item) {
      return NextResponse.json({ error: '해당 품목은 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
