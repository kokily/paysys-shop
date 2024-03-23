import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface Props {
  mode: string;
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: SyntheticEvent) => void;
  $short?: boolean;
}

export function Search(props: Props) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      props.onSearch(e);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={clsx(styles.contents, {
          [styles.short]: props.$short,
        })}
      >
        <input
          type="text"
          name="search"
          className={clsx(styles.input, {
            [styles.short]: props.$short,
          })}
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
