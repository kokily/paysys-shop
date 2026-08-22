"use client";

import type { SignSex, Wedding } from "@/types/wedding";
import { useState, useTransition } from "react";
import { addWeddingSignAction } from "@/actions/weddings";
import { useUiStore } from "@/store/ui";
import Modal from "@/components/ui/Modal";
import "./sign-modal.css";
import SignCanvas from "./SignCanvas";

type Props = {
  weddingId: string;
  sex: SignSex;
  onClose: () => void;
  onSaved: (wedding: Wedding) => void;
  /** true: 저장 시작, false: 저장 실패 */
  onSaving?: (saving: boolean) => void;
};

export default function SignModal({
  weddingId,
  sex,
  onClose,
  onSaved,
  onSaving,
}: Props) {
  const showToast = useUiStore((s) => s.showToast);
  const [image, setImage] = useState("");
  const [isPending, startTransition] = useTransition();

  const title = sex === "husband" ? "신랑 서명" : "신부 서명";

  function onConfirm() {
    if (!image) {
      showToast({ type: "error", message: "서명을 먼저 해주세요" });
      return;
    }

    onSaving?.(true);

    startTransition(async () => {
      const result = await addWeddingSignAction({
        weddingId,
        sex,
        image,
      });

      if (!result.ok) {
        onSaving?.(false);
        showToast({ type: "error", message: result.error });
        return;
      }

      showToast({ type: "success", message: `${title}이 등록되었습니다` });
      onSaved(result.wedding);
      onClose();
    });
  }

  return (
    <Modal
      title={title}
      onClose={onClose}
      headerClassName="bg-wedding"
      maxWidthClassName="max-w-[420px]"
    >
      {({ close }) => (
        <>
          <div className="sign-modal-body">
            <SignCanvas onChange={setImage} />
          </div>
          <div className="sign-modal-footer">
            <button
              type="button"
              className="sign-modal-btn cancel"
              disabled={isPending}
              onClick={close}
            >
              취소
            </button>
            <button
              type="button"
              className="sign-modal-btn submit"
              disabled={isPending}
              onClick={onConfirm}
            >
              {isPending ? "처리 중..." : "확인"}
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
