import type { NativeLabel } from "./native";

/** 품목 구분 */
export const ITEM_DIVIDES = [
  "식사(뷔페)",
  "식사(중식)",
  "식사(양식)",
  "식사(한식)",
  "식사(수행)",
  "식사(다과)",
  "대관료",
  "레드와인",
  "화이트와인/샴페인",
  "주스/차",
  "민속주/고량주",
  "양주",
  "기타주류",
  "칵테일",
  "반입료",
  "부대비용",
] as const;

export type ItemDivideType = (typeof ITEM_DIVIDES)[number];

/** 품목 Native 라벨 */
export const ITEM_NATIVES: NativeLabel[] = ["회원", "준회원", "일반"];
