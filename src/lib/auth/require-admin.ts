import { redirect } from "next/navigation";
import { checkAuthAction } from "@/actions/auth";
import { requireAuth } from "@/lib/auth/require-auth";

/**
 * 페이지용 — 관리자 아니면 /member로 이동
 */
export async function requireAdmin() {
  const user = await requireAuth();

  if (!user.admin) {
    redirect("/member");
  }

  return user;
}

/**
 * Server Action용 — 관리자 아니면 { ok: false, error }
 */
export async function getAdminUser() {
  const auth = await checkAuthAction();

  if (!auth.ok || !auth.user) {
    return {
      ok: false as const,
      error: "로그인이 만료되었습니다. 새로고침 후 다시 로그인해주세요.",
    };
  }

  if (!auth.user.admin) {
    return {
      ok: false as const,
      error: "관리자 권한이 필요합니다.",
    };
  }

  return {
    ok: true as const,
    user: auth.user,
  };
}
