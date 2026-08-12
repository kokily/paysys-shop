import { AccessTokenPayload, RefreshTokenPayload } from "@/types/auth";
import { jwtVerify, SignJWT } from "jose";
import { ACCESS_TTL, REFRESH_TTL_DAYS } from "./constants";

/**
 * Access Token 서명 키
 * @returns Uint8Array 시크릿
 */
function accessSecret() {
  return new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!);
}

/**
 * Refresh Token 서명 키 (Access와 분리)
 * @returns Uint8Array 시크릿
 */
function refreshSecret() {
  return new TextEncoder().encode(process.env.JWT_REFRESH_SECRET!);
}

/**
 * Access Token 발급
 * @param payload 사용자 + session_id
 * @returns JWT 문자열
 */
export async function signAccessToken(payload: AccessTokenPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("access_token")
    .setIssuer("paysys.kr")
    .setAudience("paysys-client")
    .setIssuedAt()
    .setExpirationTime(ACCESS_TTL)
    .sign(accessSecret());
}

/**
 * Refresh Token 발급
 * @param payload 사용자 + session_id
 * @returns JWT 문자열
 */
export async function signRefreshToken(payload: RefreshTokenPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("refresh_token")
    .setIssuer("paysys.kr")
    .setAudience("paysys-client")
    .setIssuedAt()
    .setExpirationTime(`${REFRESH_TTL_DAYS}d`)
    .sign(refreshSecret());
}

/**
 * Access Token 검증
 * @param token Access JWT
 * @returns 검증된 payload
 */
export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, accessSecret(), {
    issuer: "paysys.kr",
    audience: "paysys-client",
    subject: "access_token",
  });

  return payload as unknown as AccessTokenPayload;
}

/**
 * Refresh Token 검증
 * @param token Refresh JWT
 * @returns 검증된 payload
 */
export async function verifyRefreshToken(token: string) {
  const { payload } = await jwtVerify(token, refreshSecret(), {
    issuer: "paysys.kr",
    audience: "paysys-client",
    subject: "refresh_token",
  });

  return payload as unknown as RefreshTokenPayload;
}
