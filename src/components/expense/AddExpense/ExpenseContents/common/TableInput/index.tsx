import type { ChangeEvent } from 'react';
import styles from './styles.module.scss';
import { unitOfAccount } from '@/helpers/client/utils/conversionUnit';

interface Props {
  title: string;
  husbandName: string;
  husbandValue: string;
  brideName: string;
  brideValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  unit: string;
}

export function TableInput(props: Props) {
  return (
    <tr>
      <th>{props.title}</th>
      <td>
        <input
          type="number"
          className={styles.table_input}
          name={props.husbandName}
          value={props.husbandValue}
          onChange={props.onChange}
        />
      </td>
      <td>
        <input
          type="number"
          className={styles.table_input}
          name={props.brideName}
          value={props.brideValue}
          onChange={props.onChange}
        />
      </td>
      <td>
        {unitOfAccount(
          parseInt(props.husbandValue) + parseInt(props.brideValue),
          props.unit,
        )}
      </td>
    </tr>
  );
}
