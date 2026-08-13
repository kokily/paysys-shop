"use client";

import type { BillDetail } from "@/types/bill";

type Props = {
  bill: BillDetail;
};

/** 작성자/일자/장소 표 */
export default function BillMeta({ bill }: Props) {
  return (
    <div className="my-8 ml-auto w-[280px] overflow-hidden rounded-[5px] bg-white p-4 text-[0.8rem] print:border print:border-black/20">
      <table className="w-full">
        <tbody>
          {(
            [
              ["작성자", `${bill.username ?? "-"} 님`],
              [
                "작성일자",
                new Date(bill.created_at).toLocaleDateString("ko-KR"),
              ],
              [
                "작성시간",
                new Date(bill.created_at).toLocaleTimeString("ko-KR"),
              ],
              ["행사장소", bill.hall],
            ] as const
          ).map(([label, value]) => (
            <tr key={label} className="hover:bg-black/10">
              <th className="bg-[#364fc7] px-1 py-1.5 text-center font-semibold text-white">
                {label}
              </th>
              <td className="px-1 py-1.5 text-center text-black">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
