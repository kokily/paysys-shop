import clsx from 'clsx';
import styles from './styles.module.scss';
import { unitOfAccount } from '@/helpers/client/utils/conversionUnit';

interface Props {
  item: AddItemModel;
}

export function TableItem({ item }: Props) {
  return (
    <tr>
      <td
        className={clsx(styles.table_data, {
          [styles.soldier]: item.native === '현역',
          [styles.reserve]: item.native === '예비역',
          [styles.general]: item.native === '일반',
        })}
      >
        {item.native}
      </td>

      <td
        className={clsx(styles.table_data, {
          [styles.soldier]: item.native === '현역',
          [styles.reserve]: item.native === '예비역',
          [styles.general]: item.native === '일반',
        })}
      >
        {item.name}
      </td>

      <td
        className={clsx(styles.table_data, {
          [styles.soldier]: item.native === '현역',
          [styles.reserve]: item.native === '예비역',
          [styles.general]: item.native === '일반',
        })}
      >
        <span className={styles.price}>{unitOfAccount(item.price, '원')}</span>
      </td>

      <td
        className={clsx(styles.table_data, {
          [styles.soldier]: item.native === '현역',
          [styles.reserve]: item.native === '예비역',
          [styles.general]: item.native === '일반',
        })}
      >
        {item.count}
      </td>

      <td
        className={clsx(styles.table_data, styles.sub_total, {
          [styles.soldier]: item.native === '현역',
          [styles.reserve]: item.native === '예비역',
          [styles.general]: item.native === '일반',
        })}
      >
        {unitOfAccount(item.price * item.count, '원')}
      </td>
    </tr>
  );
}
