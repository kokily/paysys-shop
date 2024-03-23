'use client';

import { Modal } from '@/components/common/Modal';
import { ReadUser } from '@/components/users/ReadUser';
import { useReadUser } from '@/helpers/client/hooks/users/useReadUser';

export default function ReadUserPage({ params }: { params: { id: string } }) {
  const props = useReadUser({ id: params.id });
  const modal = props.userModal;

  return (
    <>
      {props.user && (
        <ReadUser
          user={props.user}
          onBack={props.onBack}
          onSetIdentity={props.onSetIdentity}
          onModalClick={modal.onModalClick}
        />
      )}
      <Modal
        visible={modal.modal}
        title="사용자 삭제"
        content="정말 삭제하시나요?"
        onConfirm={modal.onConfirm}
        onCancel={modal.onCancel}
      />
    </>
  );
}
