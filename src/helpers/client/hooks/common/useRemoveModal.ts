import { type SyntheticEvent, useState } from 'react';

interface Props {
  onRemove: (e: SyntheticEvent) => void;
}

export function useRemoveModal({ onRemove }: Props) {
  const [modal, setModal] = useState(false);

  const onModalClick = () => {
    setModal(true);
  };

  const onConfirm = (e: SyntheticEvent) => {
    onRemove(e);
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
