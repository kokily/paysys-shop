import type { Wedding } from '@prisma/client';
import qs from 'qs';
import client from './client';

export async function listWeddingsAPI(queries: ListWeddingsQueries) {
  const queryString = qs.stringify(queries);
  const response = await client.get<Array<Wedding>>(`/weddings?${queryString}`);
  return response.data;
}

export async function readWeddingAPI(id: string) {
  const response = await client.get<Wedding>(`/weddings/${id}`);
  return response.data;
}

export async function removeWeddingAPI(id: string) {
  const response = await client.delete(`/weddings/remove/${id}`);
  return response.data;
}
