import clsx from 'clsx';
import styles from './styles.module.scss';

interface Props {
  link: string;
  divide: string;
  onMenu: (divide: string) => void;
}

export function HomeItem({ link, divide, onMenu }: Props) {
  return (
    <div
      className={clsx(styles.item_container, {
        [styles.soldier]: link === 'soldier',
        [styles.reserve]: link === 'reserve',
        [styles.general]: link === 'general',
      })}
      onClick={() => onMenu(divide)}
    >
      {divide}
    </div>
  );
}
