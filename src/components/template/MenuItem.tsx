import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
};

export default function MenuItem({ children, onClick, href }: Props) {
  const className =
    "block w-full px-4 py-3 text-left font-medium leading-normal text-text hover:bg-member hover:text-white";

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}
