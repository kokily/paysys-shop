import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import styles from './styles.module.scss';

interface Props {
  reserve: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddReserve: (e: SyntheticEvent) => void;
}

export function ReserveTable({ reserve, onChange, onAddReserve }: Props) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddReserve(e);
    }
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th className={styles.table_head}>금 액</th>
            <td>
              <input
                className={styles.input}
                type="text"
                name="reserve"
                value={reserve}
                onChange={onChange}
                onKeyDown={onKeyDown}
                autoFocus
                required
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
