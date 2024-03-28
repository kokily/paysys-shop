import type { ChangeEvent } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface Props {
  title: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function OneInput(props: Props) {
  return (
    <tr>
      <th>{props.title}</th>
      <td colSpan={3}>
        <input
          type="text"
          className={clsx(styles.one_input, styles.name)}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
      </td>
    </tr>
  );
}
