"use client";

import type { Wedding } from "@/types/wedding";
import { useCallback, useEffect, useState, useTransition } from "react";
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
                onWeddingChange={setWedding}
              />
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
