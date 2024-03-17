import type { Cart } from '@prisma/client';
import styles from './styles.module.scss';
import { unitOfAccount } from '@/helpers/client/utils/conversionUnit';
import { Button } from '@/components/common/Button';

interface Props {
  cart: Cart;
  onRemoveOne: (id: string, name: string) => void;
}

export function CartTop({ cart, onRemoveOne }: Props) {
  return (
    <>
      <h2>전표 확인(종합)</h2>

      <table className={styles.container}>
        <thead>
          <th className={styles.table_head}>적용</th>
          <th className={styles.table_head}>수량</th>
          <th className={styles.table_head}>단가</th>
          <th className={styles.table_head}>삭제</th>
        </thead>

        <tbody>
          {cart.items.map((item: any) => (
            <tr key={item.id}>
              <td className={styles.table_data}>
                [ {item.native} ]<br />
                {item.divide}
              </td>
              <td className={styles.table_data}>
                {unitOfAccount(item.count)} ({item.unit})
              </td>
              <td className={styles.table_data}>
                {unitOfAccount(item.price, '원')} /<br />
                <strong>{unitOfAccount(item.amount, '원')}</strong>
              </td>
              <td className={styles.table_data}>
                <Button
                  $cancel
                  $thin
                  onClick={() => onRemoveOne(item.id, item.name)}
                >
                  삭제
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
