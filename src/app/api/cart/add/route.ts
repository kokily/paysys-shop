import { NextRequest, NextResponse } from 'next/server';
import db from '@/helpers/server/database';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as AddCartPayload;
  try {
    const item = await db.item.findUnique({
      where: { id: body.itemId },
    });

    if (!item) {
      return NextResponse.json({ error: '해당 품목은 없습니다.' }, { status: 404 });
    }

    // 현재 세션 사용자의 카트
    const prevCart = await db.cart.findFirst({
      where: {
        userId: body.userId,
        completed: false,
        deleted: false,
      },
    });

    // 카트에 추가할 품목 모델
    const addItem: AddItemModel = {
      id: item.id,
      name: item.name,
      divide: item.divide,
      native: item.native,
      unit: item.unit,
      price: body.price,
      count: body.count,
      amount: body.count * body.price,
    };

    // 카트 내용 분기점
    if (!prevCart) {
      // 기존 카트 내역이 없을 시 카트 신규 생성
      const cart = await db.cart.create({
        data: {
          items: [addItem] as any,
          userId: body.userId,
        },
      });

      return NextResponse.json(cart);
    } else {
      // 기존 카트 내역이 있을 시 품목만 추가
      const updateCartItems = [...prevCart.items, addItem];
      const cart = await db.cart.update({
        where: { id: prevCart.id },
        data: {
          ...prevCart,
          items: updateCartItems as any,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(cart);
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
