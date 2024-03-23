import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';
import { serializeUser } from '@/helpers/client/utils/serializeUser';
import { checkAdmin } from '@/helpers/server/utils/checkAdmin';

export async function GET(_: NextRequest, { params: { id } }: any) {
  try {
    await checkAdmin();
    
    const user = await db.user.findUnique({ where: { id } });

    if (!user) {
      return NextResponse.json(
        { error: '해당 사용자는 없습니다.' },
        { status: 404 },
      );
    }

    return NextResponse.json(serializeUser(user));
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
