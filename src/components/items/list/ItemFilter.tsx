"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ITEM_DIVIDES, ITEM_NATIVES } from "@/lib/data/item";

type Props = {
  initialName?: string;
  initialDivide?: string;
  initialNative?: string;
};

/** 품명 검색, Divide/Native 필터 */
export default function ItemsFilter({
  initialName = "",
  initialDivide = "",
  initialNative = "",
}: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialName);

  function push(next: { name?: string; divide?: string; native?: string }) {
    const qs = new URLSearchParams();
    const n = next.name ?? name;
    const d = next.divide ?? initialDivide;
    const nat = next.native ?? initialNative;

    if (n.trim()) qs.set("name", n.trim());
    if (d) qs.set("divide", d);
    if (nat) qs.set("native", nat);

    router.push(qs.toString() ? `/items?${qs}` : "/items");
  }

  return (
    <div className="my-4 flex w-full max-w-[720px] flex-col items-center gap-3">
      <div className="flex w-[320px] overflow-hidden rounded-[10px] bg-[rgba(103,153,255,0.12)] p-[5px]">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") push({ name });
          }}
          placeholder="품명 검색"
          className="h-10 w-[250px] rounded-l-[3px] border-0 bg-[#3bc9db] px-[5px] py-[10px] text-base text-white outline-none placeholder:text-[#f8fafc] focus:bg-white focus:text-[#3bc9db]"
        />
        <button
          type="button"
          onClick={() => push({ name })}
          className="h-10 w-[60px] rounded-r-[3px] border-0 border-l border-white bg-[#3bc9db] text-base text-white"
        >
          검색
        </button>
      </div>
      <div className="flex w-full flex-wrap justify-center gap-2">
        <select
          value={initialNative}
          onChange={(e) => push({ native: e.target.value, name })}
          className="border-line bg-surface text-text rounded border px-3 py-2 text-sm"
        >
          <option value="">분류 전체</option>
          {ITEM_NATIVES.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <select
          value={initialDivide}
          onChange={(e) => push({ divide: e.target.value, name })}
          className="border-line bg-surface text-text max-w-[220px] rounded border px-3 py-2 text-sm"
        >
          <option value="">구분 전체</option>
          {ITEM_DIVIDES.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        {(initialName || initialDivide || initialNative) && (
          <button
            type="button"
            onClick={() => router.push("/items")}
            className="border-line text-text-secondary hover:text-text rounded border px-3 py-2 text-sm"
          >
            필터 초기
          </button>
        )}
      </div>
    </div>
  );
}
