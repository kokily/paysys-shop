"use server";

import {
  clearAuthCookies,
  getAccessToken,
  getRefreshToken,
  getSessionId,
  setAuthCookies,
} from "@/lib/auth/cookies";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import {
  createSession,
  revokeSession,
  rotateRefreshToken,
} from "@/lib/auth/session";
import { verifyAccessToken } from "@/lib/auth/tokens";
import { prisma } from "@/lib/db";
import { changePasswordSchema, credentialsSchema } from "@/schemas/auth";
import { headers } from "next/headers";
import { use } from "react";

/**
 * .env 관리자 이름 목록 포함 확인
 * @param username 사용자명
 * @returns 관리자 여부
 */
function isAdminUsername(username: string) {
  const admins = [
    process.env.ADMIN_NAME1,
    process.env.ADMIN_NAME2,
    process.env.ADMIN_NAME3,
    process.env.ADMIN_NAME4,
    process.env.ADMIN_NAME5,
  ].filter(Boolean);

  return admins.includes(username);
}

/**
 * 요청 헤더에서 UA/IP 추출
 * @returns userAgent, ip
 */
async function clientMeta() {
  const h = await headers();

  return {
    userAgent: h.get("user-agent"),
    ip: h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
  };
}

// ↓↓↓↓↓ Actions

/**
 * 로그인
 * @param input username, password
 * @returns 성공 시 user, 실패 시 error
 */
export async function loginAction(input: {
  username: string;
  password: string;
}) {
  const parsed = credentialsSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false as const, error: "입력값을 확인하세요" };
  }

  const user = await prisma.user.findUnique({
    where: { username: parsed.data.username },
  });

  if (!user || !(await verifyPassword(parsed.data.password, user.password))) {
    return { ok: false as const, error: "아이디 또는 비밀번호가 틀렸습니다" };
  }

  if (!user.approved) {
    return { ok: false as const, error: "관리자 승인 대기 중입니다" };
  }

  const meta = await clientMeta();
  const session = await createSession({
    userId: user.id,
    username: user.username,
    admin: user.admin,
    userAgent: meta.userAgent,
    ip: meta.ip,
  });

  await setAuthCookies({
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    sessionId: session.sessionId,
  });

  const pendingCount = user.admin
    ? await prisma.user.count({ where: { approved: false } })
    : 0;

  return {
    ok: true as const,
    user: {
      user_id: user.id,
      username: user.username,
      admin: user.admin,
    },
    pendingCount,
  };
}

/**
 * 로그아웃 (현재 기기 세션만 종료)
 * @returns 성공 여부
 */
export async function logoutAction() {
  const sessionId = await getSessionId();

  if (sessionId) {
    await revokeSession(sessionId);
  }

  await clearAuthCookies();

  return {
    ok: true as const,
  };
}

/**
 * Refresh Token으로 Access 발급 (Server Action/Route Handler 전용)
 * @returns 성공 시 user, 실패 시 error
 */
export async function refreshAction() {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    return {
      ok: false as const,
      error: "Refresh Token이 없습니다",
    };
  }

  try {
    const rotated = await rotateRefreshToken(refreshToken);

    await setAuthCookies({
      accessToken: rotated.accessToken,
      refreshToken: rotated.refreshToken,
      sessionId: rotated.sessionId,
    });

    return {
      ok: true as const,
      user: rotated.user,
    };
  } catch {
    await clearAuthCookies();

    return {
      ok: false as const,
      error: "유효하지 않은 Refresh Token",
    };
  }
}

/**
 * 현재 로그인 상태 확인 (RSC - 쿠키 수정 금지)
 * Access 갱신은 proxy가 담당
 */
export async function checkAuthAction() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return {
      ok: false as const,
      user: null,
    };
  }

  try {
    const payload = await verifyAccessToken(accessToken);
    const user = await prisma.user.findUnique({
      where: { id: payload.user_id },
      select: { id: true, username: true, admin: true },
    });

    if (!user) {
      return {
        ok: false as const,
        user: null,
      };
    }

    return {
      ok: true as const,
      user: {
        user_id: user.id,
        username: user.username,
        admin: user.admin,
      },
    };
  } catch {
    return {
      ok: false as const,
      user: null,
    };
  }
}

/**
 * 회원 가입
 */
export async function registerAction(input: {
  username: string;
  password: string;
}) {
  const parsed = credentialsSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false as const,
      error: "입력값을 확인하세요",
    };
  }

  const exists = await prisma.user.findUnique({
    where: { username: parsed.data.username },
  });

  if (exists) {
    return {
      ok: false as const,
      error: "이미 사용중인 아이디입니다",
    };
  }

  const admin = isAdminUsername(parsed.data.username);
  const user = await prisma.user.create({
    data: {
      username: parsed.data.username,
      password: await hashPassword(parsed.data.password),
      admin,
      approved: admin,
    },
    select: {
      id: true,
      username: true,
      admin: true,
      approved: true,
    },
  });

  return {
    ok: true as const,
    user: {
      user_id: user.id,
      username: user.username,
      admin: user.admin,
      approved: user.approved,
    },
    message: user.approved
      ? "회원가입이 완료되었습니다"
      : "가입 신청이 완료되었습니다. 관리자 승인 후 로그인 가능합니다",
  };
}

/**
 * 비밀번호 변경 (로그인 사용자)
 * @param input password, confirmPassword
 */
export async function changePasswordAction(input: {
  password: string;
  confirmPassword: string;
}) {
  const parsed = changePasswordSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message ?? "입력값을 확인하세요",
    };
  }

  const me = await checkAuthAction();

  if (!me.ok || !me.user) {
    return {
      ok: false as const,
      error: "로그인이 필요합니다",
    };
  }

  await prisma.user.update({
    where: { id: me.user.user_id },
    data: { password: await hashPassword(parsed.data.password) },
  });

  return {
    ok: true as const,
  };
}
