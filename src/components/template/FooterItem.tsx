"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  icon: string;
  name: string;
};

export default function FooterItem({ href, icon, name }: Props) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`hover:bg[#c3fae8] dark:hover:bg-line/40 flex w-[20%] flex-grow flex-col items-center justify-center overflow-hidden whitespace-nowrap transition-colors ${
        active ? "text-member" : "text-text"
      }`}
    >
      <span className="material-icons test-[22px]">{icon}</span>
      <span className="text-xs">{name}</span>
    </Link>
  );
}
