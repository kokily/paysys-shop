"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { WeddingRow } from "@/types/wedding";
import { useUiStore } from "@/store/ui";
import { listWeddingsAction } from "@/actions/weddings";
import { useObserver } from "@/hooks/useObserver";
import WeddingDateFilter from "./WeddingDateFilter";
import WeddingsTable from "./WeddingsTable";
import ReadWeddingModal from "../read/ReadWeddingModal";

type Props = {
  initialWeddings: WeddingRow[];
  initialCursor: string | null;
  initialHasMore: boolean;
};

/** 웨딩 리스트 + 일자 필터 + 인피니트 스크롤 + 상세 팝업 */
export default function ListWeddings({
  initialWeddings,
  initialCursor,
  initialHasMore,
}: Props) {
  const router = useRouter();
  const showToast = useUiStore((s) => s.showToast);
  const [weddings, setWeddings] = useState(initialWeddings);
  const [cursor, setCursor] = useState(initialCursor);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [date, setDate] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (date) return;

    setWeddings(initialWeddings);
    setCursor(initialCursor);
    setHasMore(initialHasMore);
  }, [initialWeddings, initialCursor, initialHasMore, date]);

  const loadMore = useCallback(() => {
    if (!hasMore || isPending || !cursor) return;

    startTransition(async () => {
      const result = await listWeddingsAction({
        cursor,
        date: date ?? undefined,
      });

      if (!result.ok) return;

      setWeddings((prev) => [...prev, ...result.weddings]);
      setCursor(result.nextCursor);
      setHasMore(result.hasMore);
    });
  }, [cursor, hasMore, isPending, date]);

  const onIntersect: IntersectionObserverCallback = useCallback(
    ([entry]) => {
      if (entry?.isIntersecting) loadMore();
    },
    [loadMore],
  );

  const { setTarget } = useObserver({ onIntersect });

  function onDateChange(next: string | null) {
    setDate(next);
    startTransition(async () => {
      const result = await listWeddingsAction({
        date: next ?? undefined,
      });

      if (!result.ok) return;

      setWeddings(result.weddings);
      setCursor(result.nextCursor);
      setHasMore(result.hasMore);
    });
  }

  return (
    <div className="mb-24 flex w-full flex-col items-center px-2">
      <h2 className="text-text text-center text-[1.5em] font-bold">
        웨딩 빌지 리스트
      </h2>

      <button
        type="button"
        onClick={() => router.push("/wedding/add")}
        className="border-error text-error hover:bg-error mt-3 min-w-[90px] rounded-md border px-2 py-2 text-base font-bold transition hover:text-white"
      >
        웨딩 추가
      </button>

      <div className="mt-4 w-full max-w-[600px]">
        <WeddingDateFilter value={date} onChange={onDateChange} />
      </div>

      <WeddingsTable weddings={weddings} onSelect={setSelectedId} />

      {hasMore && (
        <div ref={setTarget} className="text-text-secondary py-6 text-sm">
          {isPending ? "불러오는 중..." : ""}
        </div>
      )}

      {selectedId && (
        <ReadWeddingModal
          weddingId={selectedId}
          onClose={() => setSelectedId(null)}
          onDeleted={(id) => {
            setWeddings((prev) => prev.filter((w) => w.id !== id));
            setSelectedId(null);
          }}
        />
      )}
    </div>
  );
}
