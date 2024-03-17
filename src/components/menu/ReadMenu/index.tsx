import type { Item } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { Buttons } from './Buttons';
import { CartInputs } from './CartInputs';
import { CartTable } from './CartTable';

interface Props {
  menu: Item | undefined;
  count: string;
  price: string;
  onBack: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddCart: (e: SyntheticEvent) => void;
}

export function ReadMenu(props: Props) {
  return props.menu ? (
    <div className={styles.container}>
      <div
        className={clsx(styles.menu_logo, {
          [styles.soldier]: props.menu.native === '현역',
          [styles.reserve]: props.menu.native === '예비역',
          [styles.general]: props.menu.native === '일반',
        })}
      >
        {props.menu.divide} | {props.menu.native}
      </div>

      <div className={styles.contents}>
        <CartTable menu={props.menu} price={props.price} onChange={props.onChange} />

        <hr />

        <CartInputs
          menu={props.menu}
          price={props.price}
          count={props.count}
          onChange={props.onChange}
          onAddCart={props.onAddCart}
        />

        <Buttons onBack={props.onBack} onAddCart={props.onAddCart} />
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}
