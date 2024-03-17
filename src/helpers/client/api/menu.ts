import type { Item } from '@prisma/client';
import qs from 'qs';
import client from './client';

export async function listMenuAPI(queries: ListMenuQueries) {
  const queryString = qs.stringify(queries);
  const response = await client.get<Array<Item>>(`/menu?${queryString}`);
  return response.data;
}

export async function readMenuAPI(id: string) {
  const response = await client.get<Item>(`/menu/${id}`);
  return response.data;
}
