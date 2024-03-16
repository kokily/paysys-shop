import type { SyntheticEvent } from 'react';
import styles from './styles.module.scss';

interface Props {
  onLogin: (e: SyntheticEvent) => void;
}

export function AuthButton({ onLogin }: Props) {
  return (
    <button onClick={onLogin} className={styles.button}>
      <div className={styles.layer}>어서오세요</div>로 그 인
    </button>
  );
}
