"use client";

import { useEffect, useState } from "react";

type Props = {
  onIntersect: IntersectionObserverCallback;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
};

/** IntersectionObserver 헬퍼 (인피니트 스크롤) */
export function useObserver({
  onIntersect,
  root = null,
  rootMargin = "0px",
  threshold = 0,
}: Props) {
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(target);
    return () => observer.unobserve(target);
  }, [onIntersect, root, rootMargin, target, threshold]);

  return { setTarget };
}
