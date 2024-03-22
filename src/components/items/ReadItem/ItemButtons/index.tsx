import { Button } from '@/components/common/Button';
import styles from './styles.module.scss';

interface Props {
  onBack: () => void;
  onUpdate: () => void;
  onModalOpen: () => void;
}

export function ItemButtons({ onBack, onUpdate, onModalOpen }: Props) {
  return (
    <div className={styles.container}>
      <Button $submit onClick={onBack}>
        목록
      </Button>
      <Button $edit onClick={onUpdate}>
        수정
      </Button>
      <Button $cancel onClick={onModalOpen}>
        삭제
      </Button>
    </div>
  );
}
