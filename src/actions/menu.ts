"use server";

import { listMenuSchema } from "@/schemas/menu";
import { checkAuthAction } from "./auth";
import { prisma } from "@/lib/db";

export type { MenuItemRow } from "@/types/menu";

export async function listMenuAction(input: {
  native: string;
  divide: string;
}) {
  const auth = await checkAuthAction();

  if (!auth.ok || !auth.user) {
    return {
      ok: false as const,
      error: "로그인이 필요합니다",
    };
  }

  const parsed = listMenuSchema.safeParse(input);

  if (parsed.error) {
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
