"use client";

import type { UserRow } from "@/types/user";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteUserAction, setUserAdminAction } from "@/actions/users";
import { useUiStore } from "@/store/ui";
import Modal from "@/components/ui/Modal";
import ConfirmModal from "@/components/ui/ConfirmModal";

type Props = {
  user: UserRow;
  meId: string;
  onClose: () => void;
  onUpdated: (user: UserRow) => void;
  onDeleted: (id: string) => void;
};

/** 사용자 상세 모달 */
export default function ReadUserModal({
  user,
  meId,
  onClose,
  onUpdated,
  onDeleted,
}: Props) {
  const router = useRouter();
  const showToast = useUiStore((s) => s.showToast);
  const [isPending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const isSelf = user.id === meId;

  function onSetAdmin() {
    startTransition(async () => {
      const nextAdmin = !user.admin;
      const result = await setUserAdminAction({
        id: user.id,
        admin: nextAdmin,
      });

      if (!result.ok) {
        showToast({ type: "error", message: result.error });
        return;
      }

      showToast({
        type: "success",
        message: "관리자 권한이 변경되었습니다.",
      });
      onUpdated({ ...user, admin: nextAdmin });
      router.refresh();
    });
  }

  function confirmDelete(closeDetail: () => void) {
    startTransition(async () => {
      const result = await deleteUserAction({ id: user.id });

      if (!result.ok) {
        showToast({ type: "error", message: result.error });
        setConfirmOpen(false);
        return;
      }

      showToast({ type: "success", message: "사용자 삭제 완료" });
      setConfirmOpen(false);
      onDeleted(user.id);
      closeDetail();
      router.refresh();
    });
  }

  return (
    <Modal title="사용자 정보" onClose={onClose}>
      {({ close }) => (
        <>
          <div className="p-4">
            <table className="w-full overflow-hidden rounded-[0.8rem]">
              <tbody>
                <tr className="hover:bg-black/10">
                  <th className="bg-[#3bc9db] px-2 py-3 text-center text-sm text-white">
                    성명
                  </th>
                  <td className="text-text px-2 py-3 text-center">
                    {user.username}
                  </td>
                </tr>
                <tr className="hover:bg-black/10">
                  <th className="bg-[#3bc9db] px-2 py-3 text-center text-sm text-white">
                    등급
                  </th>
                  <td className="text-text px-2 py-3 text-center">
                    {user.admin ? "관리자" : "일반"}
                  </td>
                </tr>
                <tr className="hover:bg-black/10">
                  <th className="bg-[#3bc9db] px-2 py-3 text-center text-sm text-white">
                    가입일
                  </th>
                  <td className="text-text px-2 py-3 text-center">
                    {new Date(user.created_at).toLocaleDateString("ko-KR")}
                  </td>
                </tr>
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
                onClick={onSetAdmin}
                disabled={isPending || (isSelf && user.admin)}
                className="border-warning bg-surface text-warning hover:bg-warning min-w-[80px] rounded-md border px-2 py-2 text-sm font-bold transition hover:text-white disabled:opacity-60"
              >
                등 급
              </button>
              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                disabled={isPending || isSelf}
                className="border-error bg-surface text-error hover:bg-error min-w-[80px] rounded-md border px-2 py-2 text-sm font-bold transition hover:text-white disabled:opacity-60"
              >
                삭 제
              </button>
            </div>
          </div>

          {confirmOpen && (
            <ConfirmModal
              title="사용자 삭제"
              message="사용자를 삭제합니다."
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
