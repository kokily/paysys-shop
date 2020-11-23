export interface UserType {
  id: string;
  username: string;
  admin: boolean;
  token_version: number;
  created_at: string;
}

export interface MenuType {
  id: string;
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
}

export interface ItemType {
  id: string;
  name: string;
  native: string;
  divide: string;
  price: number;
  unit: string;
  count: number;
  amount: number;
}

export interface CartType {
  id: string;
  user_id: string;
  completed: boolean;
  deleted: boolean;
  bill_id: string;
  items: ItemType[] | null;
}

export interface BillType {
  id: string;
  title: string;
  hall: string;
  etc: string;
  total_amount: number;
  items: ItemType[];
  reserve?: number;
  username: string;
  user_id: string;
  cart_id: string;
  created_at: string;
}

export interface WeddingType {
  id: string;
  husband: string;
  bride: string;
  reserve_pay: number;
  husband_rental: number;
  bride_rental: number;
  sum_rental: number;
  husband_company: number;
  bride_company: number;
  sum_company: number;
  husband_add: number;
  bride_add: number;
  sum_add: number;
  husband_today: number;
  bride_today: number;
  sum_today: number;
  husband_bouquet: number;
  bride_bouquet: number;
  sum_bouquet: number;
  husband_ceremony: number;
  bride_ceremony: number;
  sum_ceremony: number;
  husband_hanbok: number;
  bride_hanbok: number;
  sum_hanbok: number;
  husband_play: number;
  bride_play: number;
  sum_play: number;
  husband_anthem: number;
  bride_anthem: number;
  sum_anthem: number;
  husband_moderator: number;
  bride_moderator: number;
  sum_moderator: number;
  husband_officiate: number;
  bride_officiate: number;
  sum_officiate: number;
  husband_etc: number;
  bride_etc: number;
  sum_etc: number;
  husband_conv: number;
  bride_conv: number;
  sum_conv: number;
  husband_wedding: number;
  bride_wedding: number;
  sum_wedding: number;
  meals_price: number;
  husband_num: number;
  bride_num: number;
  sum_num: number;
  husband_meal: number;
  bride_meal: number;
  sum_meal: number;
  present_price: number;
  husband_present_num: number;
  bride_present_num: number;
  sum_present_num: number;
  husband_present: number;
  bride_present: number;
  sum_present: number;
  meal: string;
  reserve: string;
  present: string;
  husband_reserve: number;
  bride_reserve: number;
  created_at: Date;
  updated_at: Date;
  wedding_at: Date;
  event_at: string;
  user_id: string;
}

export interface ExpenseType {
  husband: string;
  bride: string;
  reserve_pay: string;
  husband_rental: string;
  bride_rental: string;
  sum_rental: string;
  husband_company: string;
  bride_company: string;
  sum_company: string;
  husband_add: string;
  bride_add: string;
  sum_add: string;
  husband_today: string;
  bride_today: string;
  sum_today: string;
  husband_bouquet: string;
  bride_bouquet: string;
  sum_bouquet: string;
  husband_ceremony: string;
  bride_ceremony: string;
  sum_ceremony: string;
  husband_hanbok: string;
  bride_hanbok: string;
  sum_hanbok: string;
  husband_play: string;
  bride_play: string;
  sum_play: string;
  husband_anthem: string;
  bride_anthem: string;
  sum_anthem: string;
  husband_moderator: string;
  bride_moderator: string;
  sum_moderator: string;
  husband_officiate: string;
  bride_officiate: string;
  sum_officiate: string;
  husband_etc: string;
  bride_etc: string;
  sum_etc: string;
  husband_conv: string;
  bride_conv: string;
  sum_conv: string;
  husband_wedding: string;
  bride_wedding: string;
  sum_wedding: string;
  meals_price: string;
  husband_num: string;
  bride_num: string;
  sum_num: string;
  husband_meal: string;
  bride_meal: string;
  sum_meal: string;
  present_price: string;
  husband_present_num: string;
  bride_present_num: string;
  sum_present_num: string;
  husband_present: string;
  bride_present: string;
  sum_present: string;
  meal: string;
  reserve: string;
  present: string;
  event_at: string;
}

export interface SavingWedding {
  husband: string;
  bride: string;
  reserve_pay: number;
  husband_rental: number;
  bride_rental: number;
  husband_company: number;
  bride_company: number;
  husband_add: number;
  bride_add: number;
  husband_today: number;
  bride_today: number;
  husband_bouquet: number;
  bride_bouquet: number;
  husband_ceremony: number;
  bride_ceremony: number;
  husband_hanbok: number;
  bride_hanbok: number;
  husband_play: number;
  bride_play: number;
  husband_anthem: number;
  bride_anthem: number;
  husband_moderator: number;
  bride_moderator: number;
  husband_officiate: number;
  bride_officiate: number;
  husband_etc: number;
  bride_etc: number;
  husband_conv: number;
  bride_conv: number;
  meals_price: number;
  husband_num: number;
  bride_num: number;
  present_price: number;
  husband_present_num: number;
  bride_present_num: number;
  meal: string;
  reserve: string;
  present: string;
  wedding_at: Date;
  event_at: string;
}
