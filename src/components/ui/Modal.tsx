"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const EXIT_MS = 280;

export type ModalApi = {
  close: () => void;
};

type Props = {
  children: ReactNode | ((api: ModalApi) => ReactNode);
  onClose: () => void;
  maxWidthClassName?: string;
  title?: string;
  headerClassName?: string;
  /** 세로 전체 시트 (메뉴 리스트용) — 애니메이션 없음 */
  fullHeight?: boolean;
  /** 인쇄 시 이 포털만 남김 (전표 상세 등) */
  printPortal?: boolean;
  /** Escape로 닫기 (기본 true) */
  closeOnEscape?: boolean;
};

export default function Modal({
  children,
  onClose,
  maxWidthClassName = "max-w-lg",
  title,
  headerClassName,
  fullHeight = false,
  printPortal = false,
  closeOnEscape = true,
}: Props) {
  const [open, setOpen] = useState(fullHeight);
  const [mounted, setMounted] = useState(false);
  const closingRef = useRef(false);

  function close() {
    if (closingRef.current) return;
    closingRef.current = true;

    if (fullHeight) {
      onClose();
      return;
    }

    setOpen(false);
    window.setTimeout(() => {
      onClose();
    }, EXIT_MS);
  }

  useEffect(() => {
    setMounted(true);

    let enter = 0;
    let enter2 = 0;
    if (!fullHeight) {
      enter = window.requestAnimationFrame(() => {
        enter2 = window.requestAnimationFrame(() => setOpen(true));
      });
    }

    function onKey(e: KeyboardEvent) {
      if (closeOnEscape && e.key === "Escape") close();
    }

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      if (enter) window.cancelAnimationFrame(enter);
      if (enter2) window.cancelAnimationFrame(enter2);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeOnEscape]);

  if (!mounted || typeof document === "undefined") return null;

  const body = typeof children === "function" ? children({ close }) : children;

  return createPortal(
    <div
      className={`${printPortal ? "print-portal " : ""}fixed inset-0 z-50 flex justify-center bg-black/70 ${
        fullHeight ? "items-stretch p-0 sm:px-4" : "items-center p-4"
      } ${
        fullHeight
          ? ""
          : `transition-opacity duration-[280ms] ease-out ${
              open ? "opacity-100" : "opacity-0"
            }`
      }`}
      onClick={close}
    >
      <div
        className={`w-full bg-surface ${maxWidthClassName} ${
          fullHeight
            ? "flex h-full flex-col rounded-none sm:rounded-[10px]"
            : `origin-center rounded-[10px] transition-[opacity,transform] duration-[280ms] ease-out will-change-transform ${
                open
                  ? "scale-100 translate-y-0 opacity-100"
                  : "pointer-events-none scale-90 translate-y-2 opacity-0"
              }`
        }`}
        style={{ boxShadow: "var(--shadow-2)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div
            className={`flex h-14 shrink-0 items-center justify-center text-[1.212rem] font-extrabold tracking-[2px] text-white ${
              fullHeight ? "" : "rounded-t-[10px]"
            } ${headerClassName ?? ""}`}
          >
            {title}
          </div>
        )}
        <div
          className={fullHeight ? "flex min-h-0 flex-1 flex-col" : undefined}
        >
          {body}
        </div>
      </div>
    </div>,
    document.body,
  );
}
