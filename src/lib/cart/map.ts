import type { CartItem, CartRow } from "@/types/cart";

/** DB cart.items → CartRow */
export function toCartRow(cart: { id: string; items: unknown }): CartRow {
  const items = (cart.items as CartItem[] | null) ?? [];
  const totalAmount = items.reduce((sum, i) => sum + (i.amount ?? 0), 0);

  return { id: cart.id, items, totalAmount };
}
