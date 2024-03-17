import type { ChangeEvent } from 'react';
import styles from './styles.module.scss';

interface Props {
  name: string;
  value: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  small?: boolean;
}

export function CartInput(props: Props) {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        required
      />
      <span className={styles.bar} />
      <label className={styles.label} htmlFor={props.name}>
        {props.label} {props.small && <small>*필수</small>}
      </label>
    </div>
  );
}
