import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import styles from './styles.module.scss';

interface Props {
  mode: string;
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: SyntheticEvent) => void;
}

export function Search(props: Props) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      props.onSearch(e);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <input
          type="text"
          name="search"
          className={styles.input}
          value={props.search}
          onChange={props.onChange}
          onKeyDown={onKeyDown}
          placeholder={`${props.mode}`}
        />
        <button className={styles.button} onClick={props.onSearch}>
          검색
        </button>
      </div>
    </div>
  );
}
