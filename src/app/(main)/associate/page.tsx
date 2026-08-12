import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/require-auth";
import PageTemplate from "@/components/template/PageTemplate";
import HomeGrid from "@/components/home/HomeGrid";

export const metadata: Metadata = {
  title: "준회원 전표작성 - 행사전표시스템",
};

/** /associate - 준회원 홈 */
export default async function AssociatePage() {
  const user = await requireAuth();

  return (
    <PageTemplate
      native="associate"
      username={user.username}
      admin={user.admin}
    >
      <HomeGrid native="associate" />
    </PageTemplate>
  );
}
