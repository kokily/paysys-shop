"use client";

import type { SignSex, Wedding } from "@/types/wedding";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useUiStore } from "@/store/ui";
import { weddingAllCost } from "@/lib/wedding/calc";
import {
  deleteWeddingAction,
  removeWeddingSignAction,
} from "@/actions/weddings";
import "./wedding-read.css";
import WeddingPane from "./WeddingPane";
import WeddingCostTables from "./WeddingCostTables";
import WeddingResult from "./WeddingResult";
import WeddingButton from "./WeddingButtons";
import ConfirmModal from "@/components/ui/ConfirmModal";
import SignModal from "../sign/SignModal";

type Props = {
  wedding: Wedding;
  onClose?: () => void;
  onDeleted?: (id: string) => void;
  onWeddingChange?: (wedding: Wedding) => void;
  /** true: 서명 저장 시작, false: 실패로 취소 */
  onSignSaving?: (saving: boolean) => void;
};

export default function ReadWedding({
  wedding,
  onClose,
  onDeleted,
  onWeddingChange,
  onSignSaving,
}: Props) {
  const router = useRouter();
  const showToast = useUiStore((s) => s.showToast);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [signSex, setSignSex] = useState<SignSex | null>(null);
  const [removeSex, setRemoveSex] = useState<SignSex | null>(null);
  const [isPending, startTransition] = useTransition();

  const totals = weddingAllCost(wedding);

  function goList() {
    if (onClose) onClose();
    else router.push("/weddings");
  }

  function onRemoveSign() {
    if (!removeSex) return;

    onSignSaving?.(true);

    startTransition(async () => {
      const result = await removeWeddingSignAction({
        weddingId: wedding.id,
        sex: removeSex,
      });

      if (!result.ok) {
        onSignSaving?.(false);
        showToast({ type: "error", message: result.error });
        setRemoveSex(null);
        return;
      }

      showToast({
        type: "success",
        message: `${removeSex === "husband" ? "신랑" : "신부"} 서명 삭제`,
      });

      setRemoveSex(null);
      onWeddingChange?.(result.wedding);
    });
  }

  function onDelete() {
    startTransition(async () => {
      const result = await deleteWeddingAction(wedding.id);

      if (!result.ok) {
        showToast({ type: "error", message: result.error });
        setConfirmOpen(false);
        return;
      }

      showToast({ type: "success", message: "웨딩 전표 삭제 완료!" });
      setConfirmOpen(false);

      if (onDeleted) onDeleted(wedding.id);
      else {
        router.push("/weddings");
        router.refresh();
      }
    });
  }

  return (
    <div className="read-wedding print-wedding">
      <WeddingPane
        wedding={wedding}
        onSignHusband={() => setSignSex("husband")}
        onSignBride={() => setSignSex("bride")}
        onRemoveHusband={() => setRemoveSex("husband")}
        onRemoveBride={() => setRemoveSex("bride")}
      />

      <WeddingCostTables wedding={wedding} />

      <WeddingResult totals={totals} />

      <WeddingButton
        busy={isPending}
        onList={goList}
        onEdit={() => {
          if (onClose) onClose();
          router.push(`/wedding/update/${wedding.id}`);
        }}
        onDelete={() => setConfirmOpen(true)}
        onPrint={() => window.print()}
      />

      {confirmOpen && (
        <ConfirmModal
          title="웨딩 삭제"
          message="웨딩 전표가 삭제됩니다!"
          busy={isPending}
          onConfirm={onDelete}
          onClose={() => setConfirmOpen(false)}
        />
      )}

      {signSex && (
        <SignModal
          weddingId={wedding.id}
          sex={signSex}
          onClose={() => setSignSex(null)}
          onSaved={(next) => onWeddingChange?.(next)}
          onSaving={onSignSaving}
        />
      )}

      {removeSex && (
        <ConfirmModal
          title="서명 삭제"
          message={`${removeSex === "husband" ? "신랑" : "신부"}님 서명을 삭제하시겠습니까?`}
          confirmText="확 인"
          busy={isPending}
          onConfirm={onRemoveSign}
          onClose={() => setRemoveSex(null)}
        />
      )}
    </div>
  );
}
