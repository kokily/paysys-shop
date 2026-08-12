import { redirect } from "next/navigation";
import { checkAuthAction } from "@/actions/auth";

export async function requireAuth() {
  const auth = await checkAuthAction();

  if (!auth.ok || !auth.user) {
    redirect("/");
  }

  return auth.user;
}
