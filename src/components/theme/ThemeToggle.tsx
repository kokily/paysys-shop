"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Props = {
  /** fixed: 로그인 우상단 / inline: 헤더 안 */
  variant?: "fixed" | "inline";
};

/**
 * 라이트/다크 토글
 * 해 ——(슬라이더)—— 달
 */
export default function ThemeToggle({ variant = "fixed" }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const positionClass = variant === "inline" ? "" : "fixed top-4 right-4 z-50";

  if (!mounted) {
    return (
      <div
        className={`${positionClass} h-9 w-[88px] rounded-full bg-line/40`}
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className={positionClass}>
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="relative flex h-9 w-[88px] items-center justify-between rounded-full bg-line/50 px-2 shadow-inner"
        aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
        title={isDark ? "라이트 모드" : "다크 모드"}
      >
        <span className="relative z-10 text-sm leading-none" aria-hidden>
          ☀️
        </span>

        <span
          aria-hidden
          className={`absolute top-1 left-1 h-7 w-7 rounded-full bg-surface shadow transition-transform duration-300 ease-out ${
            isDark ? "translate-x-[52px]" : "translate-x-0"
          }`}
        />

        <span className="relative z-10 text-sm leading-none" aria-hidden>
          🌙
        </span>
      </button>
    </div>
  );
}
