import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';

export async function GET(_: NextRequest, { params: { id } }: any) {
  try {
    const menu = await db.item.findUnique({
      where: { id },
    });

    if (!menu) {
      return NextResponse.json({ error: '해당 메뉴는 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(menu);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
