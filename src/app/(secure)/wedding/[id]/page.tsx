'use client';

import { ReadWedding } from '@/components/weddings/ReadWedding';
import { useReadWedding } from '@/helpers/client/hooks/weddings/useReadWedding';

export default function ReadWeddingPage({ params }: { params: { id: string } }) {
  const props = useReadWedding({ id: params.id });

  return props.wedding ? (
    <ReadWedding
      id={params.id}
      wedding={props.wedding}
      onBack={props.onBack}
      onUpdateWedding={props.onUpdateWedding}
      onRemoveSign={props.onRemoveSign}
      weddingModal={props.weddingModal}
      refetch={props.refetch}
    />
  ) : (
    <div>Loading</div>
  );
}
