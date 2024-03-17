import { unitOfAccount } from '@/helpers/client/utils/conversionUnit';
import styles from './styles.module.scss';

interface Props {
  totalAmount: number;
}

export function CartTotal({ totalAmount }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.total}>
        예상 결제금액 : <span>{unitOfAccount(totalAmount, '원 ')}</span>
      </div>
    </div>
  );
}
