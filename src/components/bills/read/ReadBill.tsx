"use client";

import type { MenuItemRow } from "@/types/menu";
import type { NativeType } from "@/lib/data/native";
import type { BillConfirmKind, BillDetail, BillDraftItem } from "@/types/bill";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useUiStore } from "@/store/ui";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ReserveModal from "@/components/bills/read/ReserveModal";
import BillMeta from "@/components/bills/read/BillMeta";
import BillItemsTable from "@/components/bills/read/BillItemsTable";
import BillTotals from "@/components/bills/read/BillTotals";
import BillButtons from "@/components/bills/read/BillButtons";
import BillAddFlow from "@/components/bills/read/BillAddFlow";
import {
  deleteBillAction,
  removeReserveAction,
  resolveItemByNativeAction,
  restoreBillAction,
  updateBillAction,
} from "@/actions/bills";
import { digitsOnly, toDraft } from "@/lib/bill/helper";

type Props = {
  bill: BillDetail;
  meId: string;
  username: string;
  admin: boolean;
  onClose: () => void;
  onDeleted: (id: string) => void;
  onUpdated: (bill: BillDetail) => void;
};

/** 전표 상세 (인쇄 시 버튼 제외) */
export default function ReadBill({
  bill,
  meId,
  username,
  admin,
  onClose,
  onDeleted,
  onUpdated,
}: Props) {
  const router = useRouter();
  const showToast = useUiStore((s) => s.showToast);
  const [confirmKind, setConfirmKind] = useState<BillConfirmKind>(null);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<BillDraftItem[]>(() =>
    toDraft(bill.items),
  );
  const [isPending, startTransition] = useTransition();
  const [nativePendingIndex, setNativePendingIndex] = useState<number | null>(
    null,
  );

  /** null | "__pick__" | member/associate/general */
  const [addNative, setAddNative] = useState<NativeType | "__pick__" | null>(
    null,
  );
  const [addDivide, setAddDivide] = useState<string | null>(null);
  const [addItem, setAddItem] = useState<MenuItemRow | null>(null);

  // 호버 × 로 지울 draft 행 인덱스
  const [removeLineIndex, setRemoveLineIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!editing) {
      setDraft(toDraft(bill.items));
    }
  }, [bill.items, editing]);

  const isOwner = bill.user_id === meId;
  const canDelete = isOwner || admin;
  const canRestore = isOwner;
  const canEditBill = admin;
  const canReserve = admin || username === "프론트";

  function closeAddFlow() {
    setAddItem(null);
    setAddDivide(null);
    setAddNative(null);
  }

  function startEdit() {
    setDraft(toDraft(bill.items));
    setEditing(true);
  }

  function cancelEdit() {
    setDraft(toDraft(bill.items));
    setEditing(false);
    setNativePendingIndex(null);
    setRemoveLineIndex(null);
    closeAddFlow();
  }

  function updateDraft(index: number, field: "price" | "count", value: string) {
    const next = digitsOnly(value);
    setDraft((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: next } : row)),
    );
  }

  function onNativeChange(index: number, native: string) {
    const row = draft[index];
    if (!row || row.native === native) return;

    setNativePendingIndex(index);
    startTransition(async () => {
      const result = await resolveItemByNativeAction({
        name: row.name,
        divide: row.divide,
        native,
      });

      setNativePendingIndex(null);

      if (!result.ok) {
        showToast({ type: "error", message: result.error });
        return;
      }

      setDraft((prev) =>
        prev.map((r, i) =>
          i === index
            ? {
                ...r,
                id: result.item.id,
                native: result.item.native,
                unit: result.item.unit,
                price: String(result.item.price),
              }
            : r,
        ),
      );
    });
  }

  const displayItems = editing
    ? draft.map((row) => {
        const price = Math.trunc(Number(row.price || 0));
        const count = Math.trunc(Number(row.count || 0));
        return {
          id: row.id,
          name: row.name,
          divide: row.divide,
          native: row.native,
          unit: row.unit,
          price: price > 0 ? price : 0,
          count: count > 0 ? count : 0,
          amount: (price > 0 ? price : 0) * (count > 0 ? count : 0),
        };
      })
    : bill.items;

  const displayTotal = displayItems.reduce((sum, i) => sum + i.amount, 0);
  const payable =
    displayTotal - (bill.reserve && bill.reserve > 0 ? bill.reserve : 0);

  const addNativeBg =
    addNative === "associate"
      ? "bg-associate"
      : addNative === "general"
        ? "bg-general"
        : "bg-member";

  function onSave() {
    startTransition(async () => {
      const result = await updateBillAction({
        id: bill.id,
        items: draft.map((row) => ({
          id: row.id,
          native: row.native,
          price: Math.trunc(Number(row.price || 0)),
          count: Math.trunc(Number(row.count || 0)),
          name: row.name,
          divide: row.divide,
          unit: row.unit,
        })),
      });

      if (!result.ok) {
        showToast({ type: "error", message: result.error });
        return;
      }

      showToast({ type: "success", message: "전표 수정 완료!" });
      onUpdated(result.bill);
      setEditing(false);
      closeAddFlow();
      router.refresh();
    });
  }

  function onDelete() {
    startTransition(async () => {
      const result = await deleteBillAction(bill.id);
      if (!result.ok) {
        showToast({ type: "error", message: result.error });
        setConfirmKind(null);
        return;
      }
      showToast({ type: "success", message: "전표 삭제 완료!" });
      setConfirmKind(null);
      onDeleted(bill.id);
      router.refresh();
    });
  }

  function onRestore() {
    startTransition(async () => {
      const result = await restoreBillAction(bill.id);
      if (!result.ok) {
        showToast({ type: "error", message: result.error });
        setConfirmKind(null);
        return;
      }
      showToast({ type: "success", message: "카트로 되돌렸습니다!" });
      setConfirmKind(null);
      onDeleted(bill.id);
      router.push("/cart");
      router.refresh();
    });
  }

  function onRemoveReserve() {
    startTransition(async () => {
      const result = await removeReserveAction(bill.id);
      if (!result.ok) {
        showToast({ type: "error", message: result.error });
        setConfirmKind(null);
        return;
      }
      showToast({ type: "success", message: "예약금 삭제 완료!" });
      setConfirmKind(null);
      onUpdated(result.bill);
      router.refresh();
    });
  }

  function onRemoveLine() {
    if (removeLineIndex == null) return;

    if (draft.length <= 1) {
      showToast({ type: "error", message: "품목은 1개 이상 있어야 합니다." });
      setRemoveLineIndex(null);
      return;
    }

    setDraft((prev) => prev.filter((_, i) => i !== removeLineIndex));
    setRemoveLineIndex(null);
    showToast({ type: "success", message: "품목을 목록에서 제거했습니다." });
  }

  return (
    <div className="print-front mb-2 flex w-full flex-col print:mb-0 print:bg-white print:text-black">
      <div className="pb-2 text-center">
        <h2 className="text-text text-xl font-bold print:text-black">
          전표세부내역
          <br />
          <small className="text-success text-base font-semibold">
            [ {bill.title} ]
          </small>
        </h2>
      </div>

      <div className="from-member to-success mx-8 h-[3px] bg-gradient-to-r md:mx-20 print:mx-8" />

      <BillMeta bill={bill} />

      <BillItemsTable
        editing={editing}
        displayItems={displayItems}
        draft={draft}
        isPending={isPending}
        nativePendingIndex={nativePendingIndex}
        onNativeChange={onNativeChange}
        updateDraft={updateDraft}
        setRemoveLineIndex={setRemoveLineIndex}
        onStartAdd={() => {
          setAddItem(null);
          setAddDivide(null);
          setAddNative("__pick__");
        }}
      />

      {bill.etc.trim() !== "" && (
        <>
          <hr className="border-line my-4 print:border-black/20" />
          <div className="text-success w-full rounded border border-[#bac8ff] bg-[#dbe4ff] p-[15px] print:border-black/30 print:bg-white print:text-black">
            {bill.etc}
          </div>
        </>
      )}

      <hr className="border-line my-4 print:border-black/20" />

      <BillTotals
        displayTotal={displayTotal}
        reserve={bill.reserve}
        payable={payable}
      />

      <BillButtons
        editing={editing}
        isPending={isPending}
        canDelete={canDelete}
        canRestore={canRestore}
        canEditBill={canEditBill}
        canReserve={canReserve}
        hasReserve={!!(bill.reserve && bill.reserve > 0)}
        onSave={onSave}
        onCancelEdit={cancelEdit}
        onDelete={() => setConfirmKind("delete")}
        onRestore={() => setConfirmKind("restore")}
        onStartEdit={startEdit}
        onClose={onClose}
        onRemoveReserve={() => setConfirmKind("removeReserve")}
        onAddReserve={() => setReserveOpen(true)}
        onPrint={() => window.print()}
      />

      {confirmKind === "delete" && (
        <ConfirmModal
          title="전표 삭제"
          message="전표가 삭제됩니다!"
          busy={isPending}
          onConfirm={onDelete}
          onClose={() => setConfirmKind(null)}
        />
      )}

      {confirmKind === "restore" && (
        <ConfirmModal
          title="전표 복원"
          message={"전표를 삭제하고\n카트로 되돌립니다."}
          confirmText="복 원"
          busy={isPending}
          onConfirm={onRestore}
          onClose={() => setConfirmKind(null)}
        />
      )}

      {confirmKind === "removeReserve" && (
        <ConfirmModal
          title="예약금 삭제"
          message="예약금을 삭제합니다."
          confirmText="삭 제"
          busy={isPending}
          onConfirm={onRemoveReserve}
          onClose={() => setConfirmKind(null)}
        />
      )}

      {confirmKind === null && removeLineIndex !== null && (
        <ConfirmModal
          title="품목 삭제"
          message={`${draft[removeLineIndex]?.name ?? "이 품목"}을(를) 목록에서 제거할까요?`}
          confirmText="삭 제"
          busy={isPending}
          onConfirm={onRemoveLine}
          onClose={() => setRemoveLineIndex(null)}
        />
      )}

      {reserveOpen && (
        <ReserveModal
          billId={bill.id}
          onClose={() => setReserveOpen(false)}
          onSaved={(next) => {
            onUpdated(next);
            router.refresh();
          }}
        />
      )}

      <BillAddFlow
        editing={editing}
        addNative={addNative}
        setAddNative={setAddNative}
        addDivide={addDivide}
        setAddDivide={setAddDivide}
        addItem={addItem}
        setAddItem={setAddItem}
        closeAddFlow={closeAddFlow}
        addNativeBg={addNativeBg}
        setDraft={setDraft}
        showToast={showToast}
      />
    </div>
  );
}
