import type { Item } from '@prisma/client';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { unitOfAccount } from '@/helpers/client/utils/conversionUnit';

interface Props {
  item: Item;
}

export function ItemContent({ item }: Props) {
  const Table_head = ({ children }: { children: string }) => (
    <th
      className={clsx({
        [styles.soldier]: item.native === '현역',
        [styles.reserve]: item.native === '예비역',
        [styles.general]: item.native === '일반',
      })}
    >
      {children}
    </th>
  );

  const Table_data = ({ children }: { children: string }) => (
    <td
      className={clsx({
        [styles.soldier]: item.native === '현역',
        [styles.reserve]: item.native === '예비역',
        [styles.general]: item.native === '일반',
      })}
    >
      {children}
    </td>
  );

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody>
          <tr>
            <Table_head>품명</Table_head>
            <Table_data>{item.name}</Table_data>
          </tr>
          <tr>
            <Table_head>출신</Table_head>
            <Table_data>{item.native}</Table_data>
          </tr>
          <tr>
            <Table_head>구분</Table_head>
            <Table_data>{item.divide}</Table_data>
          </tr>
          <tr>
            <Table_head>단위</Table_head>
            <Table_data>{item.unit}</Table_data>
          </tr>
          <tr>
            <Table_head>단가</Table_head>
            <Table_data>{unitOfAccount(item.price, '원')}</Table_data>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
