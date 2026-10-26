"use client";

import type { ItemStatsRow } from "@/types/stats";
import StatsFilter from "@/components/stats/StatsFilter";
import StatsTable from "@/components/stats/StatsTable";

type Props = {
  divides: string[];
  from: string;
  to: string;
  rows: ItemStatsRow[];
  months: string[];
  error: string | null;
  searched: boolean;
};

/** 품류별 월간 판매 통계 */
export default function ItemStats({
  divides,
  from,
  to,
  rows,
  months,
  error,
  searched,
}: Props) {
  return (
    <div className="mb-4 flex w-full min-w-0 flex-col items-center">
      <h1 className="text-text text-center text-xl font-bold">품목 통계</h1>

      <StatsFilter initialDivides={divides} initialFrom={from} initialTo={to} />

      {error ? (
        <p className="text-error mt-6 text-sm font-semibold">{error}</p>
      ) : searched ? (
        <StatsTable rows={rows} months={months} from={from} to={to} />
      ) : (
        <p className="text-text-secondary mt-6 text-sm">
          품류를 선택하고 조회를 눌러주세요.
        </p>
      )}
    </div>
  );
}
