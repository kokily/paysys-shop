import type { ChangeEvent, SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { ReserveTable } from './ReserveTable';
import { ReserveButtons } from './ReserveButtons';

interface Props {
  reserve: string;
  onBack: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddReserve: (e: SyntheticEvent) => void;
}

export function AddReserve({ reserve, onBack, onChange, onAddReserve }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.logo_box}>
        <h2>예약금 추가</h2>
      </div>

      <ReserveTable
        reserve={reserve}
        onChange={onChange}
        onAddReserve={onAddReserve}
      />

      <ReserveButtons onBack={onBack} onAddReserve={onAddReserve} />
    </div>
  );
}
