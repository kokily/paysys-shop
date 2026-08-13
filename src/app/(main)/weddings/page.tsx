import { listWeddingsAction } from "@/actions/weddings";
import PageTemplate from "@/components/template/PageTemplate";
import ListWeddings from "@/components/weddings/ListWeddings";
import { requireAdmin } from "@/lib/auth/require-admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "웨딩빌지 - 행사전표시스템",
};

/** /weddings - 웨딩빌지 목록 (관리자) */
export default async function WeddingsPage() {
  const admin = await requireAdmin();
  const result = await listWeddingsAction();

  return (
    <PageTemplate native="member" username={admin.username} admin={admin.admin}>
      <ListWeddings
        initialWeddings={result.ok ? result.weddings : []}
        initialCursor={result.ok ? result.nextCursor : null}
        initialHasMore={result.ok ? result.hasMore : false}
      />
    </PageTemplate>
  );
}
