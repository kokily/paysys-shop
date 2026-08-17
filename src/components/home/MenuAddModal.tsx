"use client";

import { useMemo, useState, useTransition } from "react";
import { addToCartAction } from "@/actions/cart";
import { useUiStore } from "@/store/ui";
import { MenuItemRow } from "@/types/menu";
import { formatAmount } from "@/lib/format";
import Modal from "../ui/Modal";

type Props = {
  item: MenuItemRow;
  onBack: () => void;
  onClose: () => void;
  onAdded?: () => void;
  onConfirm?: (payload: { count: number; price: number }) => void;
};

export default function MenuAddModal({
  item,
  onBack,
  onClose,
  onAdded,
  onConfirm,
}: Props) {
  const showToast = useUiStore((s) => s.showToast);
  const [isPending, startTransition] = useTransition();
  const editablePrice = item.price === 0;

  const [count, setCount] = useState("");
  const [price, setPrice] = useState(editablePrice ? "" : String(item.price));

  const headerClass =
    item.native === "회원"
      ? "bg-member"
      : item.native === "준회원"
        ? "bg-associate"
        : "bg-general";

  const buttonClass =
    item.native === "회원"
      ? "border-member text-member hover:bg-member"
      : item.native === "준회원"
        ? "border-associate text-associate hover:bg-associate"
        : "border-general text-general hover:bg-general";

  const total = useMemo(() => {
    const c = parseInt(count, 10) || 0;
    const p = parseInt(price, 10) || 0;

    return c * p;
  }, [count, price]);

  function onSubmit() {
    const nextCount = parseInt(count, 10) || 0;
    const nextPrice = parseInt(price, 10) || 0;

    // 수량 검증
    if (nextCount < 1) {
      showToast({ type: "error", message: "수량을 입력하세요" });
      return;
    }

    // 전표 수정용: 카트에 안 담고 부모로 값만 넘김
    if (onConfirm) {
      onConfirm({ count: nextCount, price: nextPrice });
      return;
    }

    // 홈/카트용: 서버에 카트 담기
    startTransition(async () => {
      const result = await addToCartAction({
        itemId: item.id,
        count: nextCount,
        price: nextPrice,
      });

      if (!result.ok) {
        showToast({ type: "error", message: result.error });
        return;
      }

      showToast({ type: "success", message: "카트에 추가되었습니다" });
      onAdded?.();
    });
  }

  return (
    <Modal
      title={`${item.divide} | ${item.native}`}
      onClose={onClose}
      headerClassName={headerClass}
      maxWidthClassName="max-w-[320px]"
    >
      <div className="space-y-4 p-5">
        <table className="w-full table-fixed border-collapse overflow-hidden rounded-[0.8rem]">
          <colgroup>
            <col className="w-[40%]" />
            <col className="w-[60%]" />
          </colgroup>
          <tbody>
            <tr className="hover:bg-black/10">
              <th
                className={`${headerClass} px-2 py-3 text-center align-middle text-sm font-semibold text-white`}
              >
                구분
              </th>
              <td className="text-text px-2 py-3 text-center align-middle">
                {item.name}
              </td>
            </tr>
            <tr className="hover:bg-black/10">
              <th
                className={`${headerClass} px-2 py-3 text-center align-middle text-sm font-semibold text-white`}
              >
                단가
              </th>
              <td className="text-text px-2 py-3 text-center align-middle">
                {editablePrice ? (
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    enterKeyHint="next"
                    autoFocus
                    value={price}
                    onChange={(e) =>
                      setPrice(e.target.value.replace(/[^\d]/g, ""))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document.getElementById("menu-count")?.focus();
                      }
                    }}
                    className="border-line text-text box-border h-8 w-full max-w-[140px] rounded border bg-transparent px-2 text-center outline-none"
                  />
                ) : (
                  formatAmount(item.price)
                )}
              </td>
            </tr>
            <tr className="hover:bg-black/10">
              <th
                className={`${headerClass} px-2 py-3 text-center align-middle text-sm font-semibold text-white`}
              >
                단위
              </th>
              <td className="text-text px-2 py-3 text-center align-middle">
                {item.unit}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex items-center justify-center gap-2">
          <label
            htmlFor="menu-count"
            className="text-text text-sm font-semibold"
          >
            수 량
          </label>
          <input
            id="menu-count"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            enterKeyHint="done"
            autoFocus={!editablePrice}
            value={count}
            onChange={(e) => setCount(e.target.value.replace(/[^\d]/g, ""))}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSubmit();
            }}
            className="border-line w-28 rounded border bg-transparent px-2 py-1.5 text-center outline-none"
          />
        </div>

        <p className="text-error text-right text-sm font-bold">
          합계 금액: {formatAmount(total)}
        </p>

        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={onBack}
            disabled={isPending}
            className="border-error bg-surface text-error hover:bg-error min-w-[80px] rounded-md border px-2 py-2 text-sm font-bold transition hover:text-white disabled:opacity-60"
          >
            뒤 로
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={isPending}
            className={`bg-surface min-w-[80px] rounded-md border px-2 py-2 text-sm font-bold transition hover:text-white disabled:opacity-60 ${buttonClass}`}
          >
            {onConfirm ? "추 가" : isPending ? "담는 중..." : "전 송"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
