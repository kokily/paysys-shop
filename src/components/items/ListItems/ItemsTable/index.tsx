import type { Item } from '@prisma/client';
import styles from './styles.module.scss';
import { TableItem } from './TableItem';

interface Props {
  items: Array<Item>;
  onReadItem: (id: string) => void;
}

export function ItemsTable({ items, onReadItem }: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.table_head}>분류</th>
          <th className={styles.table_head}>구분</th>
          <th className={styles.table_head}>상품명</th>
          <th className={styles.table_head}>단위</th>
          <th className={styles.table_head}>단가</th>
        </tr>
      </thead>

      <tbody>
        {items.length > 0 ? (
          items.map((item) => (
            <TableItem key={item.id} item={item} onReadItem={onReadItem} />
          ))
        ) : (
          <tr>
            <td colSpan={5}>데이터가 없습니다.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
