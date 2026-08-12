"use server";

import { addToCartSchema } from "@/schemas/cart";
import { checkAuthAction } from "./auth";
import { prisma } from "@/lib/db";
import { CartItem } from "@/types/cart";

/** 카트에 품목 추가 */
export async function addToCartAction(input: {
  itemId: string;
  count: number;
  price: number;
}) {
  const auth = await checkAuthAction();

  if (!auth.ok || !auth.user) {
    return {
      ok: false as const,
      error: "로그인이 필요합니다",
    };
  }

  const parsed = addToCartSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message ?? "단가 또는 수량을 입력하세요",
    };
  }

  const count = parsed.data.count;
  const price = parsed.data.price;

  const item = await prisma.item.findUnique({
    where: { id: parsed.data.itemId },
    select: {
      id: true,
      name: true,
      divide: true,
      native: true,
      unit: true,
    },
  });

  if (!item) {
    return {
      ok: false as const,
      error: "존재하지 않는 품목입니다",
    };
  }

  const cartItem: CartItem = {
    id: item.id,
    name: item.name,
    divide: item.divide,
    native: item.native,
    unit: item.unit,
    price,
    count,
    amount: price * count,
  };

  const existing = await prisma.cart.findFirst({
    where: {
      user_id: auth.user.user_id,
      completed: false,
      deleted: false,
    },
  });

  if (!existing) {
    await prisma.cart.create({
      data: {
        user_id: auth.user.user_id,
        items: [cartItem],
        completed: false,
        deleted: false,
      },
    });
  } else {
    const prev = (existing.items as CartItem[] | null) ?? [];

    await prisma.cart.update({
      where: { id: existing.id },
      data: {
        items: [...prev, cartItem],
      },
    });
  }

  return {
    ok: true as const,
  };
}
