'use client';

import { AddReserve } from '@/components/fronts/AddReserve';
import { useAddReserve } from '@/helpers/client/hooks/fronts/useAddReserve';

export default function AddReservePage({ params }: { params: { id: string } }) {
  const props = useAddReserve({ id: params.id });

  return <AddReserve {...props} />;
}
