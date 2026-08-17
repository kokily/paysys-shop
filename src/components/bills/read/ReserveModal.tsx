"use client";

import type { BillDetail } from "@/types/bill";
import { useState, useTransition } from "react";
import { addReserveAction } from "@/actions/bills";
import { useUiStore } from "@/store/ui";
import Modal from "@/components/ui/Modal";

type Props = {
  billId: string;
  onClose: () => void;
  onSaved: (bill: BillDetail) => void;
};

/** 예약금 입력 모달 */
export default function ReserveModal({ billId, onClose, onSaved }: Props) {
  const showToast = useUiStore((s) => s.showToast);
  const [reserve, setReserve] = useState("");
  const [isPending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(async () => {
      const result = await addReserveAction({
        id: billId,
        reserve: Math.trunc(Number(reserve || 0)),
      });

      if (!result.ok) {
        showToast({ type: "error", message: result.error });
        return;
      }

      showToast({ type: "success", message: "예약금 추가 완료!" });
      onSaved(result.bill);
      onClose();
    });
  }

  return (
    <Modal
      title="예약금 추가"
      onClose={onClose}
      headerClassName="bg-general"
      maxWidthClassName="max-w-[360px]"
    >
      {({ close }) => (
        <div className="space-y-5 p-5">
          <label className="text-text block text-sm">
            예약금
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              enterKeyHint="done"
              autoFocus
              value={reserve}
              onChange={(e) => setReserve(e.target.value.replace(/[^\d]/g, ""))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onSubmit();
                }
              }}
              className="border-line bg-surface text-text mt-2 w-full rounded-md border px-3 py-2 text-center text-lg"
              placeholder="금액 입력"
            />
          </label>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              disabled={isPending}
              onClick={close}
              className="border-line text-text-secondary hover:bg-line/40 min-w-[80px] rounded-md border px-3 py-2 text-sm font-bold transition disabled:opacity-60"
            >
              취 소
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={onSubmit}
              className="border-general text-general hover:bg-general min-w-[80px] rounded-md border px-3 py-2 text-sm font-bold transition hover:text-white disabled:opacity-60"
            >
              {isPending ? "저장중..." : "확 인"}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
