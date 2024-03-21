import type { SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { Button } from '@/components/common/Button';

interface Props {
  onBack: () => void;
  onAddReserve: (e: SyntheticEvent) => void;
}

export function ReserveButtons({ onBack, onAddReserve }: Props) {
  return (
    <div className={styles.container}>
      <Button $cancel onClick={onBack}>
        취 소
      </Button>
      <Button $submit onClick={onAddReserve}>
        확 인
      </Button>
    </div>
  );
}
