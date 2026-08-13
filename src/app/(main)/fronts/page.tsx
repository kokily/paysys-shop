import { Metadata } from "next";
import { listBillsAction } from "@/actions/bills";
import { requireAuth } from "@/lib/auth/require-auth";
import ListBills from "@/components/fronts/ListBills";
import PageTemplate from "@/components/template/PageTemplate";

export const metadata: Metadata = {
  title: "전표조회 - 행사전표시스템",
};

type Props = {
  searchParams: Promise<{
    title?: string;
    hall?: string;
    userId?: string;
  }>;
};

/** /fronts - 프런트 전표 현황 */
export default async function FrontsPage({ searchParams }: Props) {
  const user = await requireAuth();
  const sp = await searchParams;

  const title = sp.title?.trim() ?? "";
  const hall = sp.hall?.trim() ?? "";
  const userId = sp.userId?.trim() ?? "";

  const result = await listBillsAction({ title, hall, userId });

  return (
    <PageTemplate native="member" username={user.username} admin={user.admin}>
      <ListBills
        initialBills={result.ok ? result.bills : []}
        initialCursor={result.ok ? result.nextCursor : null}
        initialHasMore={result.ok ? result.hasMore : false}
        title={title}
        hall={hall}
        userId={userId}
        meId={user.user_id}
        username={user.username}
        admin={user.admin}
      />
    </PageTemplate>
  );
}
