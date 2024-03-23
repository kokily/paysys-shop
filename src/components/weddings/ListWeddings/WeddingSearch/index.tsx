import type { ChangeEvent, SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { Search } from '@/components/common/Search';

interface Props {
  select: string;
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  onSearch: (e: SyntheticEvent) => void;
}

export function WeddingSearch(props: Props) {
  let mode = '';

  switch (props.select) {
    case 'husband':
      mode = '신랑이름';
      break;
    case 'bride':
      mode = '신부이름';
      break;
    default:
      mode = '신랑이름';
      break;
  }

  return (
    <div className={styles.container}>
      <select
        className={styles.select}
        value={props.select}
        onChange={props.onChangeSelect}
      >
        <option value="husband">신랑이름</option>
        <option value="bride">신부이름</option>
      </select>

      <Search
        mode={`${mode}`}
        search={props.search}
        onChange={props.onChange}
        onSearch={props.onSearch}
        $short
      />
    </div>
  );
}
