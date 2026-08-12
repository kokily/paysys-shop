import { checkAuthAction } from "@/actions/auth";
import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "서비스 로그인 - 행사전표시스템",
};

export default async function LoginPage() {
  const auth = await checkAuthAction();

  if (auth.ok && auth.user) {
    redirect("/member");
  }

  return <LoginForm />;
}
