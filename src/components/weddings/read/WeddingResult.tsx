import type { Wedding } from "@/types/wedding";
import { formatAmount } from "@/lib/format";
import { weddingAllCost, weddingMethodLabels } from "@/lib/wedding/calc";

type Props = {
  wedding: Wedding;
  totals: ReturnType<typeof weddingAllCost>;
};

type CardProps = {
  side: "husband" | "bride";
  badge: string;
  total: number;
  deduct: number;
  payment: number;
};

function PersonCard({ side, badge, total, deduct, payment }: CardProps) {
  const who = side === "husband" ? "신랑" : "신부";
  return (
    <div className={`settle-card ${side}`}>
      <div className="settle-card-head">
        <h4>{who}님 결제 내역</h4>
        <span>{badge}</span>
      </div>
      <div className="settle-row">
        <span>· {who} 총 발생 비용</span>
        <span>{formatAmount(total)}</span>
      </div>
      <div className="settle-row deduct">
        <span>· 기납부 예약금 차감</span>
        <span>- {formatAmount(deduct)}</span>
      </div>
      <div className="settle-final">
        <span>최종 결제 금액</span>
        <strong>{formatAmount(payment)}</strong>
      </div>
    </div>
  );
}

export default function WeddingResult({ wedding, totals }: Props) {
  const labels = weddingMethodLabels(wedding);
  const badge = `${labels.meal_method} 기준`;

  // 기납부(예약금 + 선입금) — weddingAllCost 계산식과 동일
  const husbandDeduct = wedding.husband_reserve + wedding.husband_pre_deposit;
  const brideDeduct = wedding.bride_reserve + wedding.bride_pre_deposit;
  const allDeduct = totals.all_cost - totals.all_payment;

  return (
    <div className="settle">
      <div className="settle-summary">
        <div className="settle-item">
          <span className="settle-label">웨딩 전체 발생 비용 (A)</span>
          <strong>{formatAmount(totals.all_cost)}</strong>
        </div>
        <span className="settle-op">−</span>
        <div className="settle-item">
          <span className="settle-label">총 기납부 예약금 (B)</span>
          <strong className="deduct">{formatAmount(allDeduct)}</strong>
        </div>
        <span className="settle-op">=</span>
        <div className="settle-item">
          <span className="settle-label">당일 최종 정산 총액 (A − B)</span>
          <strong className="final">{formatAmount(totals.all_payment)}</strong>
        </div>
      </div>

      <div className="settle-cards">
        <PersonCard
          side="husband"
          badge={badge}
          total={totals.husband_payment + husbandDeduct}
          deduct={husbandDeduct}
          payment={totals.husband_payment}
        />
        <PersonCard
          side="bride"
          badge={badge}
          total={totals.bride_payment + brideDeduct}
          deduct={brideDeduct}
          payment={totals.bride_payment}
        />
      </div>

      {allDeduct > 0 && (
        <div className="settle-notice">
          <span className="settle-notice-label">
            💡 <strong>안내:</strong>
          </span>
          <div className="settle-notice-body">
            <p>
              [최종 결제 금액]은 기존에 계약 시 납부하신 예약금(
              {formatAmount(allDeduct)})이 이미 차감 반영된 금액입니다.
            </p>
            <p>
              재결제를 원하실 경우 일주일 이내 카드와 영수증 지참하여
              방문해주세요.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
