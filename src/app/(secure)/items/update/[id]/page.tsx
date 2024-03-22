'use client';

import { AddItem } from '@/components/items/AddItem';
import { useAddItem } from '@/helpers/client/hooks/items/useAddItem';

export default function UpdateItemPage({ params }: { params: { id: string } }) {
  const props = useAddItem({ id: params.id });

  return <AddItem {...props} id={params.id} />;
}
