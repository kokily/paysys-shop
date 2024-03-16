'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ActiveLink } from '../../ActiveLink';
import styles from './styles.module.scss';

interface Props {
  href: string;
  icon: string;
  name: string;
}

export function NavItem({ href, icon, name }: Props) {
  const target = usePathname().substring(1);

  return (
    <ActiveLink href={href} activeClassName="active">
      <div
        className={clsx(styles.anchor, {
          [styles.active]: href.substring(1) === target,
        })}
      >
        <i className="material-icons">{icon}</i>
        {name}
      </div>
    </ActiveLink>
  );
}
