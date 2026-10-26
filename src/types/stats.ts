/** 품목 판매 통계 한 줄 (품류/분류/품명/단위/단가 기준) */
export type ItemStatsRow = {
  divide: string;
  native: string;
  name: string;
  unit: string;
  price: number;
  /** "YYYY-MM" → 판매량 */
  monthly: Record<string, number>;
  totalCount: number;
  totalAmount: number;
};
