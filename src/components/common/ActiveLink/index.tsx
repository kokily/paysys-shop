import type { ReactElement } from 'react';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  href: string;
  activeClassName: string;
  children: ReactElement;
}

export function ActiveLink({ href, activeClassName, children }: Props) {
  const pathname = usePathname();
  const child = React.Children.only(children);

  let className = child.props.className || '';

  if (pathname === href && activeClassName) {
    className = `${className} ${activeClassName}`.trim();
  }

  return (
    <Link href={href} passHref={true}>
      {React.cloneElement(child, { className })}
    </Link>
  );
}
