import type { Cart } from '@prisma/client';
import type { ChangeEvent, MouseEvent } from 'react';
import styles from './styles.module.scss';
import { Button } from '@/components/common/Button';
import { CartTop } from './CartTop';
import { CartTotal } from './CartTotal';
import { CartInput } from './CartInput';

interface Props {
  cart: Cart | undefined;
  title: string;
  hall: string;
  etc: string;
  totalAmount: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddBill: (e: MouseEvent) => void;
  onRemoveOneCart: (id: string, name: string) => void;
  removeCartModal: ModalType;
}

export function ViewCart(props: Props) {
  return (
    <div className={styles.container}>
      {props.cart ? (
        <>
          <CartTop cart={props.cart} onRemoveOne={props.onRemoveOneCart} />
          <CartTotal totalAmount={props.totalAmount} />
          <div className={styles.contents}>
            <div className={styles.center}>
              <CartInput
                name="title"
                value={props.title}
                label="행사명"
                onChange={props.onChange}
                small
              />
              <CartInput
                name="hall"
                value={props.hall}
                label="홀"
                onChange={props.onChange}
                small
              />
              <CartInput
                name="etc"
                value={props.etc}
                label="기타사항"
                onChange={props.onChange}
              />
            </div>

            <Button $submit onClick={props.onAddBill}>
              전송하기
            </Button>
            <Button $cancel onClick={props.removeCartModal.onModalClick}>
              전체삭제
            </Button>
          </div>
        </>
      ) : (
        <>등록된 내역이 없습니다.</>
      )}
    </div>
  );
}
