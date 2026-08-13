"use client";

import type { ItemRow } from "@/types/items";

type Props = {
  items: ItemRow[];
  onSelect: (item: ItemRow) => void;
  onFilterDivide: (divide: string) => void;
  onFilterNative: (native: string) => void;
};

function formatPrice(price: number) {
  return `${price.toLocaleString("ko-KR")}원`;
}

/** 품목 리스트 (기존 ItemsTable 수치에 맞춤) */
export default function ItemsTable({
  items,
  onSelect,
  onFilterDivide,
  onFilterNative,
}: Props) {
  return (
    <div className="mt-4 w-full overflow-hidden rounded-[0.8rem]">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr>
            <th className="bg-member px-1 py-4 text-center font-semibold text-white">
              분류
            </th>
            <th className="bg-member px-1 py-4 text-center font-semibold text-white">
              구분
            </th>
            <th className="bg-member px-1 py-4 text-center font-semibold text-white">
              품명
            </th>
            <th className="bg-member px-1 py-4 text-center font-semibold text-white">
              단위
            </th>
            <th className="bg-member px-1 py-4 text-center font-semibold text-white">
              단가
            </th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-text-secondary py-8 text-center">
                데이터가 없습니다.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id} className="hover:bg-[rgba(255,187,0,0.2)]">
                <td className="px-1 py-4 text-center break-keep">
                  <button
                    type="button"
                    onClick={() => onFilterNative(item.native)}
                    className="text-text hover:underline"
                  >
                    {item.native}
                  </button>
                </td>
                <td className="px-1 py-4 text-center break-keep">
                  <button
                    type="button"
                    onClick={() => onFilterDivide(item.divide)}
                    className="text-text hover:underline"
                  >
                    {item.divide}
                  </button>
                </td>
                <td className="px-1 py-4 text-center break-keep">
                  <button
                    type="button"
                    onClick={() => onSelect(item)}
                    className="text-text hover:underline"
                  >
                    {item.name}
                  </button>
                </td>
                <td className="text-text px-1 py-4 text-center break-keep">
                  {item.unit}
                </td>
                <td className="text-text px-1 py-4 text-center break-keep">
                  {formatPrice(item.price)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
