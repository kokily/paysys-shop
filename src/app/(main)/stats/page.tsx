import { Metadata } from "next";
import { itemStatsAction } from "@/actions/stats";
import { requireAdmin } from "@/lib/auth/require-admin";
import { toKstDate } from "@/lib/stats/period";
import PageTemplate from "@/components/template/PageTemplate";
import ItemStats from "@/components/stats/ItemStats";

export const metadata: Metadata = {
  title: "품목 통계 - 행사전표시스템",
};

type Props = {
  searchParams: Promise<{
    divide?: string | string[];
    from?: string;
    to?: string;
  }>;
};

/** /stats - 품류별 월간 판매 통계 (관리자) */
export default async function StatsPage({ searchParams }: Props) {
  const admin = await requireAdmin();
  const sp = await searchParams;

  const today = toKstDate(new Date());
  const divides = [sp.divide ?? []].flat().filter(Boolean);
  const from = sp.from?.trim() || `${today.slice(0, 4)}-01-01`;
  const to = sp.to?.trim() || today;

  const result =
    divides.length > 0 ? await itemStatsAction({ divides, from, to }) : null;

  return (
    <PageTemplate native="member" username={admin.username} admin={admin.admin}>
      <ItemStats
        divides={divides}
        from={from}
        to={to}
        rows={result?.ok ? result.rows : []}
        months={result?.ok ? result.months : []}
        error={result && !result.ok ? result.error : null}
        searched={result !== null}
      />
    </PageTemplate>
  );
}
