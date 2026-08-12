import { cookies } from "next/headers";
import {
  ACCESS_COOKIE,
  ACCESS_MAX_AGE,
  REFRESH_COOKIE,
  REFRESH_MAX_AGE,
  SESSION_COOKIE,
} from "./constants";

/**
 * HttpOnly 쿠키 공통 옵션
 * @param maxAge 초 단위 수명
 * @returns next/headers cookies set 옵션
 */
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
 * 로그인/갱신 후 인증 쿠키 저장
 * @param params access/refresh/sessionId
 */
export async function setAuthCookies(params: {
  accessToken: string;
  refreshToken: string;
  sessionId: string;
}) {
  const jar = await cookies();
  jar.set(ACCESS_COOKIE, params.accessToken, cookieOptions(ACCESS_MAX_AGE));
  jar.set(REFRESH_COOKIE, params.refreshToken, cookieOptions(REFRESH_MAX_AGE));
  jar.set(SESSION_COOKIE, params.sessionId, cookieOptions(REFRESH_MAX_AGE));
}

/**
 * 로그아웃 시 인증 쿠키 제거
 */
export async function clearAuthCookies() {
  const jar = await cookies();
  jar.delete(ACCESS_COOKIE);
  jar.delete(REFRESH_COOKIE);
  jar.delete(SESSION_COOKIE);
}

/**
 * Access Token 쿠키 값 조회
 * @returns 토큰 문자열 또는 undefined
 */
export async function getAccessToken() {
  const jar = await cookies();
  return jar.get(ACCESS_COOKIE)?.value;
}

/**
 * Refresh Token 쿠키 값 조회
 * @returns 토큰 문자열 또는 undefined
 */
export async function getRefreshToken() {
  const jar = await cookies();
  return jar.get(REFRESH_COOKIE)?.value;
}

/**
 * 현재 기기 session_id 조회
 * @returns 세션 UUID 또는 undefined
 */
export async function getSessionId() {
  const jar = await cookies();
  return jar.get(SESSION_COOKIE)?.value;
}
