'use client';

import { Modal } from '@/components/common/Modal';
import { ReadItem } from '@/components/items/ReadItem';
import { useReadItem } from '@/helpers/client/hooks/items/useReadItem';

export default function ReadItemPage({ params }: { params: { id: string } }) {
  const props = useReadItem({ id: params.id });
  const removeModal = props.itemModal;

  return (
    <>
      {props.item ? (
        <ReadItem
          item={props.item}
          onBack={props.onBack}
          onUpdateItemPage={props.onUpdateItemPage}
          onModalClick={removeModal.onModalClick}
        />
      ) : (
        <div>Loading</div>
      )}

      <Modal
        visible={removeModal.modal}
        title="품목 삭제"
        content="정말 삭제하시나요?"
        onConfirm={removeModal.onConfirm}
        onCancel={removeModal.onCancel}
      />
    </>
  );
}
