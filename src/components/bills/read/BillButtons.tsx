"use client";

type Props = {
  editing: boolean;
  isPending: boolean;
  canDelete: boolean;
  canRestore: boolean;
  canEditBill: boolean;
  canReserve: boolean;
  hasReserve: boolean;
  onSave: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
  onRestore: () => void;
  onStartEdit: () => void;
  onClose: () => void;
  onRemoveReserve: () => void;
  onAddReserve: () => void;
  onPrint: () => void;
};

/** 저장/취소/삭제/수정/인쇄 버튼들 */
export default function BillButtons({
  editing,
  isPending,
  canDelete,
  canRestore,
  canEditBill,
  canReserve,
  hasReserve,
  onSave,
  onCancelEdit,
  onDelete,
  onRestore,
  onStartEdit,
  onClose,
  onRemoveReserve,
  onAddReserve,
  onPrint,
}: Props) {
  return (
    <div className="no-print mt-6 flex flex-wrap justify-center gap-2 print:hidden">
      {editing ? (
        <>
          <button
            type="button"
            disabled={isPending}
            onClick={onSave}
            className="border-success text-success hover:bg-success min-w-[80px] rounded-md border px-3 py-2 text-sm font-bold transition hover:text-white disabled:opacity-60"
          >
            {isPending ? "저장중..." : "저 장"}
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={onCancelEdit}
            className="border-text-secondary text-text-secondary hover:bg-text-secondary min-w-[80px] rounded-md border px-3 py-2 text-sm font-bold transition hover:text-white disabled:opacity-60"
          >
            취 소
          </button>
        </>
      ) : (
        <>
          {canDelete && (
            <button
              type="button"
              disabled={isPending}
              onClick={onDelete}
              className="border-error text-error hover:bg-error min-w-[80px] rounded-md border px-3 py-2 text-sm font-bold transition hover:text-white disabled:opacity-60"
            >
              삭 제
            </button>
          )}

          {canRestore && (
            <button
              type="button"
              disabled={isPending}
              onClick={onRestore}
              className="border-warning text-warning hover:bg-warning min-w-[80px] rounded-md border px-3 py-2 text-sm font-bold transition hover:text-white disabled:opacity-60"
            >
              전표 ↩️
            </button>
          )}

          {canEditBill && (
            <button
              type="button"
              disabled={isPending}
              onClick={onStartEdit}
              className="min-w-[80px] rounded-md border border-[#4c6ef5] px-3 py-2 text-sm font-bold text-[#4c6ef5] transition hover:bg-[#4c6ef5] hover:text-white disabled:opacity-60"
            >
              수 정
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="border-text-secondary text-text-secondary hover:bg-text-secondary min-w-[80px] rounded-md border px-3 py-2 text-sm font-bold transition hover:text-white"
          >
            닫 기
          </button>

          {canReserve &&
            (hasReserve ? (
              <button
                type="button"
                disabled={isPending}
                onClick={onRemoveReserve}
                className="border-general text-general hover:bg-general min-w-[80px] rounded-md border px-3 py-2 text-sm font-bold transition hover:text-white disabled:opacity-60"
              >
                예약금 삭제
              </button>
            ) : (
              <button
                type="button"
                disabled={isPending}
                onClick={onAddReserve}
                className="border-general text-general hover:bg-general min-w-[80px] rounded-md border px-3 py-2 text-sm font-bold transition hover:text-white disabled:opacity-60"
              >
                + 예약금
              </button>
            ))}

          <button
            type="button"
            onClick={onPrint}
            className="border-success text-success hover:bg-success hidden min-w-[80px] rounded-md border px-3 py-2 text-sm font-bold transition hover:text-white md:inline-block"
          >
            인 쇄
          </button>
        </>
      )}
    </div>
  );
}
