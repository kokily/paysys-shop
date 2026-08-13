"use server";

import { addToCartSchema, removeCartItemSchema } from "@/schemas/cart";
import { prisma } from "@/lib/db";
import { CartItem } from "@/types/cart";
import { toCartRow } from "@/lib/cart/map";
import { requireAuth } from "@/lib/auth/require-auth";

/** 카트에 품목 추가 */
export async function addToCartAction(input: {
  itemId: string;
  count: number;
  price: number;
}) {
  const user = await requireAuth();

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
      user_id: user.user_id,
      completed: false,
      deleted: false,
    },
  });

  if (!existing) {
    await prisma.cart.create({
      data: {
        user_id: user.user_id,
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

async function getActiveCart(userId: string) {
  return prisma.cart.findFirst({
    where: {
      user_id: userId,
      completed: false,
      deleted: false,
    },
  });
}

/** 현 사용자 카트 조회 */
export async function getCartAction() {
  const user = await requireAuth();

  const cart = await getActiveCart(user.user_id);

  if (!cart) {
    return {
      ok: true as const,
      cart: null,
    };
  }

  return {
    ok: true as const,
    cart: toCartRow(cart),
  };
}

/** 카트 내 한 품목 삭제 */
export async function removeCartItemAction(input: { itemId: string }) {
  const user = await requireAuth();

  const parsed = removeCartItemSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message ?? "입력값을 확인하세요",
    };
  }

  const cart = await getActiveCart(user.user_id);

  if (!cart) {
    return {
      ok: false as const,
      error: "카트를 찾을 수 없습니다",
    };
  }

  const prev = (cart.items as CartItem[] | null) ?? [];
  const next = prev.filter((i) => i.id !== parsed.data.itemId);

  if (next.length === prev.length) {
    return {
      ok: false as const,
      error: "해당 품목을 찾을 수 없습니다",
    };
  }

  const updated = await prisma.cart.update({
    where: { id: cart.id },
    data: { items: next },
  });

  return {
    ok: true as const,
    cart: toCartRow(updated),
  };
}

/** 현 사용자 카트 삭제 */
export async function removeCartAction() {
  const user = await requireAuth();

  const cart = await getActiveCart(user.user_id);

  if (cart) {
    await prisma.cart.update({
      where: { id: cart.id },
      data: { deleted: true },
    });
  }

  return {
    ok: true as const,
  };
}
