"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ITEM_DIVIDES } from "@/lib/data/item";

type Props = {
  initialDivides: string[];
  initialFrom: string;
  initialTo: string;
};

/** 품류 멀티 선택 + 기간 */
export default function StatsFilter({
  initialDivides,
  initialFrom,
  initialTo,
}: Props) {
  const router = useRouter();
  const [divides, setDivides] = useState<string[]>(initialDivides);
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);

  const allSelected = divides.length === ITEM_DIVIDES.length;

  function toggle(divide: string) {
    setDivides((prev) =>
      prev.includes(divide)
        ? prev.filter((d) => d !== divide)
        : ITEM_DIVIDES.filter((d) => d === divide || prev.includes(d)),
    );
  }

  function search() {
    const qs = new URLSearchParams();
    for (const d of divides) qs.append("divide", d);
    if (from) qs.set("from", from);
    if (to) qs.set("to", to);
    router.push(`/stats?${qs}`);
  }

  return (
    <div className="my-4 flex w-full max-w-[720px] flex-col items-center gap-3">
      <div className="flex w-full flex-wrap justify-center gap-2">
        {ITEM_DIVIDES.map((d) => {
          const on = divides.includes(d);
          return (
            <button
              key={d}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(d)}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                on
                  ? "border-member bg-member font-semibold text-white"
                  : "border-line bg-surface text-text hover:border-member"
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setDivides(allSelected ? [] : [...ITEM_DIVIDES])}
        className="text-text-secondary hover:text-text text-sm underline"
      >
        {allSelected ? "전체 해제" : "전체 선택"}
      </button>

      <div className="flex w-full flex-wrap items-center justify-center gap-2">
        <input
          type="date"
          value={from}
          max={to || undefined}
          onChange={(e) => setFrom(e.target.value)}
          className="border-line bg-surface text-text rounded border px-3 py-2 text-sm"
          aria-label="시작일자"
        />
        <span className="text-text-secondary">~</span>
        <input
          type="date"
          value={to}
          min={from || undefined}
          onChange={(e) => setTo(e.target.value)}
          className="border-line bg-surface text-text rounded border px-3 py-2 text-sm"
          aria-label="종료일자"
        />
        <button
          type="button"
          onClick={search}
          disabled={divides.length === 0 || !from || !to}
          className="border-error text-error hover:bg-error rounded-md border px-4 py-2 text-sm font-bold transition hover:text-white disabled:pointer-events-none disabled:opacity-40"
        >
          조 회
        </button>
      </div>
    </div>
  );
}
