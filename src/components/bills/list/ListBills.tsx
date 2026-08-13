"use client";

import { listBillsAction } from "@/actions/bills";
import { useObserver } from "@/hooks/useObserver";
import { BillRow } from "@/types/bill";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import BillsSearch from "./BillsSearch";
import BillsTable from "./BillsTable";
import ReadBillModal from "../read/ReadBillModal";

type Props = {
  initialBills: BillRow[];
  initialCursor: string | null;
  initialHasMore: boolean;
  title: string;
  hall: string;
  userId: string;
  meId: string;
  username: string;
  admin: boolean;
};

export default function ListBills({
  initialBills,
  initialCursor,
  initialHasMore,
  title,
  hall,
  userId,
  meId,
  username,
  admin,
}: Props) {
  const router = useRouter();
  const [bills, setBills] = useState(initialBills);
  const [cursor, setCursor] = useState(initialCursor);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setBills(initialBills);
    setCursor(initialCursor);
    setHasMore(initialHasMore);
  }, [initialBills, initialCursor, initialHasMore, title, hall, userId]);

  const loadMore = useCallback(() => {
    if (!hasMore || isPending || !cursor) return;

    startTransition(async () => {
      const result = await listBillsAction({
        title,
        hall,
        userId,
        cursor,
      });

      if (!result.ok) return;

      setBills((prev) => [...prev, ...result.bills]);
      setCursor(result.nextCursor);
      setHasMore(result.hasMore);
    });
  }, [cursor, hall, hasMore, isPending, title, userId]);

  const onIntersect: IntersectionObserverCallback = useCallback(
    ([entry]) => {
      if (entry?.isIntersecting) loadMore();
    },
    [loadMore],
  );

  const { setTarget } = useObserver({ onIntersect });

  function pushFilter(next: { hall?: string; userId?: string }) {
    const qs = new URLSearchParams();

    if (title) qs.set("title", title);
    if (next.hall ?? hall) qs.set("hall", next.hall ?? hall);
    if (next.userId ?? userId) qs.set("userId", next.userId ?? userId);

    router.push(qs.toString() ? `/fronts?${qs}` : "/fronts");
  }

  return (
    <div className="mb-24 flex w-full flex-col items-center px-2">
      <h2 className="text-text text-center text-xl font-bold">
        프런트 전표 현황
      </h2>

      <BillsSearch initialTitle={title} hall={hall} userId={userId} />

      {(hall || userId) && (
        <button
          type="button"
          onClick={() =>
            router.push(
              title ? `/fronts?title=${encodeURIComponent(title)}` : "/fronts",
            )
          }
          className="text-text-secondary hover:text-text mb-2 text-sm"
        >
          필터 초기화
        </button>
      )}

      <BillsTable
        bills={bills}
        onSelect={setSelectedId}
        onFilterHall={(h) => pushFilter({ hall: h })}
        onFilterUser={(uid) => pushFilter({ userId: uid })}
      />

      {hasMore && (
        <div ref={setTarget} className="text-text-secondary py-6 text-sm">
          {isPending ? "불러오는 중..." : ""}
        </div>
      )}

      {selectedId && (
        <ReadBillModal
          billId={selectedId}
          meId={meId}
          username={username}
          admin={admin}
          onClose={() => setSelectedId(null)}
          onDeleted={(id) => {
            setBills((prev) => prev.filter((b) => b.id !== id));
            setSelectedId(null);
          }}
        />
      )}
    </div>
  );
}
