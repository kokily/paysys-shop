import type { Bill } from '@prisma/client';
import styles from './styles.module.scss';
import { TableItem } from './TableItem';

interface Props {
  front: Bill;
}

export function FrontTable({ front }: Props) {
  return (
    <table className={styles.container}>
      <thead>
        <tr>
          <th>구분</th>
          <th>상품명</th>
          <th>단가</th>
          <th>수량</th>
          <th>소계</th>
        </tr>
      </thead>

      <tbody>
        {front.items === null || front.items.length === 0 ? (
          <tr>
            <td colSpan={5}>데이터가 없습니다.</td>
          </tr>
        ) : (
          <>
            {front.items.map((item: any) => (
              <TableItem key={item.id} item={item} />
            ))}
          </>
        )}
      </tbody>
    </table>
  );
}
