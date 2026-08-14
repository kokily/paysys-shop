import { formatAmount } from "@/lib/format";
import { weddingAllCost } from "@/lib/wedding/calc";

type Props = {
  totals: ReturnType<typeof weddingAllCost>;
};

export default function WeddingResult({ totals }: Props) {
  return (
    <div className="read-wedding-contents">
      <table className="wedding-result">
        <tbody>
          <tr>
            <td colSpan={4}>
              <h3 className="all-cost">
                웨딩 총 비용: {formatAmount(totals.all_cost)}
              </h3>
              <h3 className="all-payment">
                결제 총 비용: {formatAmount(totals.all_payment)}
              </h3>
              <h3>신랑 총 비용: {formatAmount(totals.husband_payment)}</h3>
              <h3>신부 총 비용: {formatAmount(totals.bride_payment)}</h3>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
