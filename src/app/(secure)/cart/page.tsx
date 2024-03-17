'use client';

import { ViewCart } from '@/components/cart/ViewCart';
import { useViewCart } from '@/helpers/client/hooks/cart/useViewCart';

export default function ViewCartPage() {
  const props = useViewCart();

  return <ViewCart {...props} />;
}
