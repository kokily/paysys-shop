export interface UserType {
  id: string;
  username: string;
  admin: boolean;
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
