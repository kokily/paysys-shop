"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FiCalendar, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { addMonths, format } from "date-fns";
import { ko } from "react-day-picker/locale";
import { ko as koDateFns } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import CenterPicker from "./CenterPicker";
import "react-day-picker/style.css";

type Props = {
  value: string | null;
  onChange: (date: string | null) => void;
};

export default function WeddingDateFilter({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = value ? new Date(`${value}T00:00:00`) : undefined;
  const [month, setMonth] = useState<Date>(() => new Date());

  const yearOptions = useMemo(() => {
    const now = new Date();
    const start = now.getFullYear() - 5;
    const end = now.getFullYear() + 2;
    const years = [];

    for (let y = end; y >= start; y -= 1) {
      years.push({ value: y, label: `${y}년` });
    }

    return years;
  }, []);

  const monthOptions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        value: i,
        label: `${i + 1}월`,
      })),
    [],
  );

  /** 선택된 날짜가 있으면 그 달, 없으면 오늘 */
  useEffect(() => {
    if (selected) {
      setMonth(selected);
      return;
    }

    setMonth(new Date());
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  /** 달력 열 때도 필터 없으면 오늘 */
  useEffect(() => {
    if (!open) return;
    if (selected) {
      setMonth(selected);
      return;
    }

    setMonth(new Date());
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }

    if (open) document.addEventListener("mousedown", onDoc);

    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={rootRef} className="relative w-full max-w-[600px]">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="border-wedding/40 bg-surface text-text hover:border-wedding flex flex-1 items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm shadow-sm transition"
        >
          <FiCalendar className="text-weding shrink-0" size={18} />
          <span
            className={
              value ? "text-wedding font-semibold" : "text-text-secondary"
            }
          >
            {value
              ? format(new Date(`${value}T00:00:00`), "yyyy년 M월 d일 (EEE)", {
                  locale: koDateFns,
                })
              : "웨딩일자 선택"}
          </span>
        </button>

        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="날짜 필터 지우기"
            className="border-line text-text-secondary hover:border-error hover:text-error flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition"
          >
            <FiX size={18} />
          </button>
        )}
      </div>

      {open && (
        <div className="border-wedding/30 bg-surface absolute left-1/2 z-30 mt-2 w-fit -translate-x-1/2 rounded-2xl border p-3 shadow-lg">
          <div className="mb-3 flex items-center justify-center gap-1.5">
            <button
              type="button"
              onClick={() => setMonth((m) => addMonths(m, -1))}
              className="text-wedding hover:bg-wedding/10 flex h-10 w-9 shrink-0 items-center justify-center rounded-xl transition"
              aria-label="이전 달"
            >
              <FiChevronLeft size={20} />
            </button>

            <CenterPicker
              widthClassName="w-[6.75rem] shrink-0"
              value={month.getFullYear()}
              options={yearOptions}
              onChange={(year) => setMonth(new Date(year, month.getMonth(), 1))}
            />

            <CenterPicker
              widthClassName="w-[4.75rem] shrink-0"
              value={month.getMonth()}
              options={monthOptions}
              onChange={(m) => setMonth(new Date(month.getFullYear(), m, 1))}
            />

            <button
              type="button"
              onClick={() => setMonth((m) => addMonths(m, 1))}
              className="text-wedding hover:bg-wedding/10 flex h-10 w-9 shrink-0 items-center justify-center rounded-xl transition"
              aria-label="다음 달"
            >
              <FiChevronRight size={20} />
            </button>
          </div>

          <div className="mx-auto w-[15.75rem]">
            <DayPicker
              animate
              mode="single"
              locale={ko}
              month={month}
              onMonthChange={setMonth}
              hideNavigation
              selected={selected}
              onSelect={(day) => {
                if (!day) {
                  onChange(null);
                } else {
                  onChange(format(day, "yyyy-MM-dd"));
                }
                setOpen(false);
              }}
              classNames={{
                root: "rdp-root w-full",
                months: "w-full",
                month: "w-full",
                month_caption: "hidden",
                month_grid: "w-full border-collapse",
                weekdays: "flex w-full",
                weekday:
                  "h-9 w-9 grow-0 basis-9 text-center text-xs font-medium text-text-secondary",
                week: "mt-1 flex w-full",
                day: "h-9 w-9 grow-0 basis-9 p-0",
                day_button:
                  "h-9 w-9 rounded-full text-sm text-text transition hover:bg-wedding/15",
                selected:
                  "[&>button]:bg-wedding [&>button]:font-bold [&>button]:text-white hover:[&>button]:bg-wedding",
                today: "[&>button]:font-bold [&>button]:text-wedding",
                outside: "opacity-35",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
