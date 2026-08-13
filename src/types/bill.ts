import type { CartItem } from "@/types/cart";

/** 전표 목록 행 */
export type BillRow = {
  id: string;
  title: string;
  hall: string;
  username: string | null;
  user_id: string | null;
  created_at: Date;
  native: string;
};

/** 전표 상세 */
export type BillDetail = {
  id: string;
  title: string;
  hall: string;
  etc: string;
  total_amount: number;
  reserve: number | null;
  username: string | null;
  user_id: string | null;
  created_at: Date;
  items: CartItem[];
};

/** 수정 모드 draft 한 줄 */
export type BillDraftItem = {
  id: string;
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: string;
  count: string;
};

export type BillConfirmKind =
  "delete" | "restore" | "removeReserve" | "removeLine" | null;
