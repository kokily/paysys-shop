import client from './client';

export async function loginAPI(payload: AuthPayload) {
  const response = await client.post<SerializedUser>('/api/auth/login', payload);
  return response.data;
}

export async function changePasswordAPI(payload: PasswordPayload) {
  const response = await client.post<SerializedUser>('/auth/password', payload);
  return response.data;
}
