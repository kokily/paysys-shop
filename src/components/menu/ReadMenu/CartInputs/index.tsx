import type { Item } from '@prisma/client';
import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { unitOfAccount } from '@/helpers/client/utils/conversionUnit';

interface Props {
  menu: Item;
  price: string;
  count: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddCart: (e: SyntheticEvent) => void;
}

export function CartInputs(props: Props) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      props.onAddCart(e);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <label htmlFor="count">수 량</label>
        <input
          type="text"
          name="count"
          value={props.count}
          onChange={props.onChange}
          onKeyDown={onKeyDown}
          autoFocus
          required
        />
      </div>

      <div className={styles.total}>
        <h3>
          합계 금액:{' '}
          {props.menu.price === 0 ? (
            <>{unitOfAccount(parseInt(props.price) * parseInt(props.count), '원')}</>
          ) : (
            <>{unitOfAccount(props.menu.price * parseInt(props.count), '원')}</>
          )}
        </h3>
      </div>
    </>
  );
}
