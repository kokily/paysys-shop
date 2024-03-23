import { NextRequest, NextResponse } from 'next/server';
import { serializeUser } from '@/helpers/client/utils/serializeUser';
import db from '@/helpers/server/database';
import { checkAdmin } from '@/helpers/server/utils/checkAdmin';

export async function PATCH(_: NextRequest, { params: { id } }: any) {
  try {
    await checkAdmin();
    
    const user = await db.user.findUnique({ where: { id } });

    if (!user) {
      return NextResponse.json(
        { error: '해당 사용자가 없습니다.' },
        { status: 404 },
      );
    }

    await db.user.update({
      where: { id },
      data: {
        admin: !user.admin,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(serializeUser(user));
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
