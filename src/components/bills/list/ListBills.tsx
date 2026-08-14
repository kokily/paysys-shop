"use client";

import { listBillsAction } from "@/actions/bills";
import { useObserver } from "@/hooks/useObserver";
import {
  canTrackBillNew,
  isUnseenNewBill,
  loadSeenBillIds,
  markBillSeen,
  pruneSeenBillIds,
  type SeenMap,
} from "@/lib/bill/seen";
import { BillRow } from "@/types/bill";
import { useUiStore } from "@/store/ui";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
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

  /** localStorage에 저장된 “확인한 전표” 맵 */
  const [seen, setSeen] = useState<SeenMap>({});

  /** 관리자 또는 프론트만 NEW/배지 로직 사용 */
  const trackNew = canTrackBillNew(admin, username);

  useEffect(() => {
    setBills(initialBills);
    setCursor(initialCursor);
    setHasMore(initialHasMore);
  }, [initialBills, initialCursor, initialHasMore, title, hall, userId]);

  /**
   * NEW 추적 대상이면
   * 1) 어제 이전 seen 정리
   * 2) 오늘 seen 맵 로드
   */
  useEffect(() => {
    if (!trackNew) return;
    pruneSeenBillIds(meId);
    setSeen(loadSeenBillIds(meId));
  }, [trackNew, meId]);

  /**
   * 현재 목록 중 NEW 붙일 id 집합
   * - 오늘 작성 + 미확인
   * - trackNew 아니면 undefined (배지 비표시)
   */
  const newBillIds = useMemo(() => {
    if (!trackNew) return undefined;
    const set = new Set<string>();
    for (const b of bills) {
      if (isUnseenNewBill(b.id, b.created_at, seen)) {
        set.add(b.id);
      }
    }
    return set;
  }, [trackNew, bills, seen]);

  // SSE: 다른 사용자에 의한 목록 최신화
  useEffect(() => {
    const es = new EventSource("/api/bills/events");

    es.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data) as { type?: string };

        if (data.type === "connected") return;

        // 새 전표 알림 (짧은 토스트)
        if (data.type === "created") {
          useUiStore.getState().showToast({
            type: "info",
            message: "새 전표가 등록되었습니다",
          });
        }

        startTransition(async () => {
          const result = await listBillsAction({ title, hall, userId });

          if (!result.ok) return;

          setBills(result.bills);
          setCursor(result.nextCursor);
          setHasMore(result.hasMore);
          // bills가 바뀌면 newBillIds useMemo가 다시 계산됨
        });
      } catch {
        // ignore parse errors
      }
    };

    es.onerror = () => {
      // 브라우저가 자동 재연결
    };

    return () => {
      es.close();
    };
  }, [title, hall, userId]);

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

  /**
   * 상세 모달 오픈 = “확인”
   * → localStorage에 기록 후 seen state 갱신 → NEW 즉시 제거
   */
  function openBill(id: string) {
    setSelectedId(id);
    if (!trackNew) return;
    markBillSeen(meId, id);
    setSeen(loadSeenBillIds(meId));
  }

  return (
    <div className="mb-24 flex w-full flex-col items-center px-2">
      <h2 className="text-text text-center text-xl font-bold">
        프런트 전표 현황
        {/* 미확인 NEW 개수 (관리자/프론트만) */}
        {newBillIds && newBillIds.size > 0 && (
          <span className="text-error ml-2 text-sm font-bold">
            🆕 {newBillIds.size}
          </span>
        )}
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
        newBillIds={newBillIds}
        onSelect={openBill}
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
