import type { Bill } from '@prisma/client';
import type { SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { FrontHeader } from './FrontHeader';
import { FrontEtc } from './FrontEtc';
import { FrontTotal } from './FrontTotal';
import { FrontTable } from './FrontTable';
import { FrontButton } from './FrontButtons';

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

export function ReadFront(props: Props) {
  const front = props.front;

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <FrontHeader front={front} />
        <FrontTable front={front} />

        {front.etc !== '' && front.etc !== ' ' && <FrontEtc etc={front.etc} />}

        <hr />

        <FrontTotal front={front} />

        {props.userId && <FrontButton {...props} />}
      </div>
    </div>
  );
}
