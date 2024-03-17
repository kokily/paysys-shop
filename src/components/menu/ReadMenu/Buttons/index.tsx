import type { SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { Button } from '@/components/common/Button';

interface Props {
  onBack: () => void;
  onAddCart: (e: SyntheticEvent) => void;
}

export function Buttons({ onBack, onAddCart }: Props) {
  return (
    <div className={styles.container}>
      <Button $cancel onClick={onBack}>
        취소하기
      </Button>
      <Button $submit onClick={onAddCart}>
        전표전송
      </Button>
    </div>
  );
}
