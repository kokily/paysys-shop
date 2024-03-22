import type { Item } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { Search } from '@/components/common/Search';
import { Button } from '@/components/common/Button';
import { ItemsTable } from './ItemsTable';

interface Props {
  items: Array<Item>;
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: SyntheticEvent) => void;
  onReadItem: (id: string) => void;
  setTarget: TargetType;
}

export function ListItems(props: Props) {
  return (
    <div className={styles.container}>
      <Search
        mode="품명"
        search={props.search}
        onChange={props.onChange}
        onSearch={props.onSearch}
      />

      <Link href="/items/add">
        <Button $submit>품목 추가</Button>
      </Link>

      <ItemsTable items={props.items} onReadItem={props.onReadItem} />

      <div ref={props.setTarget} />
    </div>
  );
}
