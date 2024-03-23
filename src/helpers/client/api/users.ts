import qs from 'qs';
import client from './client';

export async function listUsersAPI(queries: ListUsersQueries) {
  const queryString = qs.stringify(queries);
  const response = await client.get<Array<SerializedUser>>(`/users?${queryString}`);
  return response.data;
}

export async function readUserAPI(id: string) {
  const response = await client.get<SerializedUser>(`/users/${id}`);
  return response.data;
}

export async function removeUserAPI(id: string) {
  const response = await client.delete(`/users/remove/${id}`);
  return response.data;
}

export async function employeeUserAPI(id: string) {
  const response = await client.patch<SerializedUser>(`/users/employee/${id}`);
  return response.data;
}
