'use client';

import { AddItem } from '@/components/items/AddItem';
import { useAddItem } from '@/helpers/client/hooks/items/useAddItem';

export default function AddItemPage() {
  const props = useAddItem({});

  return <AddItem {...props} />;
}
