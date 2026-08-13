"use client";

import type { Dispatch, SetStateAction } from "react";
import type { NativeType } from "@/lib/data/native";
import type { MenuItemRow } from "@/types/menu";
import type { BillDraftItem } from "@/types/bill";
import Modal from "@/components/ui/Modal";
import MenuListModal from "@/components/home/MenuListModal";
import MenuAddModal from "@/components/home/MenuAddModal";
import { menu } from "@/lib/data/menu";

type Props = {
  editing: boolean;
  addNative: NativeType | "__pick__" | null;
  setAddNative: Dispatch<SetStateAction<NativeType | "__pick__" | null>>;
  addDivide: string | null;
  setAddDivide: Dispatch<SetStateAction<string | null>>;
  addItem: MenuItemRow | null;
  setAddItem: Dispatch<SetStateAction<MenuItemRow | null>>;
  closeAddFlow: () => void;
  addNativeBg: string;
  setDraft: Dispatch<SetStateAction<BillDraftItem[]>>;
  showToast: (payload: { type: "success" | "error"; message: string }) => void;
};

/** 0~3단계 품목 추가 모달들 */
export default function BillAddFlow({
  editing,
  addNative,
  setAddNative,
  addDivide,
  setAddDivide,
  addItem,
  setAddItem,
  closeAddFlow,
  addNativeBg,
  setDraft,
  showToast,
}: Props) {
  if (!editing) return null;

  return (
    <>
      {/** 0단계: 회원/준회원/일반 */}
      {addNative === "__pick__" && (
        <Modal
          title="회원 구분"
          onClose={closeAddFlow}
          headerClassName="bg-member"
          maxWidthClassName="max-w-[720px]"
          fullHeight
        >
          {({ close }) => (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex flex-1 flex-col items-center justify-center gap-3 overflow-y-auto p-4">
                {(
                  [
                    ["member", "회원", "bg-member"],
                    ["associate", "준회원", "bg-associate"],
                    ["general", "일반", "bg-general"],
                  ] as const
                ).map(([value, label, bg]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setAddNative(value);
                      setAddDivide("__pick__");
                    }}
                    className={`flex h-[55px] w-full max-w-[320px] items-center justify-center px-2 text-[1.1rem] font-bold text-white brightness-90 transition hover:brightness-100 ${bg}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="border-line flex justify-center border-t p-3">
                <button
                  type="button"
                  onClick={close}
                  className="border-error text-error min-w-[80px] rounded-md border px-3 py-2 text-sm font-bold"
                >
                  닫 기
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}

      {/** 1단계: 구분(식사/와인 등) 선택 */}
      {addNative && addNative !== "__pick__" && addDivide === "__pick__" && (
        <Modal
          title="품목 구분"
          onClose={closeAddFlow}
          headerClassName={addNativeBg}
          maxWidthClassName="max-w-[720px]"
          fullHeight
        >
          {({ close }) => (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4">
                <div className="my-auto grid w-full grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3">
                  {menu.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setAddDivide(m.divide)}
                      className={`flex h-[55px] items-center justify-center px-2 text-[1.1rem] font-bold text-white brightness-90 transition hover:brightness-100 ${addNativeBg}`}
                    >
                      {m.divide}
                    </button>
                  ))}
                </div>
              </div>
              <div className="border-line flex justify-center border-t p-3">
                <button
                  type="button"
                  onClick={close}
                  className="border-error text-error min-w-[80px] rounded-md border px-3 py-2 text-sm font-bold"
                >
                  닫 기
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}

      {/* [추가] 2단계: 해당 구분 품목 리스트 */}
      {addNative &&
        addNative !== "__pick__" &&
        addDivide &&
        addDivide !== "__pick__" && (
          <MenuListModal
            native={addNative}
            divide={addDivide}
            onClose={closeAddFlow}
            onSelect={setAddItem}
          />
        )}

      {/* [추가] 3단계: 수량/단가 → draft에 push */}
      {addItem && (
        <MenuAddModal
          item={addItem}
          onBack={() => setAddItem(null)}
          onClose={closeAddFlow}
          onConfirm={({ count, price }) => {
            setDraft((prev) => [
              ...prev,
              {
                id: addItem.id,
                name: addItem.name,
                divide: addItem.divide,
                native: addItem.native,
                unit: addItem.unit,
                price: String(price),
                count: String(count),
              },
            ]);
            closeAddFlow();
            showToast({ type: "success", message: "품목이 추가되었습니다." });
          }}
        />
      )}
    </>
  );
}
