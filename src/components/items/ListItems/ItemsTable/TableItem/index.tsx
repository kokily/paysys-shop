import type { Item } from '@prisma/client';
import styles from './styles.module.scss';
import { unitOfAccount } from '@/helpers/client/utils/conversionUnit';

interface Props {
  item: Item;
  onReadItem: (id: string) => void;
}

export function TableItem({ item, onReadItem }: Props) {
  return (
    <tr className={styles.table_row} onClick={() => onReadItem(item.id)}>
      <td>{item.divide}</td>
      <td>{item.native}</td>
      <td>{item.name}</td>
      <td>{item.unit}</td>
      <td>{unitOfAccount(item.price, '원')}</td>
    </tr>
  );
}
