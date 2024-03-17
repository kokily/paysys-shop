import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';
import { getSessionUser } from '@/helpers/server/utils/getSessionUser';

export async function DELETE(_: NextRequest) {
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

    await db.cart.update({
      where: { id: cart.id },
      data: {
        deleted: true,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ message: '카트삭제 완료' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
