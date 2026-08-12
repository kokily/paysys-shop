import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import {
  ACCESS_COOKIE,
  ACCESS_MAX_AGE,
  REFRESH_COOKIE,
  REFRESH_MAX_AGE,
  SESSION_COOKIE,
} from "@/lib/auth/constants";

/**
 * Access JWT 유효 여부 (Edge — jose만 사용)
 */
async function isAccessValid(token: string) {
  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!),
      {
        issuer: "paysys.kr",
        audience: "paysys-client",
        subject: "access_token",
      },
    );
    return true;
  } catch {
    return false;
  }
}

function cookieOpts(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export async function middleware(request: NextRequest) {
  // refresh API는 통과 (무한 루프 방지)
  if (request.nextUrl.pathname.startsWith("/api/auth/refresh")) {
    return NextResponse.next();
  }

  const access = request.cookies.get(ACCESS_COOKIE)?.value;
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value;

  if (access && (await isAccessValid(access))) {
    return NextResponse.next();
  }

  // refresh 없으면 그대로 (비로그인)
  if (!refresh) {
    return NextResponse.next();
  }

  const refreshRes = await fetch(new URL("/api/auth/refresh", request.url), {
    method: "POST",
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
    cache: "no-store",
  });

  if (!refreshRes.ok) {
    const res = NextResponse.next();
    res.cookies.delete(ACCESS_COOKIE);
    res.cookies.delete(REFRESH_COOKIE);
    res.cookies.delete(SESSION_COOKIE);
    return res;
  }

  const data = (await refreshRes.json()) as {
    accessToken: string;
    refreshToken: string;
    sessionId: string;
  };

  // 이번 요청의 RSC도 새 access를 보게 쿠키 헤더 교체
  const requestHeaders = new Headers(request.headers);
  const cookieMap = new Map<string, string>();

  for (const part of (request.headers.get("cookie") ?? "").split(";")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    cookieMap.set(trimmed.slice(0, i), trimmed.slice(i + 1));
  }

  cookieMap.set(ACCESS_COOKIE, data.accessToken);
  cookieMap.set(REFRESH_COOKIE, data.refreshToken);
  cookieMap.set(SESSION_COOKIE, data.sessionId);

  requestHeaders.set(
    "cookie",
    [...cookieMap.entries()].map(([k, v]) => `${k}=${v}`).join("; "),
  );

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.cookies.set(
    ACCESS_COOKIE,
    data.accessToken,
    cookieOpts(ACCESS_MAX_AGE),
  );
  response.cookies.set(
    REFRESH_COOKIE,
    data.refreshToken,
    cookieOpts(REFRESH_MAX_AGE),
  );
  response.cookies.set(
    SESSION_COOKIE,
    data.sessionId,
    cookieOpts(REFRESH_MAX_AGE),
  );

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
