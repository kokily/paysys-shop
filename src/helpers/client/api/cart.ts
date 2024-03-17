import type { Cart } from '@prisma/client';
import client from './client';

export async function viewCartAPI() {
  const response = await client.get<Cart>('/cart');
  return response.data;
}

export async function addCartAPI(payload: AddCartPayload) {
  const response = await client.post<Cart>('/cart/add', payload);
  return response.data;
}

export async function removeCartAPI() {
  const response = await client.delete('/cart/remove');
  return response.data;
}

export async function removeOneCartAPI(itemId: string) {
  const response = await client.patch(`/cart/removeOne/${itemId}`);
  return response.data;
}
