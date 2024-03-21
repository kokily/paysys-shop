import type { Bill } from '@prisma/client';
import type { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { Search } from '@/components/common/Search';
import { FrontsContents } from './FrontsContents';

interface Props {
  fronts: Array<Bill>;
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: SyntheticEvent) => void;
  onReadFront: (id: string) => void;
  onUsersList: (usersId: string) => void;
  onHallList: (hall: string) => void;
  setTarget: Dispatch<SetStateAction<HTMLElement | null | undefined>>;
}

export function ListFronts(props: Props) {
  return (
    <div className={styles.container}>
      <h2>프런트 전표 현황</h2>

      <Search
        mode="제목"
        search={props.search}
        onChange={props.onChange}
        onSearch={props.onSearch}
      />

      <FrontsContents
        fronts={props.fronts}
        onReadFront={props.onReadFront}
        onUsersList={props.onUsersList}
        onHallList={props.onHallList}
      />

      <div ref={props.setTarget} />
    </div>
  );
}
