import { BillRow } from "@/types/bill";

type Props = {
  bills: BillRow[];
  onSelect: (id: string) => void;
  onFilterHall: (hall: string) => void;
  onFilterUser: (userId: string) => void;
};

export default function BillsTable({
  bills,
  onSelect,
  onFilterHall,
  onFilterUser,
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
                className="bg-member px-2 py-4 text-center font-semibold text-white"
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
                <td className="text-text overflow-hidden px-2 py-4 text-center text-sm whitespace-nowrap">
                  {new Date(bill.created_at).toLocaleDateString("ko-KR")}
                </td>
                <td className="text-text overflow-hidden px-2 py-4 text-center text-sm whitespace-nowrap">
                  {bill.native}
                </td>
                <td className="overflow-hidden px-2 py-4 pr-4 text-center text-sm">
                  <button
                    type="button"
                    onClick={() => onSelect(bill.id)}
                    title={bill.title}
                    className="text-member hover:bg-member block w-full truncate rounded-[6px] px-1 py-[0.3rem] font-bold transition hover:text-white"
                  >
                    {bill.title}
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
