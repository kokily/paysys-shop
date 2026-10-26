"use server";

import type { CartItem } from "@/types/cart";
import type { ItemStatsRow } from "@/types/stats";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db";
import { ITEM_DIVIDES, ITEM_NATIVES } from "@/lib/data/item";
import {
  kstNextDay,
  kstStartOfDay,
  monthKeys,
  toKstMonth,
} from "@/lib/stats/period";
import { itemStatsSchema } from "@/schemas/stats";

export type { ItemStatsRow } from "@/types/stats";

function orderOf(list: readonly string[], value: string) {
  const i = list.indexOf(value);
  return i === -1 ? list.length : i;
}

/** 품류별 기간 내 전표 등록 수량 (월별) */
export async function itemStatsAction(input: {
  divides: string[];
  from: string;
  to: string;
}) {
  await requireAdmin();

  const parsed = itemStatsSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message ?? "입력값을 확인하세요.",
    };
  }

  const { divides, from, to } = parsed.data;
  const wanted = new Set<string>(divides);

  const bills = await prisma.bill.findMany({
    where: {
      created_at: { gte: kstStartOfDay(from), lt: kstNextDay(to) },
    },
    select: { created_at: true, items: true },
  });

  const rows = new Map<string, ItemStatsRow>();

  for (const bill of bills) {
    const month = toKstMonth(bill.created_at);
    const items = (bill.items as CartItem[] | null) ?? [];

    for (const item of items) {
      if (!wanted.has(item.divide)) continue;

      const price = Number(item.price) || 0;
      const count = Number(item.count) || 0;
      const amount = Number(item.amount ?? price * count) || 0;
      const key = [item.divide, item.native, item.name, item.unit, price].join(
        "|",
      );

      let row = rows.get(key);
      if (!row) {
        row = {
          divide: item.divide,
          native: item.native,
          name: item.name,
          unit: item.unit,
          price,
          monthly: {},
          totalCount: 0,
          totalAmount: 0,
        };
        rows.set(key, row);
      }

      row.monthly[month] = (row.monthly[month] ?? 0) + count;
      row.totalCount += count;
      row.totalAmount += amount;
    }
  }

  const sorted = [...rows.values()].sort(
    (a, b) =>
      orderOf(ITEM_DIVIDES, a.divide) - orderOf(ITEM_DIVIDES, b.divide) ||
      orderOf(ITEM_NATIVES, a.native) - orderOf(ITEM_NATIVES, b.native) ||
      a.name.localeCompare(b.name, "ko") ||
      a.price - b.price,
  );

  return {
    ok: true as const,
    rows: sorted,
    months: monthKeys(from, to),
  };
}
