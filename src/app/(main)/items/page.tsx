import { Metadata } from "next";
import { listItemsAction } from "@/actions/items";
import { requireAdmin } from "@/lib/auth/require-admin";
import PageTemplate from "@/components/template/PageTemplate";
import ListItems from "@/components/items/list/ListItems";

export const metadata: Metadata = {
  title: "품목 리스트 - 행사전표시스템",
};

type Props = {
  searchParams: Promise<{
    name?: string;
    divide?: string;
    native?: string;
  }>;
};

export default async function ItemsPage({ searchParams }: Props) {
  const admin = await requireAdmin();
  const sp = await searchParams;

  const name = sp.name?.trim() ?? "";
  const divide = sp.divide?.trim() ?? "";
  const native = sp.native?.trim() ?? "";

  const result = await listItemsAction({ name, divide, native });

  return (
    <PageTemplate native="member" username={admin.username} admin={admin.admin}>
      <ListItems
        initialItems={result.ok ? result.items : []}
        initialCursor={result.ok ? result.nextCursor : null}
        initialHasMore={result.ok ? result.hasMore : false}
        name={name}
        divide={divide}
        native={native}
      />
    </PageTemplate>
  );
}
