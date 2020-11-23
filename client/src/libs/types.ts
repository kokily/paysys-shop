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
