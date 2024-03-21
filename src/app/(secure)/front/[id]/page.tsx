'use client';

import { Modal } from '@/components/common/Modal';
import { ReadFront } from '@/components/fronts/ReadFront';
import { useReadFront } from '@/helpers/client/hooks/fronts/useReadFront';

export default function ReadFrontPage({ params }: { params: { id: string } }) {
  const props = useReadFront({ id: params.id });
  const modal = props.frontModal;

  return (
    <>
      {props.front && props.userId && (
        <ReadFront
          front={props.front}
          userId={props.userId}
          isAdmin={props.isAdmin}
          onBack={props.onBack}
          onRestoreBill={props.onRestoreBill}
          onAddReservePage={props.onAddReservePage}
          onRemoveReserve={props.onRemoveReserve}
          onModalClick={modal.onModalClick}
        />
      )}

      <Modal
        visible={modal.modal}
        title="빌지 삭제"
        content="정말 삭제하시나요?"
        onConfirm={modal.onConfirm}
        onCancel={modal.onCancel}
      />
    </>
  );
}
