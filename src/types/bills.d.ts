interface AddBillPayload {
  title: string;
  hall: string;
  etc: string;
}

interface ListBillsQueries {
  title?: string;
  hall?: string;
  userId?: string;
  cursor?: string;
}

interface ListBillsState {
  title: string;
  hall: string;
  userId: string;
}

interface AddReservePayload {
  billId: string;
  reserve: number;
}
