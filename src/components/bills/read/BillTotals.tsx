"use client";

import { formatAmount } from "@/lib/format";

type Props = {
  displayTotal: number;
  reserve: number | null;
  payable: number;
};

/** 결제금액/예약금 */
export default function BillTotals({ displayTotal, reserve, payable }: Props) {
  return (
    <div className="mt-8 flex w-full flex-col items-end pr-4">
      {reserve && reserve > 0 ? (
        <>
          <div className="text-text mb-3 print:text-black">
            총 금액 :{" "}
            <span className="text-[1.5rem] text-gray-500">
              {formatAmount(displayTotal)}
            </span>
          </div>
          <div className="text-text mb-3 print:text-black">
            예약금 :{" "}
            <span className="text-error text-[1.5rem]">
              {formatAmount(reserve)}
            </span>
          </div>
          <div className="text-text mb-3 print:text-black">
            결제금액 :{" "}
            <span className="text-[1.9rem] text-blue-600">
              {formatAmount(payable)}
            </span>
          </div>
        </>
      ) : (
        <div className="text-text mb-3 print:text-black">
          결제금액 :{" "}
          <span className="text-[1.9rem] text-blue-600">
            {formatAmount(displayTotal)}
          </span>
        </div>
      )}
    </div>
  );
}
