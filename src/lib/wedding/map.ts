import { ReserveMethod, SplitMethod, Wedding } from "@/types/wedding";

export type PrismaWedding = {
  id: string;
  wedding_at: Date;
  event_at__type__text: string;
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
  meal_method: string;
  present_method: string;
  reserve_method: string;
  meal_price: number;
  present_price: number;
  reserve_price: number;
};

/** Prisma 행 → 앱 Wedding 타입 */
export function toWedding(row: PrismaWedding): Wedding {
  return {
    id: row.id,
    wedding_at: row.wedding_at,
    event_at: row.event_at__type__text,
    created_at: row.created_at,
    updated_at: row.updated_at,

    husband_name: row.husband_name,
    husband_image: row.husband_image,
    husband_hall: row.husband_hall,
    husband_sword: row.husband_sword,
    husband_bouquet: row.husband_bouquet,
    husband_company: row.husband_company,
    husband_owner_woman: row.husband_owner_woman,
    husband_owner_man: row.husband_owner_man,
    husband_frame: row.husband_frame,
    husband_file: row.husband_file,
    husband_dvd: row.husband_dvd,
    husband_etc: row.husband_etc,
    husband_meal: row.husband_meal,
    husband_present: row.husband_present,
    husband_reserve: row.husband_reserve,
    husband_pre_deposit: row.husband_pre_deposit,

    bride_name: row.bride_name,
    bride_image: row.bride_image,
    bride_hall: row.bride_hall,
    bride_sword: row.bride_sword,
    bride_bouquet: row.bride_bouquet,
    bride_company: row.bride_company,
    bride_owner_woman: row.bride_owner_woman,
    bride_owner_man: row.bride_owner_man,
    bride_frame: row.bride_frame,
    bride_file: row.bride_file,
    bride_dvd: row.bride_dvd,
    bride_etc: row.bride_etc,
    bride_meal: row.bride_meal,
    bride_present: row.bride_present,
    bride_reserve: row.bride_reserve,
    bride_pre_deposit: row.bride_pre_deposit,

    meal_method: row.meal_method as SplitMethod,
    present_method: row.present_method as SplitMethod,
    reserve_method: row.reserve_method as ReserveMethod,
    meal_price: row.meal_price,
    present_price: row.present_price,
    reserve_price: row.reserve_price,
  };
}

/** YYYY-MM-DD → @db.Date 비교용 UTC 자정 */
export function toWeddingDate(date: string) {
  return new Date(`${date}T00:00:00.000Z`);
}
