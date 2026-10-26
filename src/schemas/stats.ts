import { z } from "zod";
import { ITEM_DIVIDES } from "@/lib/data/item";

const dateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "날짜 형식을 확인하세요");

/** 품류별 월간 판매 통계 조회 */
export const itemStatsSchema = z
  .object({
    divides: z.array(z.enum(ITEM_DIVIDES)).min(1, "품류를 1개 이상 선택하세요"),
    from: dateString,
    to: dateString,
  })
  .refine((v) => v.from <= v.to, {
    message: "시작일자가 종료일자보다 늦습니다",
    path: ["to"],
  });
