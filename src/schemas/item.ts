import { z } from "zod";

/** 품목 추가/수정 폼 */
export const itemFormSchema = z.object({
  name: z.string().min(1, "품명을 입력하세요"),
  divide: z.string().min(1, "구분을 선택하세요"),
  native: z.enum(["회원", "준회원", "일반"]),
  unit: z.string().min(1, "단위를 입력하세요"),
  price: z.number().int().min(0, "단가는 0 이상입니다"),
});

export type ItemFormInput = z.infer<typeof itemFormSchema>;

/** 목록 검색 */
export const listItemsSchema = z.object({
  name: z.string().optional(),
  divide: z.string().optional(),
  native: z.string().optional(),
  cursor: z.string().optional(),
});

/** 품목 수정 (id + 폼) */
export const updateItemSchema = itemFormSchema.extend({
  id: z.string().min(1),
});

/** 품목 삭제 */
export const deleteItemSchema = z.object({
  id: z.string().min(1),
});
