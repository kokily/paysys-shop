import type { Wedding } from '@prisma/client';
import client from './client';

export async function addSignAPI(payload: AddSignPayload) {
  const response = await client.post<Wedding>('/sign', payload);
  return response.data;
}

export async function removeSignAPI({
  id,
  payload,
}: {
  id: string;
  payload: RemoveSignPayload;
}) {
  const response = await client.patch<Wedding>(`/sign/remove/${id}`, payload);
  return response.data;
}
