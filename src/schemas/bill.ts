import { z } from "zod";

/** 카트 → 전표 생성 */
export const addBillSchema = z.object({
  title: z.string().trim().min(1, "빈 칸 없이 입력하세요"),
  hall: z.string().trim().min(1, "빈 칸 없이 입력하세요"),
  etc: z.string().optional(),
});

/** 전표 목록 검색 */
export const listBillsSchema = z.object({
  title: z.string().optional(),
  hall: z.string().optional(),
  userId: z.string().optional(),
  cursor: z.string().optional(),
});

const billItemPatchSchema = z.object({
  id: z.string().min(1),
  native: z.enum(["회원", "준회원", "일반"]),
  price: z.number(),
  count: z.number().int().min(1),
  name: z.string().optional(),
  divide: z.string().optional(),
  unit: z.string().optional(),
});

/** 전표 품목 수정 */
export const updateBillSchema = z.object({
  id: z.string().min(1),
  items: z.array(billItemPatchSchema).min(1, "품목은 1개 이상 있어야 합니다"),
});

/** 구분 변경 시 마스터 조회 */
export const resolveItemByNativeSchema = z.object({
  name: z.string().trim().min(1),
  divide: z.string().trim().min(1),
  native: z.enum(["회원", "준회원", "일반"]),
});

/** 예약금 추가 */
export const addReserveSchema = z.object({
  id: z.string().min(1),
  reserve: z.number().int().min(1, "예약금을 입력하세요."),
});
