"use client";

import type { PendingUser } from "@/types/approve";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  rejectPendingUserAction,
  setUserApprovedAction,
} from "@/actions/approve";
import { useUiStore } from "@/store/ui";
import ConfirmModal from "@/components/ui/ConfirmModal";

type Props = {
  users: PendingUser[];
};

/**
 * 가입 승인 대기 목록
 */
export default function PendingUserList({ users }: Props) {
  const router = useRouter();
  const showToast = useUiStore((s) => s.showToast);
  const [isPending, startTransition] = useTransition();
  const [rejectTarget, setRejectTarget] = useState<PendingUser | null>(null);

  function onApprove(id: string, username: string) {
    startTransition(async () => {
      const result = await setUserApprovedAction({ id, approved: true });

      if (!result.ok) {
        showToast({ type: "error", message: result.error });
        return;
      }

      showToast({
        type: "success",
        message: `${username} 님을 승인했습니다.`,
      });
      router.refresh();
    });
  }

  function onReject() {
    if (!rejectTarget) return;

    startTransition(async () => {
      const result = await rejectPendingUserAction({ id: rejectTarget.id });

      if (!result.ok) {
        showToast({ type: "error", message: result.error });
        setRejectTarget(null);
        return;
      }

      showToast({
        type: "success",
        message: `${result.username} 님 가입을 거부했습니다.`,
      });
      setRejectTarget(null);
      router.refresh();
    });
  }

  if (users.length === 0) {
    return (
      <p className="text-text-secondary py-12 text-center">
        대기 중인 가입 신청이 없습니다.
      </p>
    );
  }

  return (
    <>
      <ul className="divide-line border-line bg-surface divide-y border">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between gap-4 px-4 py-3"
          >
            <div>
              <p className="text-text font-semibold">{user.username}</p>
              <p className="text-text-secondary text-xs">
                신청일{" "}
                {new Date(user.created_at).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                disabled={isPending}
                onClick={() => setRejectTarget(user)}
                className="border-error text-error hover:bg-error rounded border px-4 py-2 text-sm font-semibold transition hover:text-white disabled:opacity-60"
              >
                거부
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={() => onApprove(user.id, user.username)}
                className="bg-member rounded px-4 py-2 text-sm font-semibold text-white brightness-90 transition hover:brightness-100 disabled:opacity-60"
              >
                승인
              </button>
            </div>
          </li>
        ))}
      </ul>

      {rejectTarget && (
        <ConfirmModal
          title="가입 거부"
          message={`${rejectTarget.username} 님의 가입 신청을 거부하고\n계정을 삭제합니다.`}
          confirmText="거 부"
          busy={isPending}
          onConfirm={onReject}
          onClose={() => setRejectTarget(null)}
        />
      )}
    </>
  );
}
