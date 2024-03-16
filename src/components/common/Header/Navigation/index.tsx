'use client';

import { signOut } from 'next-auth/react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { NavItem } from './NavItem';

interface Props {
  menuOpen: boolean;
  isAdmin: boolean;
}

export function Navigation({ menuOpen, isAdmin }: Props) {
  const onLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <nav
      className={clsx(styles.container, {
        [styles.visible]: menuOpen,
        [styles.unvisible]: !menuOpen,
      })}
    >
      <div className={styles.contents}>
        <NavItem href="/password">비밀번호 변경</NavItem>

        {isAdmin && (
          <>
            <div className={styles.split} />

            <NavItem href="/weddings">웨딩빌지</NavItem>
            <NavItem href="/items">품목 리스트</NavItem>

            <div className={styles.split} />

            <NavItem href="/users">사용자 리스트</NavItem>
          </>
        )}

        <div className={styles.split} />

        <NavItem onClick={onLogout}>로그아웃</NavItem>
      </div>
    </nav>
  );
}
