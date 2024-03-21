'use client';

import { ViewCart } from '@/components/cart/ViewCart';
import { Modal } from '@/components/common/Modal';
import { useViewCart } from '@/helpers/client/hooks/cart/useViewCart';

export default function ViewCartPage() {
  const props = useViewCart();
  const { modal, onConfirm, onCancel } = props.removeCartModal;

  return (
    <>
      <ViewCart {...props} />
      <Modal
        visible={modal}
        title="카트 전체 삭제"
        content="삭제하시려면 확인을 눌러주세요"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
}
