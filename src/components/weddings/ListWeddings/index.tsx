import type { Wedding } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { WeddingSearch } from './WeddingSearch';
import { WeddingsTable } from './WeddingsTable';

interface Props {
  weddings: Array<Wedding>;
  search: string;
  select: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  onSearch: (e: SyntheticEvent) => void;
  onReadWedding: (id: string) => void;
  setTarget: TargetType;
}

export function ListWeddings(props: Props) {
  return (
    <div className={styles.container}>
      <h2>웨딩 빌지목록</h2>

      <WeddingSearch
        search={props.search}
        select={props.select}
        onChange={props.onChange}
        onChangeSelect={props.onChangeSelect}
        onSearch={props.onSearch}
      />

      <WeddingsTable
        weddings={props.weddings}
        onReadWedding={props.onReadWedding}
        setTarget={props.setTarget}
      />
    </div>
  );
}
