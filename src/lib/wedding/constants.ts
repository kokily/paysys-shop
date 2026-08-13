import type { Wedding, WeddingFormInput } from "@/types/wedding";

export const EVENT_AT_OPTIONS = [
  "11:30",
  "13:00",
  "14:30",
  "16:00",
  "17:30",
  "19:00",
] as const;

export const MEAL_METHOD_OPTIONS = [
  { title: "각각 결제", value: "privacy" },
  { title: "신랑 결제", value: "husband" },
  { title: "신부 결제", value: "bride" },
  { title: "반반 결제", value: "half" },
] as const;

export const PRESENT_METHOD_OPTIONS = [
  { title: "각각 결제", value: "privacy" },
  { title: "신랑 결제", value: "husband" },
  { title: "신부 결제", value: "bride" },
  { title: "반반 결제", value: "half" },
] as const;

export const RESERVE_METHOD_OPTIONS = [
  { title: "예약금 반반", value: "half" },
  { title: "예약금 신랑", value: "husband" },
  { title: "예약금 신부", value: "bride" },
] as const;

/** 폼 초기값 */
export const EMPTY_WEDDING_FORM: WeddingFormInput = {
  wedding_at: "",
  event_at: "11:30",
  husband_name: "",
  bride_name: "",

  husband_hall: "0",
  husband_sword: "0",
  husband_bouquet: "0",
  husband_company: "0",
  husband_owner_woman: "0",
  husband_owner_man: "0",
  husband_frame: "0",
  husband_file: "0",
  husband_dvd: "0",
  husband_etc: "0",
  husband_meal: "0",
  husband_present: "0",
  husband_pre_deposit: "0",

  bride_hall: "0",
  bride_sword: "0",
  bride_bouquet: "0",
  bride_company: "0",
  bride_owner_woman: "0",
  bride_owner_man: "0",
  bride_frame: "0",
  bride_file: "0",
  bride_dvd: "0",
  bride_etc: "0",
  bride_meal: "0",
  bride_present: "0",
  bride_pre_deposit: "0",

  meal_method: "privacy",
  present_method: "privacy",
  reserve_method: "half",
  meal_price: "0",
  present_price: "0",
  reserve_price: "0",
};

/** DB Wedding → 폼 */
export function weddingToForm(wedding: Wedding): WeddingFormInput {
  const wedding_at = new Date(wedding.wedding_at).toISOString().slice(0, 10);

  return {
    wedding_at,
    event_at: wedding.event_at,
    husband_name: wedding.husband_name,
    bride_name: wedding.bride_name,

    husband_hall: String(wedding.husband_hall),
    husband_sword: String(wedding.husband_sword),
    husband_bouquet: String(wedding.husband_bouquet),
    husband_company: String(wedding.husband_company),
    husband_owner_woman: String(wedding.husband_owner_woman),
    husband_owner_man: String(wedding.husband_owner_man),
    husband_frame: String(wedding.husband_frame),
    husband_file: String(wedding.husband_file),
    husband_dvd: String(wedding.husband_dvd),
    husband_etc: String(wedding.husband_etc),
    husband_meal: String(wedding.husband_meal),
    husband_present: String(wedding.husband_present),
    husband_pre_deposit: String(wedding.husband_pre_deposit),

    bride_hall: String(wedding.bride_hall),
    bride_sword: String(wedding.bride_sword),
    bride_bouquet: String(wedding.bride_bouquet),
    bride_company: String(wedding.bride_company),
    bride_owner_woman: String(wedding.bride_owner_woman),
    bride_owner_man: String(wedding.bride_owner_man),
    bride_frame: String(wedding.bride_frame),
    bride_file: String(wedding.bride_file),
    bride_dvd: String(wedding.bride_dvd),
    bride_etc: String(wedding.bride_etc),
    bride_meal: String(wedding.bride_meal),
    bride_present: String(wedding.bride_present),
    bride_pre_deposit: String(wedding.bride_pre_deposit),

    meal_method: wedding.meal_method,
    present_method: wedding.present_method,
    reserve_method: wedding.reserve_method,
    meal_price: String(wedding.meal_price),
    present_price: String(wedding.present_price),
    reserve_price: String(wedding.reserve_price),
  };
}
