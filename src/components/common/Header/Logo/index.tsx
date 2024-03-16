'use client';

import Link from 'next/link';
import localFont from 'next/font/local';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { usePathname } from 'next/navigation';

const nanumBolic = localFont({
  src: '../../../../../public/fonts/NanumGothic-Bold.ttf',
  display: 'swap',
});

export function HeaderLogo() {
  const link = usePathname().split('/')[1];

  return (
    <Link href="/">
      <button
        className={clsx(nanumBolic.className, styles.content, {
          [styles.soldier]: link === 'soldier',
          [styles.reserve]: link === 'reserve',
          [styles.general]: link === 'general',
          [styles.cart]: link === 'cart',
          [styles.fronts]: link === 'fronts',
          [styles.password]: link === 'password',
          [styles.weddings]: link === 'weddings',
        })}
      >
        행사전표시스템
      </button>
    </Link>
  );
}
