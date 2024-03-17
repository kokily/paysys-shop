import { Button } from '../Button';
import styles from './styles.module.scss';

interface Props {
  visible: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function Modal({ visible, title, content, onConfirm, onCancel }: Props) {
  if (!visible) return null;

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <h2>{title}</h2>
        <p>{content}</p>

        <div className={styles.buttons_box}>
          <Button $cancel onClick={onCancel}>
            취소
          </Button>
          <Button $submit onClick={onConfirm}>
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
