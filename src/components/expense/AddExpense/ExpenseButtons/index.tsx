import type { SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { Button } from '@/components/common/Button';

interface Props {
  onBack: () => void;
  onAddExpense: (e: SyntheticEvent) => void;
}

export function ExpenseButton({ onBack, onAddExpense }: Props) {
  return (
    <div className={styles.container}>
      <Button $cancel onClick={onBack}>
        취소하기
      </Button>
      <Button $submit onClick={onAddExpense}>
        저장하기
      </Button>
    </div>
  );
}
