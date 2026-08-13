import type { CartItem } from "@/types/cart";
import type { BillDetail, BillDraftItem, BillRow } from "@/types/bill";

/** DB bill → BillDetail */
export function toBillDetail(bill: {
  id: string;
  title: string;
  hall: string;
  etc: string;
  total_amount: number;
  reserve: number | null;
  username: string | null;
  user_id: string | null;
  created_at: Date;
  items: unknown;
}): BillDetail {
  return {
    ...bill,
    items: (bill.items as CartItem[] | null) ?? [],
  };
}

/** 목록용: items[0].native */
export function toBillRow(b: {
  id: string;
  title: string;
  hall: string;
  username: string | null;
  user_id: string | null;
  created_at: Date;
  items: unknown;
}): BillRow {
  const items = (b.items as CartItem[] | null) ?? [];
  return {
    id: b.id,
    title: b.title,
    hall: b.hall,
    username: b.username,
    user_id: b.user_id,
    created_at: b.created_at,
    native: items[0]?.native ?? "-",
  };
}

export function toDraft(items: CartItem[]): BillDraftItem[] {
  return items.map((i) => ({
    id: i.id,
    name: i.name,
    divide: i.divide,
    native: i.native,
    unit: i.unit,
    price: String(i.price),
    count: String(i.count),
  }));
}

export const NATIVE_OPTIONS = ["회원", "준회원", "일반"] as const;

export function nativeClass(native: string) {
  if (native === "회원") return "text-member print:text-[var(--member)]";
  if (native === "준회원")
    return "text-associate print:text-[var(--associate)]";
  if (native === "일반") return "text-general print:text-[var(--general)]";
  return "text-text";
}

export function digitsOnly(value: string) {
  return value.replace(/[^\d]/g, "");
}

export function formatDigits(value: string) {
  if (!value) return "";
  return Number(value).toLocaleString("ko-KR");
}
