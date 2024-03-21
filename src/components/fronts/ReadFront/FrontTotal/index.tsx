import type { Bill } from '@prisma/client';
import styles from './styles.module.scss';
import { unitOfAccount } from '@/helpers/client/utils/conversionUnit';

interface Props {
  front: Bill;
}

export function FrontTotal({ front }: Props) {
  return (
    <div className={styles.container}>
      {front.reserve ? (
        <>
          <div className={styles.pane}>
            총 금액 :{' '}
            <span style={{ color: 'grey', fontSize: '1.5rem' }}>
              {unitOfAccount(front.totalAmount, '원')}
            </span>
          </div>
          <div className={styles.pane}>
            예약금 :{' '}
            <span className={styles.reserve}>
              {unitOfAccount(front.reserve, '원')}
            </span>
          </div>
          <div className={styles.pane}>
            결제금액 :{' '}
            <span style={{ color: 'blue', fontSize: '2rem' }}>
              {unitOfAccount(front.totalAmount - front.reserve, '원')}
            </span>
          </div>
        </>
      ) : (
        <div className={styles.pane}>
          결제금액 :{' '}
          <span style={{ color: 'blue', fontSize: '2rem' }}>
            {unitOfAccount(front.totalAmount, '원')}
          </span>
        </div>
      )}
    </div>
  );
}
