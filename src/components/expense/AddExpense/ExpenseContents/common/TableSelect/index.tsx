import type { ChangeEvent } from 'react';
import styles from './styles.module.scss';

interface Props {
  title: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  data: {
    value: string;
    title: string;
  }[];
}

export function TableSelect(props: Props) {
  return (
    <tr>
      <th>{props.title}</th>
      <td colSpan={3} style={{ textAlign: 'center' }}>
        <select
          className={styles.table_select}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        >
          {props.data.map((item) => (
            <option key={item.title} value={item.value}>
              {item.title}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
}
