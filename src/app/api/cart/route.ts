import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';
import { getSessionUser } from '@/helpers/server/utils/getSessionUser';

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    const cart = await db.cart.findFirst({
      where: {
        userId: user.id,
        completed: false,
        deleted: false,
      },
    });

    if (!cart) {
      return NextResponse.json({ error: '카트 내역이 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(cart);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
