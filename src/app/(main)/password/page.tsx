import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import PageTemplate from "@/components/template/PageTemplate";
import { requireAuth } from "@/lib/auth/require-auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "비밀번호 변경 - 행사전표시스템",
};

export default async function PasswordPage() {
  const user = await requireAuth();

  return (
    <PageTemplate native="member" username={user.username} admin={user.admin}>
      <ChangePasswordForm />
    </PageTemplate>
  );
}
