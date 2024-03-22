import type { Item } from '@prisma/client';
import styles from './styles.module.scss';
import { ItemButtons } from './ItemButtons';
import { ItemContent } from './ItemContent';

interface Props {
  item: Item;
  onBack: () => void;
  onUpdateItemPage: () => void;
  onModalClick: () => void;
}

export function ReadItem(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <h3>품목 상세보기</h3>

        <div className={styles.down_border} />

        <ItemButtons
          onBack={props.onBack}
          onUpdate={props.onUpdateItemPage}
          onModalOpen={props.onModalClick}
        />

        <ItemContent item={props.item} />
      </div>
    </div>
  );
}
