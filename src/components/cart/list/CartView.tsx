"use client";

import { addBillAction } from "@/actions/bills";
import { removeCartAction, removeCartItemAction } from "@/actions/cart";
import { useUiStore } from "@/store/ui";
import { CartRow } from "@/types/cart";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import CartItemsTable from "./CartItemsTable";
import { formatAmount } from "@/lib/format";
import CartSubmitForm from "./CartSubmitForm";
import ConfirmModal from "@/components/ui/ConfirmModal";

type Props = {
  initialCart: CartRow | null;
};

type ConfirmState = {
  title: string;
  message: string;
  onConfirm: () => void;
};

export default function CartView({ initialCart }: Props) {
  const router = useRouter();
  const showToast = useUiStore((s) => s.showToast);
  const [cart, setCart] = useState(initialCart);
  const [confirm, setConfirm] = useState<ConfirmState | null>(null);
  const [title, setTitle] = useState("");
  const [hall, setHall] = useState("");
  const [etc, setEtc] = useState("");
  const [isPending, startTransition] = useTransition();

  /** 카트 내 한 품목 삭제 */
  function onRemoveOne(itemId: string, name: string) {
    setConfirm({
      title: "품목 삭제",
      message: `${name} 품목을 삭제합니다`,
      onConfirm: () => {
        startTransition(async () => {
          const result = await removeCartItemAction({ itemId });

          if (!result.ok) {
            showToast({ type: "error", message: result.error });
            setConfirm(null);
            return;
          }

          setCart(result.cart);
          setConfirm(null);
          showToast({ type: "success", message: "품목 삭제" });
          router.refresh();
        });
      },
    });
  }

  /** 카트 전체 삭제 */
  function onRemoveAll() {
    setConfirm({
      title: "카트 삭제",
      message: "카트의 모든 품목을 삭제합니다",
      onConfirm: () => {
        startTransition(async () => {
          const result = await removeCartAction();

          if (!result.ok) {
            showToast({ type: "error", message: "삭제되지 않았습니다" });
            setConfirm(null);
            return;
          }

          setCart(null);
          setConfirm(null);
          showToast({ type: "success", message: "카트 삭제" });
          router.refresh();
        });
      },
    });
  }

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (!title.trim() || !hall.trim()) {
      showToast({ type: "error", message: "빈 칸 없이 입력하세요" });
      return;
    }

    startTransition(async () => {
      const result = await addBillAction({ title, hall, etc });

      if (!result.ok) {
        showToast({ type: "error", message: result.error });
        return;
      }

      setCart(null);
      setTitle("");
      setHall("");
      setEtc("");
      showToast({
        type: "success",
        message: "전표 생성",
        href: `/fronts`,
      });
      router.refresh();
      router.push("/fronts");
    });
  }

  const items = cart?.items ?? [];
  const totalAmount = cart?.totalAmount ?? 0;

  return (
    <div className="mb-24 flex w-full flex-col items-center px-4 py-4">
      <h2 className="text-text mb-4 text-center text-xl font-bold">
        전표 확인(종합)
      </h2>

      <CartItemsTable
        items={items}
        isPending={isPending}
        onRemoveOne={onRemoveOne}
      />

      <div className="text-text mt-8 mr-4 w-full max-w-[720px] text-right text-base">
        예상 결제금액 :{" "}
        <span className="text-error text-[2rem] font-normal">
          {formatAmount(totalAmount)}
        </span>
      </div>

      {items.length > 0 && (
        <CartSubmitForm
          title={title}
          hall={hall}
          etc={etc}
          isPending={isPending}
          onTitleChange={setTitle}
          onHallChange={setHall}
          onEtcChange={setEtc}
          onSubmit={onSubmit}
          onRemoveAll={onRemoveAll}
        />
      )}

      {confirm && (
        <ConfirmModal
          title={confirm.title}
          message={confirm.message}
          busy={isPending}
          onConfirm={confirm.onConfirm}
          onClose={() => setConfirm(null)}
        />
      )}
    </div>
  );
}
