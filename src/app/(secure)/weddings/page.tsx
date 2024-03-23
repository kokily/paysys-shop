'use client';

import { ListWeddings } from '@/components/weddings/ListWeddings';
import { useListWeddings } from '@/helpers/client/hooks/weddings/useListWeddings';

export default function ListWeddingsPage() {
  const props = useListWeddings();

  return <ListWeddings {...props} />;
}
