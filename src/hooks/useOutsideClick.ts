"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * 영역 밖 클릭 감지
 * @param callback 바깥 클릭 시 실행
 * @returns ref (감지할 요소에 연결)
 */
export function useOutsideClick<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T | null>(null);

  const onClick = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    },
    [callback],
  );

  useEffect(() => {
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [onClick]);

  return ref;
}
