import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/require-admin";
import { listUsersAction } from "@/actions/users";
import PageTemplate from "@/components/template/PageTemplate";
import ListUsers from "@/components/users/list/ListUsers";

export const metadata: Metadata = {
  title: "사용자 리스트 - 행사전표시스템",
};

type Props = {
  searchParams: Promise<{ username?: string }>;
};

/** /users — 승인된 사용자 목록 (관리자) */
export default async function UsersPage({ searchParams }: Props) {
  const me = await requireAdmin();
  const { username } = await searchParams;
  const q = username?.trim() ?? "";

  const result = await listUsersAction({ username: q });

  if (!result.ok) {
    return (
      <PageTemplate native="member" username={me.username} admin={me.admin}>
        <ListUsers
          initialUsers={[]}
          initialCursor={null}
          initialHasMore={false}
          username={q}
          meId={me.user_id}
        />
      </PageTemplate>
    );
  }

  return (
    <PageTemplate native="member" username={me.username} admin={me.admin}>
      <ListUsers
        initialUsers={result.users}
        initialCursor={result.nextCursor}
        initialHasMore={result.hasMore}
        username={q}
        meId={me.user_id}
      />
    </PageTemplate>
  );
}
