'use client';

import { ListMenu } from '@/components/menu/ListMenu';
import { useListMenu } from '@/helpers/client/hooks/menu/useListMenu';

export default function ListMenuPage() {
  const props = useListMenu();

  return <ListMenu {...props} />;
}
