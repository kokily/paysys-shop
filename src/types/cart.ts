/** 카트에 담긴 품목 한 줄 */
export type CartItem = {
  id: string;
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
  count: number;
  amount: number;
};

/** 활성 카트 조회 결과 */
export type CartRow = {
  id: string;
  items: CartItem[];
  totalAmount: number;
};
