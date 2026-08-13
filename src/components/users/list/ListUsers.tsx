"use client";

import { useCallback, useState, useTransition } from "react";
import { listUsersAction } from "@/actions/users";
import { useObserver } from "@/hooks/useObserver";
import type { UserRow } from "@/types/user";
import UsersSearch from "@/components/users/list/UsersSearch";
import UsersTable from "@/components/users/list/UsersTable";
import ReadUserModal from "@/components/users/read/ReadUserModal";

type Props = {
  initialUsers: UserRow[];
  initialCursor: string | null;
  initialHasMore: boolean;
  username: string;
  meId: string;
};

/** 사용자 리스트 + 인피니트 스크롤 + 상세 모달 */
export default function ListUsers({
  initialUsers,
  initialCursor,
  initialHasMore,
  username,
  meId,
}: Props) {
  const [users, setUsers] = useState(initialUsers);
  const [cursor, setCursor] = useState(initialCursor);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [selected, setSelected] = useState<UserRow | null>(null);
  const [isPending, startTransition] = useTransition();

  const loadMore = useCallback(() => {
    if (!hasMore || isPending || !cursor) return;

    startTransition(async () => {
      const result = await listUsersAction({ username, cursor });
      if (!result.ok) return;

      setUsers((prev) => [...prev, ...result.users]);
      setCursor(result.nextCursor);
      setHasMore(result.hasMore);
    });
  }, [cursor, hasMore, isPending, username]);

  const onIntersect: IntersectionObserverCallback = useCallback(
    ([entry]) => {
      if (entry?.isIntersecting) loadMore();
    },
    [loadMore],
  );

  const { setTarget } = useObserver({ onIntersect });

  return (
    <div className="mb-4 flex flex-col items-center">
      <h1 className="text-text text-center text-xl font-bold">사용자 리스트</h1>
      <UsersSearch initialUsername={username} />
      <UsersTable users={users} onSelect={setSelected} />

      {hasMore && (
        <div ref={setTarget} className="text-text-secondary py-6 text-sm">
          {isPending ? "불러오는 중..." : ""}
        </div>
      )}

      {selected && (
        <ReadUserModal
          user={selected}
          meId={meId}
          onClose={() => setSelected(null)}
          onUpdated={(next) => {
            setSelected(next);
            setUsers((prev) => prev.map((u) => (u.id === next.id ? next : u)));
          }}
          onDeleted={(id) => {
            setUsers((prev) => prev.filter((u) => u.id !== id));
          }}
        />
      )}
    </div>
  );
}
