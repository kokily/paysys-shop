import type { ChangeEvent, KeyboardEvent } from 'react';
import styles from './styles.module.scss';

interface Props {
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  label: string;
}

export function AuthInput(props: Props) {
  return (
    <div className={styles.container}>
      <input {...props} className={styles.input} required />
      <span className={styles.bar} />
      <label className={styles.label} htmlFor={props.name}>
        {props.label}
      </label>
    </div>
  );
}
