import styles from './styles.module.scss';
import { Button } from '@/components/common/Button';

interface Props {
  onBack: () => void;
  onUpdateWedding: () => void;
  onRemoveClick: () => void;
}

export function WeddingButtons(props: Props) {
  return (
    <div className={styles.container}>
      <Button $menu onClick={props.onBack}>
        목록
      </Button>
      <Button $edit onClick={props.onUpdateWedding}>
        수정
      </Button>
      <Button $cancel onClick={props.onRemoveClick}>
        삭제
      </Button>
    </div>
  );
}
