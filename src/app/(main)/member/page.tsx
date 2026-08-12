import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/require-auth";
import PageTemplate from "@/components/template/PageTemplate";

export const metadata: Metadata = {
  title: "회원 전표작성 - 행사전표시스템",
};

/** /member - 회원 홈 */
export default async function MemberPage() {
  const user = await requireAuth();

  return (
    <PageTemplate native="member" username={user.username} admin={user.admin}>
      회원 홈
    </PageTemplate>
  );
}
