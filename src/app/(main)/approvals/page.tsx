import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db";
import PageTemplate from "@/components/template/PageTemplate";
import PendingUserList from "@/components/approvals/PendingUserList";

export const metadata: Metadata = {
  title: "가입 승인 - 행사전표시스템",
};

/** /approvals — 가입 신청 승인 (관리자) */
export default async function ApprovalsPage() {
  const me = await requireAdmin();

  const pending = await prisma.user.findMany({
    where: { approved: false },
    orderBy: { created_at: "asc" },
    select: {
      id: true,
      username: true,
      created_at: true,
    },
  });

  return (
    <PageTemplate native="member" username={me.username} admin={me.admin}>
      <h1 className="text-text mb-2 text-xl font-bold">가입 승인</h1>
      <p className="text-text-secondary mb-6 text-sm">
        대기 {pending.length}명
      </p>
      <PendingUserList users={pending} />
    </PageTemplate>
  );
}
