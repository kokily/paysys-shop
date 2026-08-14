"use client";

import type { WeddingRow } from "@/types/wedding";

type Props = {
  weddings: WeddingRow[];
  onSelect: (id: string) => void;
};

export default function WeddingsTable({ weddings, onSelect }: Props) {
  return (
    <div className="mx-auto mt-5 mb-6 w-full max-w-[600px] overflow-hidden rounded-[0.8rem]">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr>
            {["웨딩일자", "웨딩시간", "신랑", "신부"].map((h) => (
              <th
                key={h}
                className="bg-wedding px-1 py-2 text-center text-base font-normal text-white"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weddings.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="text-text-secondary py-8 text-center text-base"
              >
                웨딩 데이터가 없습니다
              </td>
            </tr>
          ) : (
            weddings.map((w) => (
              <tr
                key={w.id}
                onClick={() => onSelect(w.id)}
                className="cursor-pointer"
              >
                <td className="text-wedding hover:bg-wedding p-[0.3rem] py-2 text-center text-base transition hover:text-white">
                  {new Date(w.wedding_at).toLocaleDateString("ko-KR")}
                </td>
                <td className="text-wedding hover:bg-wedding p-[0.3rem] py-2 text-center text-base transition hover:text-white">
                  {w.event_at}
                </td>
                <td className="text-wedding hover:bg-wedding p-[0.3rem] py-2 text-center text-base transition hover:text-white">
                  {w.husband_name}
                </td>
                <td className="text-wedding hover:bg-wedding p-[0.3rem] py-2 text-center text-base transition hover:text-white">
                  {w.bride_name}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
