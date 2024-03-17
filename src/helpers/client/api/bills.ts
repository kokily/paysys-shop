import type { Bill, Cart } from '@prisma/client';
import qs from 'qs';
import client from './client';

export async function listBillsAPI(queries: ListBillsQueries) {
  const queryString = qs.stringify(queries);
  const response = await client.get<Array<Bill>>(`/bills?${queryString}`);
  return response.data;
}

export async function readBillAPI(id: string) {
  const response = await client.get<Bill>(`/bills/${id}`);
  return response.data;
}

export async function addBillAPI(payload: AddBillPayload) {
  const response = await client.post<Bill>('/bills/add', payload);
  return response.data;
}

export async function removeBillAPI(id: string) {
  const response = await client.delete(`/bills/remove/${id}`);
  return response.data;
}

export async function restoreBillAPI(id: string) {
  const response = await client.patch<Cart>(`/bills/restore/${id}`);
  return response.data;
}

export async function addReserveAPI(payload: AddReservePayload) {
  const response = await client.post<Bill>('/reserve', payload);
  return response.data;
}

export async function removeReserveAPI(id: string) {
  const response = await client.delete<Bill>(`/reserve/remove/${id}`);
  return response.data;
}
