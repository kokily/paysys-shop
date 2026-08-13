"use server";

import { listMenuSchema } from "@/schemas/menu";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth/require-auth";

export type { MenuItemRow } from "@/types/menu";

export async function listMenuAction(input: {
  native: string;
  divide: string;
}) {
  await requireAuth();

  const parsed = listMenuSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message ?? "분류/구분을 확인하세요",
    };
  }

  const { native, divide } = parsed.data;

  const items = await prisma.item.findMany({
    where: { native, divide },
    orderBy: [{ num: "desc" }, { id: "asc" }],
    select: {
      id: true,
      name: true,
      divide: true,
      native: true,
      unit: true,
      price: true,
    },
  });

  return {
    ok: true as const,
    items,
  };
}
