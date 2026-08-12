"use client";

import Modal from "@/components/ui/Modal";

type Props = {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
  busy?: boolean;
};

/** 확인/취소 팝업 (window.confirm 대체) */
export default function ConfirmModal({
  title,
  message,
  confirmText = "삭 제",
  cancelText = "취 소",
  onConfirm,
  onClose,
  busy = false,
}: Props) {
  return (
    <Modal
      title={title}
      onClose={onClose}
      headerClassName="bg-error"
      maxWidthClassName="max-w-[360px]"
    >
      {({ close }) => (
        <div className="space-y-5 p-5">
          <p className="text-center text-sm leading-relaxed text-text whitespace-pre-wrap">
            {message}
          </p>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              disabled={busy}
              onClick={close}
              className="min-w-[80px] rounded-md border border-line bg-surface px-3 py-2 text-sm font-bold text-text-secondary transition hover:bg-line/40 disabled:opacity-60"
            >
              {cancelText}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={onConfirm}
              className="min-w-[80px] rounded-md border border-error bg-surface px-3 py-2 text-sm font-bold text-error transition hover:bg-error hover:text-white disabled:opacity-60"
            >
              {busy ? "처리중..." : confirmText}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
