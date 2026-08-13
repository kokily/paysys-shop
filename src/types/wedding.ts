/** 식대/답례품 분할 */
export type SplitMethod = "privacy" | "husband" | "bride" | "half";

/** 예약금 분할 (privacy 없음) */
export type ReserveMethod = "half" | "husband" | "bride";

/** DB/조회용 웨딩 (숫자 필드) */
export type Wedding = {
  id: string;
  wedding_at: Date;
  event_at: string;
  created_at: Date;
  updated_at: Date;

  husband_name: string;
  husband_image: string | null;
  husband_hall: number;
  husband_sword: number;
  husband_bouquet: number;
  husband_company: number;
  husband_owner_woman: number;
  husband_owner_man: number;
  husband_frame: number;
  husband_file: number;
  husband_dvd: number;
  husband_etc: number;
  husband_meal: number;
  husband_present: number;
  husband_reserve: number;
  husband_pre_deposit: number;

  bride_name: string;
  bride_image: string | null;
  bride_hall: number;
  bride_sword: number;
  bride_bouquet: number;
  bride_company: number;
  bride_owner_woman: number;
  bride_owner_man: number;
  bride_frame: number;
  bride_file: number;
  bride_dvd: number;
  bride_etc: number;
  bride_meal: number;
  bride_present: number;
  bride_reserve: number;
  bride_pre_deposit: number;

  meal_method: SplitMethod;
  present_method: SplitMethod;
  reserve_method: ReserveMethod;
  meal_price: number;
  present_price: number;
  reserve_price: number;
};

/** 목록 행 */
export type WeddingRow = {
  id: string;
  wedding_at: Date;
  event_at: string;
  husband_name: string;
  bride_name: string;
};

/** 폼 입력 (문자열 위주) */
export type WeddingFormInput = {
  wedding_at: string; // YYYY-MM-DD
  event_at: string;
  husband_name: string;
  bride_name: string;

  husband_hall: string;
  husband_sword: string;
  husband_bouquet: string;
  husband_company: string;
  husband_owner_woman: string;
  husband_owner_man: string;
  husband_frame: string;
  husband_file: string;
  husband_dvd: string;
  husband_etc: string;
  husband_meal: string;
  husband_present: string;
  husband_pre_deposit: string;

  bride_hall: string;
  bride_sword: string;
  bride_bouquet: string;
  bride_company: string;
  bride_owner_woman: string;
  bride_owner_man: string;
  bride_frame: string;
  bride_file: string;
  bride_dvd: string;
  bride_etc: string;
  bride_meal: string;
  bride_present: string;
  bride_pre_deposit: string;

  meal_method: SplitMethod;
  present_method: SplitMethod;
  reserve_method: ReserveMethod;
  meal_price: string;
  present_price: string;
  reserve_price: string;
};
