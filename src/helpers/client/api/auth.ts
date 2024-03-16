import client from './client';

export async function loginAPI(payload: AuthPayload) {
  const response = await client.post<SerializedUser>('/api/auth/login', payload);
  return response.data;
}
