import type { ChangeEvent, SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { Search } from '@/components/common/Search';
import { UsersTable } from './UsersTable';

interface Props {
  users: Array<SerializedUser>;
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: SyntheticEvent) => void;
  onReadUser: (id: string) => void;
  setTarget: TargetType;
}

export function ListUsers(props: Props) {
  return (
    <div className={styles.container}>
      <h2>사용자 목록</h2>

      <Search
        mode="성명"
        search={props.search}
        onChange={props.onChange}
        onSearch={props.onSearch}
      />

      <UsersTable users={props.users} onReadUser={props.onReadUser} />
    </div>
  );
}
