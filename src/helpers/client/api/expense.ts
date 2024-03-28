import { Wedding } from '@prisma/client';
import client from './client';

export async function addExpenseAPI(payload: AddExpensePayload) {
  const response = await client.post<Wedding>('/expense', payload);
  return response.data;
}

export async function updateExpenseAPI({
  id,
  payload,
}: {
  id: string;
  payload: AddExpensePayload;
}) {
  const response = await client.patch<Wedding>(`/expense/update/${id}`, payload);
  return response.data;
}
