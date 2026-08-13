"use client";

import { formatAmount } from "@/lib/format";
import { CartItem } from "@/types/cart";

type Props = {
  items: CartItem[];
  isPending: boolean;
  onRemoveOne: (itemId: string, name: string) => void;
};

export default function CartItemsTable({
  items,
  isPending,
  onRemoveOne,
}: Props) {
  return (
    <div className="w-full max-w-[720px] overflow-hidden rounded-[0.8rem]">
      <table className="w-full table-fixed border-collapse">
        <thead>
          {["적용", "수량", "단가", "삭제"].map((h) => (
            <th
              key={h}
              className="bg-member px-1 py-3 text-center text-sm font-semibold text-white"
            >
              {h}
            </th>
          ))}
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="text-text-secondary py-8 text-center text-sm"
              >
                데이터가 없습니다
              </td>
            </tr>
          ) : (
            items.map((item, idx) => (
              <tr key={`${item.id}-${idx}`} className="hover:bg-black/10">
                <td className="text-text px-1 py-3 text-center text-sm break-keep">
                  [ {item.native} ]<br />
                  {item.divide}
                </td>
                <td className="text-text px-1 py-3 text-center text-sm">
                  {formatAmount(item.count, item.unit)}
                </td>
                <td className="text-text px-1 py-3 text-center text-sm">
                  {formatAmount(item.price)}
                  <br />
                  <strong>{formatAmount(item.amount)}</strong>
                </td>
                <td className="px-1 py-3 text-center">
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => onRemoveOne(item.id, item.name)}
                    className="border-error text-error hover:bg-error rounded-md border px-2 py-1 text-xs font-bold transition hover:text-white disabled:opacity-60"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
