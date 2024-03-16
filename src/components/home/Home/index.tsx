import { HomeItem } from './HomeItem';
import styles from './styles.module.scss';

interface Props {
  menu: Array<MenuType>;
  link: string;
  onMenu: (divide: string) => void;
}

export function Home({ menu, link, onMenu }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        {menu.map((item) => (
          <HomeItem key={item.id} link={link} divide={item.divide} onMenu={onMenu} />
        ))}
      </div>
    </div>
  );
}
