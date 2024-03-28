import type { Wedding } from '@prisma/client';
import styles from './styles.module.scss';
import { WeddingTitle } from './WeddingTitle';
import { Modal } from '@/components/common/Modal';
import { WeddingButtons } from './WeddingButtons';
import { WeddingResult } from './WeddingResult';
import { First } from './WeddingContents/First';
import { Second } from './WeddingContents/Second';

interface Props {
  id: string;
  wedding: Wedding;
  onBack: () => void;
  onUpdateWedding: () => void;
  onRemoveSign: (sex: string) => void;
  weddingModal: ModalType;
  refetch: any;
}

export function ReadWedding(props: Props) {
  const modal = props.weddingModal;

  return (
    <>
      <h2 className={styles.title}>웨딩전표 세부현황</h2>

      <div className={styles.container}>
        <WeddingTitle
          id={props.id}
          wedding={props.wedding}
          onRemoveSign={props.onRemoveSign}
          refetch={props.refetch}
        />

        <div className={styles.contents}>
          <First wedding={props.wedding} />
          <Second wedding={props.wedding} />
        </div>

        <div className={styles.contents}>
          <WeddingResult wedding={props.wedding} />
        </div>

        <WeddingButtons
          onBack={props.onBack}
          onRemoveClick={modal.onModalClick}
          onUpdateWedding={props.onUpdateWedding}
        />
      </div>

      <Modal
        visible={modal.modal}
        title="웨딩 삭제"
        content="정말 삭제하시나요?"
        onConfirm={modal.onConfirm}
        onCancel={modal.onCancel}
      />
    </>
  );
}
