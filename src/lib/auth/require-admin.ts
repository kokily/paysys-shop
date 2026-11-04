import type { Permission } from "./permissions";
import { redirect } from "next/navigation";
import { checkAuthAction } from "@/actions/auth";
import { requireAuth } from "@/lib/auth/require-auth";
import { hasPermission } from "./permissions";

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

/**
 * 페이지용 - 관리자 또는 해당 권한 보유자만, 아니면 /member로 이동
 */
export async function requirePermission(permission: Permission) {
  const user = await requireAuth();

  if (!hasPermission(user, permission)) {
    redirect("/member");
  }

  return user;
}

/**
 * Server Action용 - 관리자 또는 해당 권한 보유자만
 */
export async function getPermittedUser(permission: Permission) {
  const auth = await checkAuthAction();

  if (!auth.ok || !auth.user) {
    return {
      ok: false as const,
      error: "로그인이 만료되었습니다. 새로고침 후 다시 로그인 해주세요",
    };
  }

  if (!hasPermission(auth.user, permission)) {
    return {
      ok: false as const,
      error: "접근 권한이 없습니다",
    };
  }

  return {
    ok: true as const,
    user: auth.user,
  };
}
