"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth/require-auth";
import { prisma } from "@/lib/db";
import { CartItem } from "@/types/cart";
import { addBillSchema } from "@/schemas/bill";

/** 카트 → 전표 생성 */
export async function addBillAction(input: {
  title: string;
  hall: string;
  etc: string;
}) {
  const user = await requireAuth();

  const parsed = addBillSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message ?? "빈 칸 없이 입력하세요",
    };
  }

  const title = parsed.data.title;
  const hall = parsed.data.hall;
  const etc = parsed.data.etc?.trim() || " ";

  const cart = await prisma.cart.findFirst({
    where: {
      user_id: user.user_id,
      completed: false,
      deleted: false,
    },
  });

  if (!cart) {
    return {
      ok: false as const,
      error: "카트를 찾을 수 없습니다",
    };
  }

  const items = (cart.items as CartItem[] | null) ?? [];

  if (items.length === 0) {
    return {
      ok: false as const,
      error: "카트에 품목이 없습니다",
    };
  }

  const totalAmount = items.reduce((sum, i) => sum + (i.amount ?? 0), 0);

  const bill = await prisma.$transaction(async (tx) => {
    await tx.bill.deleteMany({ where: { cart_id: cart.id } });

    const created = await tx.bill.create({
      data: {
        title,
        hall,
        etc,
        total_amount: totalAmount,
        items,
        cart_id: cart.id,
        user_id: user.user_id,
        username: user.username,
      },
      select: { id: true, title: true },
    });

    await tx.cart.update({
      where: { id: cart.id },
      data: { completed: true },
    });

    return created;
  });

  revalidatePath("/cart");
  revalidatePath("/fronts");

  return {
    ok: true as const,
    bill,
  };
}
