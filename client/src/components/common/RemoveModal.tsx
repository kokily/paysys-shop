import React from 'react';
import Modal from './Modal';

interface RemoveModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const RemoveModal: React.FC<RemoveModalProps> = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      visible={visible}
      title="삭 제"
      content="정말 삭제하시겠습니까?"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default RemoveModal;
