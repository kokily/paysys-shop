import type { Item } from '@prisma/client';
import qs from 'qs';
import client from './client';

export async function listItemsAPI(queries: ListItemsQueries) {
  const queryString = qs.stringify(queries);
  const response = await client.get<Array<Item>>(`/items?${queryString}`);
  return response.data;
}

export async function readItemAPI(id: string) {
  const response = await client.get<Item>(`/items/${id}`);
  return response.data;
}

export async function addItemAPI(payload: AddItemPayload) {
  const response = await client.post<Item>('/items/add', payload);
  return response.data;
}

export async function removeItemAPI(id: string) {
  const response = await client.delete(`/items/remove/${id}`);
  return response.data;
}

export async function updateItemAPI({
  id,
  payload,
}: {
  id: string;
  payload: AddItemPayload;
}) {
  const response = await client.patch<Item>(`/items/update/${id}`, payload);
  return response.data;
}
