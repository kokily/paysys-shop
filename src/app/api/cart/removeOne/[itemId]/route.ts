import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';
import { getSessionUser } from '@/helpers/server/utils/getSessionUser';

export async function PATCH(_: NextRequest, { params: { itemId } }: any) {
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

    // 카트 내역에 따른 분기
    if (cart.items.length === 1) {
      // 카트 내역이 한 품목만 남았을 때 카트 전체 삭제
      await db.cart.update({
        where: { id: cart.id },
        data: {
          deleted: true,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({ message: '카트 삭제 완료' });
    } else {
      // 카트 내역이 두 품목 이상일 때 해당 품목만 삭제
      const updateCart = { ...cart };
      const idx = updateCart.items.findIndex((item: any) => {
        return item.id === itemId;
      });

      if (idx > -1) {
        updateCart.items.splice(idx, 1);
      }

      await db.cart.update({
        where: { id: cart.id },
        data: {
          ...(updateCart as any),
          updatedAt: new Date(),
        },
      });
    }

    return NextResponse.json({ message: '카트 품목 삭제 완료' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
