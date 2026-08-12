"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUiStore } from "@/store/ui";

const SHOW_MS = 3000;
const EXIT_MS = 200;

export default function Toast() {
  const router = useRouter();
  const toast = useUiStore((s) => s.toast);
  const clearToast = useUiStore((s) => s.clearToast);

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const closingRef = useRef(false);

  function close(href?: string) {
    if (closingRef.current) return;
    closingRef.current = true;
    setOpen(false);

    window.setTimeout(() => {
      clearToast();
      setMounted(false);
      closingRef.current = false;
      if (href) router.push(href);
    }, EXIT_MS);
  }

  useEffect(() => {
    if (!toast) return;

    closingRef.current = false;
    setMounted(true);
    // 다음 프레임에 open → 등장 트랜지션
    const enter = window.requestAnimationFrame(() => setOpen(true));
    const timer = window.setTimeout(() => close(undefined), SHOW_MS);

    return () => {
      window.cancelAnimationFrame(enter);
      window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  if (!toast || !mounted) return null;

  const tone =
    toast.type === "success"
      ? "border-success text-success"
      : toast.type === "error"
        ? "border-error text-error"
        : "border-member text-member";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => close(toast.href)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") close(toast.href);
      }}
      className={`fixed top-16 left-1/2 z-[100] min-w-[240px] max-w-[360px] origin-top cursor-pointer rounded border bg-surface px-4 py-3 text-sm shadow-md transition-all duration-200 ${tone} ${
        open
          ? "-translate-x-1/2 translate-y-0 scale-100 opacity-100"
          : "pointer-events-none -translate-x-1/2 -translate-y-5 scale-[0.8] opacity-0"
      }`}
    >
      <p className="text-text">{toast.message}</p>
    </div>
  );
}
