import type { Bill } from '@prisma/client';
import type { SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { Button } from '@/components/common/Button';

interface Props {
  front: Bill;
  userId: string;
  isAdmin: boolean | undefined;
  onBack: () => void;
  onRestoreBill: () => void;
  onAddReservePage: () => void;
  onRemoveReserve: (e: SyntheticEvent) => void;
  onModalClick: () => void;
}

export function FrontButton(props: Props) {
  const front = props.front;

  return (
    <div className={styles.container}>
      <div className={styles.button_box}>
        {(props.isAdmin || front.userId === props.userId) && (
          <>
            <Button $cancel onClick={props.onModalClick}>
              삭 제
            </Button>
            <Button $restore onClick={props.onRestoreBill}>
              수 정
            </Button>
          </>
        )}

        <Button $menu onClick={props.onBack}>
          목 록
        </Button>

        {props.isAdmin && (
          <>
            {!front.reserve || front.reserve === 0 ? (
              <Button $edit onClick={props.onAddReservePage}>
                + 예약금
              </Button>
            ) : (
              <Button $edit onClick={props.onRemoveReserve}>
                예약금 삭제
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
