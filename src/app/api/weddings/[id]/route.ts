import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';
import { checkAdmin } from '@/helpers/server/utils/checkAdmin';

export async function GET(_: NextRequest, { params: { id } }: any) {
  try {
    await checkAdmin();
    
    const wedding = await db.wedding.findUnique({ where: { id } });

    if (!wedding) {
      return NextResponse.json({ error: '해당 빌지는 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(wedding);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
