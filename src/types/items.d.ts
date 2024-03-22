interface AddItemPayload {
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
}

interface AddItemState {
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: string;
}

interface ListItemsQueries {
  name?: string;
  cursor?: string;
}

interface ItemPayload {
  name: string;
}
