"use client";

import type { Wedding } from "@/types/wedding";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { getWeddingAction } from "@/actions/weddings";
import ReadWedding from "./ReadWedding";
import Modal from "@/components/ui/Modal";

type Props = {
  weddingId: string;
  onClose: () => void;
  onDeleted: (id: string) => void;
};

/** 웨딩 상세 팝업 */
export default function ReadWeddingModal({
  weddingId,
  onClose,
  onDeleted,
}: Props) {
  const [wedding, setWedding] = useState<Wedding | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  /** 이 탭에서 방금 저장한 서명 SSE는 재조회하지 않음 */
  const skipSignedReloadRef = useRef(false);

  const load = useCallback(() => {
    startTransition(async () => {
      const result = await getWeddingAction(weddingId);

      if (!result.ok) {
        setError(result.error);
        return;
      }
      setError(null);
      setWedding(result.wedding);
    });
  }, [weddingId]);

  useEffect(() => {
    load();
  }, [load]);

  /**
   * 다른 기기/탭에서 서명 등록·삭제 시 상세 즉시 반영
   */
  useEffect(() => {
    const es = new EventSource("/api/weddings/events");

    es.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data) as {
          type?: string;
          weddingId?: string;
        };

        if (data.type === "connected") return;
        if (data.weddingId !== weddingId) return;

        if (
          data.type === "signed" ||
          data.type === "unsigned" ||
          data.type === "updated"
        ) {
          if (skipSignedReloadRef.current) {
            skipSignedReloadRef.current = false;
            return;
          }
          load();
        }

        if (data.type === "deleted") {
          onDeleted(weddingId);
          onClose();
        }
      } catch {
        // ignore parse errors
      }
    };

    return () => {
      es.close();
    };
  }, [weddingId, load, onClose, onDeleted]);

  return (
    <Modal
      onClose={onClose}
      fullHeight
      printPortal
      closeOnEscape={false}
      maxWidthClassName="max-w-[960px]"
      headerClassName="bg-wedding no-print"
      title="웨딩 정산내역"
    >
      {({ close }) => (
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto p-4 print:overflow-visible print:p-0">
            {isPending && !wedding && (
              <p className="text-text-secondary py-10 text-center text-sm">
                불러오는 중...
              </p>
            )}
            {error && (
              <p className="text-error py-10 text-center text-sm">{error}</p>
            )}
            {wedding && (
              <ReadWedding
                wedding={wedding}
                onClose={close}
                onDeleted={(id) => {
                  onDeleted(id);
                  close();
                }}
                onSignSaving={(saving) => {
                  skipSignedReloadRef.current = saving;
                }}
                onWeddingChange={(next) => {
                  skipSignedReloadRef.current = true;
                  setWedding(next);
                }}
              />
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
