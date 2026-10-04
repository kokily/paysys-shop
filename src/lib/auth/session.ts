import { createHash, randomUUID } from "crypto";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "./tokens";
import { REFRESH_TTL_DAYS } from "./constants";
import { prisma } from "../db";

/**
 * 직전 refresh 재사용 허용
 * - 15초 이내: 동시 요청 경쟁 → 방금 발급한 토큰을 그대로 반환
 * - 15초 이후: 로테이션 응답을 못 받은 기기 → 새로 발급
 * 새 토큰이 한 번이라도 사용되면 prevHash가 바뀌어 옛 토큰은 무효
 */
const REFRESH_REUSE_MS = 15_000;

type ReuseEntry = {
  prevHash: string;
  accessToken: string;
  refreshToken: string;
  at: number;
};

const recentRotations = new Map<string, ReuseEntry>();

function rememberRotation(
  sessionId: string,
  prevHash: string,
  accessToken: string,
  refreshToken: string,
) {
  recentRotations.set(sessionId, {
    prevHash,
    accessToken,
    refreshToken,
    at: Date.now(),
  });
}

/**
 * Refresh Token 원문 해시 (DB는 해시만 저장)
 * @param token Refresh Token 원문
 * @returns sha256 hex
 */
export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * 새 로그인 세션 생성 (다른 기기 세션은 유지)
 * @param params 사용자 정보 + UA/IP
 * @returns access/refresh/sessionId
 */
export async function createSession(params: {
  userId: string;
  username: string;
  admin: boolean;
  userAgent?: string | null;
  ip?: string | null;
}) {
  const sessionId = randomUUID();

  const refreshToken = await signRefreshToken({
    user_id: params.userId,
    username: params.username,
    admin: params.admin,
    session_id: sessionId,
  });

  const accessToken = await signAccessToken({
    user_id: params.userId,
    username: params.username,
    admin: params.admin,
    session_id: sessionId,
  });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TTL_DAYS);

  await prisma.session.create({
    data: {
      id: sessionId,
      user_id: params.userId,
      refresh_token_hash: hashToken(refreshToken),
      user_agent: params.userAgent ?? null,
      ip: params.ip ?? null,
      expires_at: expiresAt,
    },
  });

  return { accessToken, refreshToken, sessionId };
}

/**
 * 현재 세션만 무효화
 * @param sessionId 끊을 세션 ID
 */
export async function revokeSession(sessionId: string) {
  await prisma.session.updateMany({
    where: { id: sessionId, revoked_at: null },
    data: { revoked_at: new Date() },
  });
}

/**
 * Refresh Token 검증 후 Access/Refresh 재발급 (rotation)
 * @param refreshToken 쿠키의 Refresh Token
 * @returns 새 토큰 + 사용자 정보
 */
export async function rotateRefreshToken(refreshToken: string) {
  const payload = await verifyRefreshToken(refreshToken);

  const session = await prisma.session.findFirst({
    where: {
      id: payload.session_id,
      user_id: payload.user_id,
      revoked_at: null,
      expires_at: { gt: new Date() },
    },
  });

  if (!session) {
    throw new Error("INVAILD_REFRESH_TOKEN");
  }

  const presentedHash = hashToken(refreshToken);

  if (session.refresh_token_hash !== presentedHash) {
    const entry = recentRotations.get(payload.session_id);

    if (!entry || entry.prevHash !== presentedHash) {
      throw new Error("INVAILD_REFRESH_TOKEN");
    }

    if (Date.now() - entry.at <= REFRESH_REUSE_MS) {
      return {
        accessToken: entry.accessToken,
        refreshToken: entry.refreshToken,
        sessionId: payload.session_id,
        user: {
          user_id: payload.user_id,
          username: payload.username,
          admin: payload.admin,
        },
      };
    }
  }

  const newRefreshToken = await signRefreshToken({
    user_id: payload.user_id,
    username: payload.username,
    admin: payload.admin,
    session_id: payload.session_id,
  });

  const newAccessToken = await signAccessToken({
    user_id: payload.user_id,
    username: payload.username,
    admin: payload.admin,
    session_id: payload.session_id,
  });

  await prisma.session.update({
    where: { id: session.id },
    data: { refresh_token_hash: hashToken(newRefreshToken) },
  });

  rememberRotation(
    session.id,
    presentedHash,
    newAccessToken,
    newRefreshToken,
  );

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    sessionId: payload.session_id,
    user: {
      user_id: payload.user_id,
      username: payload.username,
      admin: payload.admin,
    },
  };
}
