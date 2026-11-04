import PageTemplate from "@/components/template/PageTemplate";
import WeddingForm from "@/components/weddings/form/WeddingForm";
import { requireAdmin } from "@/lib/auth/require-admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "웨딩 작성 - 행사전표시스템",
};

/** /wedding/add */
export default async function AddWeddingPage() {
  const user = await requireAdmin();

  return (
    <PageTemplate native="member" username={user.username} admin={user.admin}>
      <WeddingForm mode="add" />
    </PageTemplate>
  );
}
