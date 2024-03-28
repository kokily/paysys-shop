import styles from './styles.module.scss';
import { SignCanvas } from '@/components/common/SignCanvas';
import { Button } from '@/components/common/Button';

interface Props {
  visible: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function AddSign({ visible, title, onConfirm, onCancel }: Props) {
  if (!visible) return null;

  return (
    <div className={styles.container}>
      <div className={styles.sign_box}>
        <h2>{title}</h2>

        <SignCanvas width={320} height={240} />

        <div className={styles.buttons}>
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
