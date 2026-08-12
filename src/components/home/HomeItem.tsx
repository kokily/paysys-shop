"use client";

import { NativeType } from "@/lib/data/native";

type Props = {
  native: NativeType;
  divide: string;
  onSelect: (divide: string) => void;
};

export default function HomeItem({ native, divide, onSelect }: Props) {
  const colorClass =
    native === "member"
      ? "bg-member"
      : native === "associate"
        ? "bg-associate"
        : "bg-general";

  return (
    <button
      type="button"
      onClick={() => onSelect(divide)}
      className={`flex h-[55px] w-full flex-col items-center justify-center overflow-hidden text-[1.215rem] font-bold text-white brightness-90 transition hover:brightness-100 active:translate-y-[3px] ${colorClass}`}
    >
      {divide}
    </button>
  );
}
