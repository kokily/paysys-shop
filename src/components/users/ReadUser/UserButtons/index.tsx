import type { SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { useMobile } from '@/helpers/client/hooks/common/useMobile';
import { Button } from '@/components/common/Button';

interface Props {
  isAdmin: boolean;
  onBack: () => void;
  onSetIdentity: (e: SyntheticEvent) => void;
  onModalOpen: () => void;
}

export function UserButtons({ isAdmin, onBack, onSetIdentity, onModalOpen }: Props) {
  const isMobile = useMobile();

  return (
    <div className={styles.container}>
      <Button $menu onClick={onBack}>
        {isMobile ? '목록' : '목록으로'}
      </Button>
      <Button $cancel onClick={onModalOpen}>
        {isMobile ? '삭제' : '삭제하기'}
      </Button>
      <Button $edit onClick={onSetIdentity}>
        {isMobile ? (isAdmin ? '강등' : '승급') : isAdmin ? '강등하기' : '승급하기'}
      </Button>
    </div>
  );
}
