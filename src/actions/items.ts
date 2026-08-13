"use server";

import { getAdminUser, requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db";
import {
  deleteItemSchema,
  itemFormSchema,
  listItemsSchema,
  updateItemSchema,
} from "@/schemas/item";
import { revalidatePath } from "next/cache";

export type { ItemRow } from "@/types/items";

const PAGE_SIZE = 30;

/** 품목 목록 Cursor Pagination */
export async function listItemsAction(input?: {
  name?: string;
  divide?: string;
  native?: string;
  cursor?: string;
}) {
  await requireAdmin();

  const parsed = listItemsSchema.safeParse(input ?? {});
  if (!parsed.success) {
    return { ok: false as const, error: "입력값을 확인하세요." };
  }

  const name = parsed.data.name?.trim() ?? "";
  const divide = parsed.data.divide?.trim() ?? "";
  const native = parsed.data.native?.trim() ?? "";
  const cursor = parsed.data.cursor;

  const items = await prisma.item.findMany({
    where: {
      ...(name ? { name: { contains: name, mode: "insensitive" } } : {}),
      ...(divide ? { divide } : {}),
      ...(native ? { native } : {}),
    },
    orderBy: [{ num: "asc" }, { id: "asc" }],
    take: PAGE_SIZE,
    ...(cursor
      ? {
          skip: 1,
          cursor: { id: cursor },
        }
      : {}),
    select: {
      id: true,
      num: true,
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
    nextCursor: items.length > 0 ? items[items.length - 1]!.id : null,
    hasMore: items.length === PAGE_SIZE,
  };
}

/** 품목 추가 */
export async function createItemAction(input: {
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
}) {
  await requireAdmin();

  const parsed = itemFormSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message ?? "입력값을 확인하세요",
    };
  }

  const agg = await prisma.item.aggregate({ _max: { num: true } });
  const nextNum = (agg._max.num ?? 0) + 1;

  const item = await prisma.item.create({
    data: {
      num: nextNum,
      name: parsed.data.name,
      divide: parsed.data.divide,
      native: parsed.data.native,
      unit: parsed.data.unit,
      price: parsed.data.price,
    },
    select: {
      id: true,
      num: true,
      name: true,
      divide: true,
      native: true,
      unit: true,
      price: true,
    },
  });

  revalidatePath("/items");

  return { ok: true as const, item };
}

/** 품목 수정 */
export async function updateItemAction(input: {
  id: string;
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
}) {
  await requireAdmin();

  const parsed = updateItemSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message ?? "입력값을 확인하세요",
    };
  }

  const exists = await prisma.item.findUnique({
    where: { id: parsed.data.id },
    select: { id: true },
  });

  if (!exists) {
    return { ok: false as const, error: "품목을 찾을 수 없습니다" };
  }

  const item = await prisma.item.update({
    where: { id: parsed.data.id },
    data: {
      name: parsed.data.name,
      divide: parsed.data.divide,
      native: parsed.data.native,
      unit: parsed.data.unit,
      price: parsed.data.price,
    },
    select: {
      id: true,
      num: true,
      name: true,
      divide: true,
      native: true,
      unit: true,
      price: true,
    },
  });

  revalidatePath("/items");

  return { ok: true as const, item };
}

/** 품목 삭제 */
export async function deleteItemAction(input: { id: string }) {
  await requireAdmin();

  const parsed = deleteItemSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: "입력값을 확인하세요." };
  }

  const exists = await prisma.item.findUnique({
    where: { id: parsed.data.id },
    select: { id: true },
  });

  if (!exists) {
    return { ok: false as const, error: "품목을 찾을 수 없습니다." };
  }

  await prisma.item.delete({ where: { id: parsed.data.id } });

  revalidatePath("/items");

  return { ok: true as const };
}
