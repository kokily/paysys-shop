import type { ChangeEvent, KeyboardEvent } from 'react';
import styles from './styles.module.scss';

interface Props {
  focus?: boolean;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  onKeyDown?: (e: KeyboardEvent) => void;
}

export function ItemInput(props: Props) {
  return (
    <div className={styles.container}>
      {props.focus ? (
        <input
          className={styles.input}
          type="text"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          required
          autoFocus
        />
      ) : (
        <input
          className={styles.input}
          type="text"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          required
          onKeyDown={props.onKeyDown}
        />
      )}
      <span className={styles.bar} />
      <label htmlFor={props.name}>{props.label}</label>
    </div>
  );
}
