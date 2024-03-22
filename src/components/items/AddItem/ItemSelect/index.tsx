import type { ChangeEvent } from 'react';
import styles from './styles.module.scss';

interface Props {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  data: string[];
}

export function ItemSelect({ name, value, onChange, data }: Props) {
  return (
    <div className={styles.container}>
      <select className={styles.select} name={name} value={value} onChange={onChange}>
        {data.map((divide, i) => (
          <option key={i} value={divide}>
            {divide}
          </option>
        ))}
      </select>
    </div>
  );
}
