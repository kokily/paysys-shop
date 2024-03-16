'use client';

import { useSession } from 'next-auth/react';
import styles from './styles.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HeaderLogo } from './Logo';
import { Apeach } from './Apeach';
import { Navigation } from './Navigation';

export function Header() {
  const { data } = useSession();
  const apeachRef = useRef<HTMLDivElement>(null);

  // Menu Toggle
  const [menuOpen, setMenuOpen] = useState(false);

  const onToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const onOutsideClick = useCallback((e: any) => {
    if (apeachRef.current && !apeachRef.current.contains(e.target as any)) {
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', onOutsideClick, true);

    return () => window.removeEventListener('click', onOutsideClick, true);
  }, [apeachRef]);

  return (
    <header className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.contents}>
          <HeaderLogo />

          <div className={styles.spacer} />

          <>
            <div ref={apeachRef}>
              <Apeach onClick={onToggleMenu} />
            </div>

            {data?.user && (
              <Navigation menuOpen={menuOpen} isAdmin={data.user.admin} />
            )}
          </>
        </div>
      </div>
    </header>
  );
}
