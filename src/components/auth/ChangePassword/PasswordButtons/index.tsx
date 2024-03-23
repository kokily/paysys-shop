import type { SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { Button } from '@/components/common/Button';

interface Props {
  onBack: () => void;
  onChangePassword: (e: SyntheticEvent) => void;
}

export function PasswordButtons({ onBack, onChangePassword }: Props) {
  return (
    <div className={styles.container}>
      <Button $cancel onClick={onBack}>
        취 소
      </Button>
      <Button $submit onClick={onChangePassword}>
        확 인
      </Button>
    </div>
  );
}
