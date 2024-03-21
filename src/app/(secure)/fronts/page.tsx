'use client';

import { ListFronts } from '@/components/fronts/ListFronts';
import { useListFronts } from '@/helpers/client/hooks/fronts/useListFronts';

export default function ListFrontsPage() {
  const props = useListFronts();

  return <ListFronts {...props} />;
}
