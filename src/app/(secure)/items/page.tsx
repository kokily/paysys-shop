'use client';

import { ListItems } from '@/components/items/ListItems';
import { useListItems } from '@/helpers/client/hooks/items/useListItems';

export default function ListItemsPage() {
  const props = useListItems();

  return <ListItems {...props} />;
}
