import type { PropsWithChildren } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

interface Props extends PropsWithChildren {
  href?: string;
  onClick?: () => void;
}

export function NavItem({ href, onClick, children }: Props) {
  const jsx = (
    <div className={styles.box} onClick={onClick}>
      {children}
    </div>
  );
  return href ? (
    <Link href={href} passHref={true}>
      <div className={styles.container}>{jsx}</div>
    </Link>
  ) : (
    jsx
  );
}
