"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

type Props = {
  value: number;
  options: { value: number; label: string }[];
  onChange: (value: number) => void;
  widthClassName: string;
};

export default function CenterPicker({
  value,
  options,
  onChange,
  widthClassName,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value)?.label ?? "";

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }

    if (open) document.addEventListener("mousedown", onDoc);

    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={ref} className={`relative ${widthClassName}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="border-wedding/40 bg-surface text-wedding hover:border-wedding hover:bg-wedding/5 flex w-full items-center justify-center gap-1 rounded-xl border px-2 py-2 text-sm font-bold transition"
      >
        <span className="text-center whitespace-nowrap">{current}</span>
        <FiChevronDown size={14} className="shrink-0 opacity-70" />
      </button>

      {open && (
        <ul className="border-wedding/30 bg-surface absolute right-0 left-0 z-40 mt-1 max-h-48 overflow-y-auto rounded-xl border py-1 shadow-lg">
          {options.map((opt) => {
            const active = opt.value === value;

            return (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-center px-3 py-2.5 text-center text-sm transition ${
                    active
                      ? "bg-wedding font-bold text-white"
                      : "text-wedding hover:bg-wedding/10"
                  }`}
                >
                  {opt.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
