interface ViewCartPayload {
  title: string;
  hall: string;
  etc: string;
  totalAmount: number;
}

interface AddCartPayload {
  itemId: string;
  userId: string;
  count: number;
  price: number;
}

interface AddItemModel {
  id: string;
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
  count: number;
  amount: number;
}
