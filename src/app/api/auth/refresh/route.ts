import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ACCESS_COOKIE,
  ACCESS_MAX_AGE,
  REFRESH_COOKIE,
  REFRESH_MAX_AGE,
  SESSION_COOKIE,
} from "@/lib/auth/constants";
import { rotateRefreshToken } from "@/lib/auth/session";

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

/**
 * Access 재발급 (middleware 전용)
 * Route Handler라서 쿠키 수정 가능
 */
export async function POST() {
  const jar = await cookies();
  const refreshToken = jar.get(REFRESH_COOKIE)?.value;

  if (!refreshToken) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    const rotated = await rotateRefreshToken(refreshToken);

    const res = NextResponse.json({
      ok: true,
      accessToken: rotated.accessToken,
      refreshToken: rotated.refreshToken,
      sessionId: rotated.sessionId,
    });

    res.cookies.set(
      ACCESS_COOKIE,
      rotated.accessToken,
      cookieOptions(ACCESS_MAX_AGE),
    );
    res.cookies.set(
      REFRESH_COOKIE,
      rotated.refreshToken,
      cookieOptions(REFRESH_MAX_AGE),
    );
    res.cookies.set(
      SESSION_COOKIE,
      rotated.sessionId,
      cookieOptions(REFRESH_MAX_AGE),
    );

    return res;
  } catch {
    const res = NextResponse.json({ ok: false }, { status: 401 });
    res.cookies.delete(ACCESS_COOKIE);
    res.cookies.delete(REFRESH_COOKIE);
    res.cookies.delete(SESSION_COOKIE);
    return res;
  }
}
