import { BillRow } from "@/types/bill";

type Props = {
  bills: BillRow[];
  onSelect: (id: string) => void;
  onFilterHall: (hall: string) => void;
  onFilterUser: (userId: string) => void;
  /** NEW 표시할 bill id 집합 (관리자/프론트만 ListBills에서 넘김) */
  newBillIds?: Set<string>;
};

function formatBillDate(value: Date | string) {
  const d = value instanceof Date ? value : new Date(value);
  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}.`;
}

export default function BillsTable({
  bills,
  onSelect,
  onFilterHall,
  onFilterUser,
  newBillIds,
}: Props) {
  return (
    <div className="mt-2 w-full overflow-hidden rounded-[0.8rem]">
      <table className="w-full table-fixed border-collapse">
        <colgroup>
          <col className="w-[20%]" />
          <col className="w-[12%]" />
          <col className="w-[34%]" />
          <col className="w-[16%]" />
          <col className="w-[18%]" />
        </colgroup>
        <thead>
          <tr>
            {["날짜", "구분", "행사명", "장소", "작성자"].map((h) => (
              <th
                key={h}
                className="bg-member px-1 py-3 text-center text-sm font-semibold whitespace-nowrap text-white sm:px-2 sm:py-4 sm:text-base"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bills.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-text-secondary py-8 text-center">
                작성된 전표가 없습니다.
              </td>
            </tr>
          ) : (
            bills.map((bill) => (
              <tr key={bill.id} className="hover:bg-black/10">
                <td className="text-text px-1 py-4 text-center text-sm whitespace-nowrap">
                  {formatBillDate(bill.created_at)}
                </td>
                <td className="text-text overflow-hidden px-2 py-4 text-center text-sm whitespace-nowrap">
                  {bill.native}
                </td>
                <td className="overflow-hidden px-2 py-4 pr-4 text-center text-sm">
                  <button
                    type="button"
                    onClick={() => onSelect(bill.id)}
                    title={bill.title}
                    className="text-member hover:bg-member flex w-full items-center justify-center gap-1 truncate rounded-[6px] px-1 py-[0.3rem] font-bold transition hover:text-white"
                  >
                    {/* 오늘 미확인 전표 배지 */}
                    {newBillIds?.has(bill.id) && (
                      <span
                        className="text-error shrink-0 text-[0.7rem] font-extrabold"
                        aria-label="새 전표"
                      >
                        NEW
                      </span>
                    )}
                    <span className="truncate">{bill.title}</span>
                  </button>
                </td>
                <td className="text-text overflow-hidden px-2 py-4 pl-4 text-center text-sm break-keep">
                  <button
                    type="button"
                    onClick={() => onFilterHall(bill.hall)}
                    className="text-text hover:text-member transition active:translate-y-[2px]"
                  >
                    {bill.hall}
                  </button>
                </td>
                <td className="text-text overflow-hidden px-2 py-4 text-center text-sm whitespace-nowrap">
                  {bill.user_id ? (
                    <button
                      type="button"
                      onClick={() => onFilterUser(bill.user_id!)}
                      className="text-text hover:text-member transition active:translate-y-[2px]"
                    >
                      {bill.username ?? "-"} 님
                    </button>
                  ) : (
                    <span className="text-text-secondary">-</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
