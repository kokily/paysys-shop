import { z } from "zod";

/** 카트에 품목 추가 */
export const addToCartSchema = z.object({
  itemId: z.string().min(1),
  count: z.number().int().min(1, "수량은 1 이상입니다"),
  price: z.number().int().min(1, "단가는 1 이상입니다"),
});

/** 카트 품목 하나 삭제 */
export const removeCartItemSchema = z.object({
  itemId: z.string().min(1),
});
