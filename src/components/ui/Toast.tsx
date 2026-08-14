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

  const [open, setOpen] = useState(false);
  const closingRef = useRef(false);
  const toastId = toast?.id;

  function close(href?: string) {
    if (closingRef.current) return;
    closingRef.current = true;
    setOpen(false);

    window.setTimeout(() => {
      clearToast();
      closingRef.current = false;
      if (href) router.push(href);
    }, EXIT_MS);
  }

  useEffect(() => {
    if (!toast) {
      setOpen(false);
      closingRef.current = false;
      return;
    }

    closingRef.current = false;
    setOpen(false);

    // 레이아웃 반영 후 등장 (EventSource 등 React 외부 호출에도 안전)
    const enter = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setOpen(true));
    });
    const timer = window.setTimeout(() => close(toast.href), SHOW_MS);

    return () => {
      window.cancelAnimationFrame(enter);
      window.clearTimeout(timer);
    };
    // toast.id 기준으로 매번 다시 표시
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastId]);

  if (!toast) return null;

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
      className={`fixed top-16 left-1/2 z-[200] min-w-[240px] max-w-[360px] origin-top cursor-pointer rounded border bg-surface px-4 py-3 text-sm shadow-md transition-all duration-200 ${tone} ${
        open
          ? "-translate-x-1/2 translate-y-0 scale-100 opacity-100"
          : "pointer-events-none -translate-x-1/2 -translate-y-5 scale-[0.8] opacity-0"
      }`}
    >
      <p className="text-text">{toast.message}</p>
    </div>
  );
}
