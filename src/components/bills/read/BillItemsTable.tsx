"use client";

import type { CartItem } from "@/types/cart";
import type { BillDraftItem } from "@/types/bill";
import { formatAmount } from "@/lib/format";
import { formatDigits, nativeClass, NATIVE_OPTIONS } from "@/lib/bill/helper";

type Props = {
  editing: boolean;
  displayItems: CartItem[];
  draft: BillDraftItem[];
  isPending: boolean;
  nativePendingIndex: number | null;
  onNativeChange: (index: number, native: string) => void;
  updateDraft: (index: number, field: "price" | "count", value: string) => void;
  setRemoveLineIndex: (index: number) => void;
  onStartAdd: () => void;
};

/** 품목 테이블 + edit inputs + hover × + + button */
export default function BillItemsTable({
  editing,
  displayItems,
  draft,
  isPending,
  nativePendingIndex,
  onNativeChange,
  updateDraft,
  setRemoveLineIndex,
  onStartAdd,
}: Props) {
  return (
    <>
      <table className="w-full table-fixed border-collapse overflow-hidden rounded-[0.8rem] print:rounded-none">
        <thead>
          <tr>
            {["구분", "상품명", "단가", "수량", "소계"].map((h) => (
              <th
                key={h}
                className="bg-[#4c6ef5] px-1 py-2 text-center font-semibold text-white"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayItems.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-text-secondary py-6 text-center">
                데이터가 없습니다.
              </td>
            </tr>
          ) : (
            displayItems.map((item, idx) => (
              <tr
                key={`${item.id}-${idx}`}
                className={`hover:bg-[#91a7ff] hover:text-white ${
                  editing ? "group" : ""
                }`}
              >
                <td
                  className={`px-1 py-2 text-center break-keep ${nativeClass(item.native)}`}
                >
                  {editing ? (
                    <select
                      value={draft[idx]?.native ?? item.native}
                      disabled={nativePendingIndex === idx || isPending}
                      onChange={(e) => onNativeChange(idx, e.target.value)}
                      className={`border-line bg-surface w-full max-w-[96px] rounded border px-1 py-1 text-center text-sm ${nativeClass(
                        draft[idx]?.native ?? item.native,
                      )}`}
                    >
                      {NATIVE_OPTIONS.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  ) : (
                    item.native
                  )}
                </td>
                <td className="text-text px-1 py-2 text-center break-keep print:text-black">
                  {item.name}
                </td>
                <td className="text-text px-1 py-2 text-center print:text-black">
                  {editing ? (
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatDigits(draft[idx]?.price ?? "")}
                      onChange={(e) =>
                        updateDraft(idx, "price", e.target.value)
                      }
                      className="border-line bg-surface text-text w-full max-w-[100px] rounded border px-1 py-1 text-center"
                    />
                  ) : (
                    formatAmount(item.price)
                  )}
                </td>
                <td className="text-text px-1 py-2 text-center print:text-black">
                  {editing ? (
                    <div className="flex items-center justify-center gap-1">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={draft[idx]?.count ?? ""}
                        onChange={(e) =>
                          updateDraft(idx, "count", e.target.value)
                        }
                        className="border-line bg-surface text-text w-full max-w-[72px] rounded border px-1 py-1 text-center"
                      />
                      <span className="text-text-secondary text-xs">
                        {item.unit}
                      </span>
                    </div>
                  ) : (
                    formatAmount(item.count, item.unit)
                  )}
                </td>
                <td className="px-1 py-2 text-center font-medium text-[#d027bf]">
                  <span className="relative inline-block pr-2">
                    {formatAmount(item.amount)}
                    {editing && (
                      <button
                        type="button"
                        disabled={isPending}
                        aria-label="품목 삭제"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRemoveLineIndex(idx);
                        }}
                        className="bg-error absolute -top-1.5 -right-0.5 z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] leading-none font-bold text-white opacity-50 transition group-hover:opacity-100 hover:opacity-100 disabled:opacity-40"
                      >
                        x
                      </button>
                    )}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {editing && (
        <div className="no-print mt-3 flex justify-center print:hidden">
          <button
            type="button"
            disabled={isPending}
            onClick={onStartAdd}
            className="border-error text-error hover:bg-error flex h-10 w-10 items-center justify-center rounded-full border-2 text-2xl leading-none font-bold transition hover:text-white disabled:opacity-60"
            aria-label="품목 추가"
          >
            +
          </button>
        </div>
      )}
    </>
  );
}
