import { useState } from 'react';
import styles from './styles.module.scss';
import { Button } from '@/components/common/Button';

export function ModalLink() {
  const [isOpen, setIsOpen] = useState(false);

  const onClickModal = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onClickModal}>
        계정등록
      </button>

      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modal_contents}>
            <p>계정등록은 관리자에게 문의바랍니다.</p>

            <div className={styles.buttons_box}>
              <Button submit onClick={onClose}>
                닫 기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
