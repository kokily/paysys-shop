import { EVENT_AT_OPTIONS } from "@/lib/wedding/constants";
import z from "zod";

/** 웨딩 추가/수정 폼 - 필수 필드만 검증, 나머지 금액 필드는 통과 */
export const weddingFormSchema = z.looseObject({
  wedding_at: z.string().trim().min(1, "웨딩 일자를 확인하세요"),
  event_at: z.enum(EVENT_AT_OPTIONS, {
    message: "웨딩 시간이 올바르지 않습니다",
  }),
  husband_name: z.string().trim().min(1, "신랑/신부 이름을 입력하세요"),
  bride_name: z.string().trim().min(1, "신랑/신부 이름을 입력하세요"),
});

export const weddingSignSexSchema = z.enum(["husband", "bride"], {
  message: "서명 대상이 올바르지 않습니다",
});

export type WeddingSignSex = z.infer<typeof weddingSignSexSchema>;

/** 서명 PNG (base64 data URL) */
export const weddingSignImageSchema = z
  .string()
  .refine((v) => v.startsWith("data:image/png;base64"), {
    message: "서명을 먼저 해주세요",
  })
  .refine((v) => v.length >= 200 && v.length <= 1_400_000, {
    message: "서명을 먼저 해주세요",
  });

export const addWeddingSignSchema = z.object({
  weddingId: z.string().min(1),
  sex: weddingSignSexSchema,
  image: weddingSignImageSchema,
});

export const removeWeddingSignSchema = z.object({
  weddingId: z.string().min(1),
  sex: weddingSignSexSchema,
});
