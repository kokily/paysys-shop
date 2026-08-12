import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/require-auth";
import PageTemplate from "@/components/template/PageTemplate";
import HomeGrid from "@/components/home/HomeGrid";

export const metadata: Metadata = {
  title: "일반 전표작성 - 행사전표시스템",
};

/** /general - 일반 홈 */
export default async function GeneralPage() {
  const user = await requireAuth();

  return (
    <PageTemplate native="general" username={user.username} admin={user.admin}>
      <HomeGrid native="general" />
    </PageTemplate>
  );
}
