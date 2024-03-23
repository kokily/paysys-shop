import type { SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { UserButtons } from './UserButtons';
import { UserContents } from './UserContents';

interface Props {
  user: SerializedUser;
  onBack: () => void;
  onSetIdentity: (e: SyntheticEvent) => void;
  onModalClick: () => void;
}

export function ReadUser({ user, onBack, onSetIdentity, onModalClick }: Props) {
  return (
    <div className={styles.container}>
      <h2>사용자 상세보기</h2>

      <div className={styles.down_border} />

      <UserButtons
        isAdmin={user.admin}
        onBack={onBack}
        onSetIdentity={onSetIdentity}
        onModalOpen={onModalClick}
      />

      <UserContents user={user} />
    </div>
  );
}
