import { useState } from 'react';

interface Props {
  onRemove: () => void;
}

export function useRemoveModal({ onRemove }: Props) {
  const [modal, setModal] = useState(false);

  const onModalClick = () => {
    setModal(true);
  };

  const onConfirm = () => {
    onRemove();
    setModal(false);
  };

  const onCancel = () => {
    setModal(false);
  };

  return {
    modal,
    onModalClick,
    onConfirm,
    onCancel,
  };
}
