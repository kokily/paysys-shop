"use client";

import type { ItemRow } from "@/types/items";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteItemAction } from "@/actions/items";
import { formatAmount } from "@/lib/format";
import { useUiStore } from "@/store/ui";
import Modal from "@/components/ui/Modal";
import ConfirmModal from "@/components/ui/ConfirmModal";

type Props = {
  item: ItemRow;
  onClose: () => void;
  onEdit: () => void;
  onDeleted: (id: string) => void;
};

/** 품목 상세 모달 */
export default function ItemDetailModal({
  item,
  onClose,
  onEdit,
  onDeleted,
}: Props) {
  const router = useRouter();
  const showToast = useUiStore((s) => s.showToast);
  const [isPending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);

  function onRemove(close: () => void) {
    setConfirmOpen(true);
    // close는 Confirm 확인 후에 호출
    // confirm handler에서 close 사용을 위해 클로저로 보관
  }

  function confirmDelete(closeDetail: () => void) {
    startTransition(async () => {
      const result = await deleteItemAction({ id: item.id });

      if (!result.ok) {
        showToast({ type: "error", message: result.error });
        setConfirmOpen(false);
        return;
      }

      showToast({ type: "success", message: "품목 삭제 완료" });
      setConfirmOpen(false);
      onDeleted(item.id);
      closeDetail();
      router.refresh();
    });
  }

  return (
    <Modal title="품목 정보" onClose={onClose} headerClassName="bg-member">
      {({ close }) => (
        <>
          <div className="p-4">
            <table className="w-full table-fixed border-collapse overflow-hidden rounded-[0.8rem]">
              <tbody>
                {(
                  [
                    ["번호", String(item.num)],
                    ["분류", item.native],
                    ["구분", item.divide],
                    ["품명", item.name],
                    ["단위", item.unit],
                    ["단가", formatAmount(item.price)],
                  ] as const
                ).map(([label, value]) => (
                  <tr key={label} className="hover:bg-black/10">
                    <th className="bg-member px-2 py-3 text-center align-middle text-sm text-white">
                      {label}
                    </th>
                    <td className="text-text px-2 py-3 text-center align-middle">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-center gap-3">
              <button
                type="button"
                onClick={close}
                disabled={isPending}
                className="border-error bg-surface text-error hover:bg-error min-w-[80px] rounded-md border px-2 py-2 text-sm font-bold transition hover:text-white disabled:opacity-60"
              >
                닫 기
              </button>
              <button
                type="button"
                onClick={onEdit}
                disabled={isPending}
                className="border-warning bg-surface text-warning hover:bg-warning min-w-[80px] rounded-md border px-2 py-2 text-sm font-bold transition hover:text-white disabled:opacity-60"
              >
                수 정
              </button>
              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                disabled={isPending}
                className="border-error bg-surface text-error hover:bg-error min-w-[80px] rounded-md border px-2 py-2 text-sm font-bold transition hover:text-white disabled:opacity-60"
              >
                삭 제
              </button>
            </div>
          </div>

          {confirmOpen && (
            <ConfirmModal
              title="품목 삭제"
              message="품목을 삭제합니다."
              busy={isPending}
              onConfirm={() => confirmDelete(close)}
              onClose={() => setConfirmOpen(false)}
            />
          )}
        </>
      )}
    </Modal>
  );
}
