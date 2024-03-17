import type { Item } from '@prisma/client';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { unitOfAccount } from '@/helpers/client/utils/conversionUnit';

interface Props {
  menu: Item;
  onReadMenu: (id: string) => void;
}

export function MenuItem({ menu, onReadMenu }: Props) {
  return (
    <div
      className={clsx(styles.container, {
        [styles.현역]: menu.native === '현역',
        [styles.예비역]: menu.native === '예비역',
        [styles.일반]: menu.native === '일반',
      })}
      onClick={() => onReadMenu(menu.id)}
    >
      {menu.name} | {unitOfAccount(menu.price, '원')}
    </div>
  );
}
