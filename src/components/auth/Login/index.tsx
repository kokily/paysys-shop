import type { ChangeEvent, SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { LoginForm } from './LoginForm';

interface Props {
  username: string;
  password: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onLogin: (e: SyntheticEvent) => void;
}

export function Login(props: Props) {
  return (
    <div className={styles['login-container']}>
      <div className={styles['login-logo']}>
        <Link href="/" className={styles['login-link']}>
          로그인
        </Link>
      </div>

      <LoginForm {...props} />
    </div>
  );
}
