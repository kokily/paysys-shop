import { NativeType } from "@/lib/data/native";
import Link from "next/link";
import ThemeToggle from "../theme/ThemeToggle";
import UserMenu from "./UserMenu";

type Props = {
  native: NativeType;
  username: string;
  admin: boolean;
};

export default function Header({ native, username, admin }: Props) {
  const logoColor =
    native === "member"
      ? "text-member"
      : native === "associate"
        ? "text-associate"
        : "text-general";

  return (
    <header
      className="fixed top-0 z-20 w-full print:hidden"
      style={{ boxShadow: "var(--shadow-2)" }}
    >
      <div className="bg-surface flex justify-center">
        <div className="relative flex h-[55px] w-full max-w-[1200px] items-center px-4 md:w-[992px] lg:w-[1200px]">
          <Link
            href={`/${native}`}
            className={`hover:text-shadow text-[1.4rem] font-bold tracking-[2px] ${logoColor}`}
          >
            행사전표시스템
          </Link>
        </div>

        <div className="flex-grow" />

        <div className="flex items-center gap-3">
          <ThemeToggle variant="inline" />
          <UserMenu admin={admin} />
        </div>
      </div>
    </header>
  );
}
