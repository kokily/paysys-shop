import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWeddingAction } from "@/actions/weddings";
import PageTemplate from "@/components/template/PageTemplate";
import WeddingForm from "@/components/weddings/form/WeddingForm";
import { requireAdmin } from "@/lib/auth/require-admin";
import { weddingToForm } from "@/lib/wedding/constants";

export const metadata: Metadata = {
  title: "웨딩 수정 - 행사전표시스템",
};

type Props = {
  params: Promise<{ id: string }>;
};

/** /wedding/update/[id] */
export default async function UpdateWeddingPage({ params }: Props) {
  const user = await requireAdmin();
  const { id } = await params;
  const result = await getWeddingAction(id);

  if (!result.ok) notFound();

  return (
    <PageTemplate native="member" username={user.username} admin={user.admin}>
      <WeddingForm
        mode="update"
        weddingId={id}
        initial={weddingToForm(result.wedding)}
      />
    </PageTemplate>
  );
}
