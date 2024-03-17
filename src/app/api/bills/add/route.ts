import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';
import { getSessionUser } from '@/helpers/server/utils/getSessionUser';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as AddBillPayload;

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

    let totalAmount = 0;

    cart.items.map((item: any) => {
      return (totalAmount += item.amount);
    });

    const bill = await db.bill.create({
      data: {
        ...body,
        items: cart.items as any,
        totalAmount,
        userId: user.id,
        username: user.username,
        cartId: cart.id,
      },
    });

    await db.cart.update({
      where: { id: cart.id },
      data: {
        completed: true,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(bill);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
