"use client";

import { useEffect, useState, useTransition } from "react";
import { listMenuAction } from "@/actions/menu";
import { getNativeLabel, NativeType } from "@/lib/data/native";
import { MenuItemRow } from "@/types/menu";
import { formatAmount } from "@/lib/format";
import Modal from "../ui/Modal";

type Props = {
  native: NativeType;
  divide: string;
  onClose: () => void;
  onSelect: (item: MenuItemRow) => void;
};

export default function MenuListModal({
  native,
  divide,
  onClose,
  onSelect,
}: Props) {
  const [items, setItems] = useState<MenuItemRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const headerClass =
    native === "member"
      ? "bg-member"
      : native === "associate"
        ? "bg-associate"
        : "bg-general";

  const buttonClass =
    native === "member"
      ? "bg-member"
      : native === "associate"
        ? "bg-associate"
        : "bg-general";

  useEffect(() => {
    startTransition(async () => {
      const result = await listMenuAction({
        native: getNativeLabel(native),
        divide,
      });

      if (!result.ok) {
        setError(result.error);
        return;
      }

      setItems(result.items);
    });
  }, [native, divide]);

  return (
    <Modal
      title={divide}
      onClose={onClose}
      headerClassName={headerClass}
      maxWidthClassName="max-w-[720px]"
      fullHeight
    >
      {({ close }) => (
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4">
            {isPending && (
              <p className="text-text-secondary my-auto py-8 text-center text-sm">
                불러오는 중...
              </p>
            )}
            {!isPending && error && (
              <p className="text-error my-auto py-8 text-center text-sm">
                {error}
              </p>
            )}
            {!isPending && !error && items.length === 0 && (
              <p className="text-text-secondary my-auto py-8 text-center text-sm">
                품목이 없습니다
              </p>
            )}
            {!isPending && items.length > 0 && (
              <div className="my-auto grid w-full grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3">
                {items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelect(item)}
                    className={`flex h-[55px] w-full items-center justify-center px-2 text-[1.1rem] font-bold text-white brightness-90 transition hover:brightness-100 active:translate-y-[3px] ${buttonClass} `}
                  >
                    {item.name} | {formatAmount(item.price)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-line flex shrink-0 justify-center border-t p-3">
            <button
              type="button"
              onClick={close}
              className="border-error bg-surface text-error hover:bg-error min-w-[80px] rounded-md border px-3 py-2 text-sm font-bold transition hover:text-white"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
