import type { ChangeEvent, SyntheticEvent, KeyboardEvent } from 'react';
import styles from './styles.module.scss';
import { ModalLink } from './ModalLink';
import { AuthButton } from './AuthButton';
import { AuthInput } from './AuthInput';

interface Props {
  username: string;
  password: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onLogin: (e: SyntheticEvent) => void;
}

export function LoginForm({ username, password, onChange, onLogin }: Props) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onLogin(e);
    }
  };

  return (
    <div className={styles.login_form}>
      <AuthInput
        type="text"
        name="username"
        value={username}
        onChange={onChange}
        label="성 명"
      />

      <AuthInput
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        label="비밀번호"
        onKeyDown={onKeyDown}
      />

      <AuthButton onLogin={onLogin} />

      <ModalLink />
    </div>
  );
}
