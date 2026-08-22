import { createHash, randomUUID } from "crypto";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "./tokens";
import { REFRESH_TTL_DAYS } from "./constants";
import { prisma } from "../db";

/** 직전 refresh 재사용 허용 (동시 요청 로테이션 경쟁 완화) */
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

function reuseRecentRotation(sessionId: string, presentedHash: string) {
  const entry = recentRotations.get(sessionId);

  if (!entry) return null;
  if (Date.now() - entry.at > REFRESH_REUSE_MS) {
    recentRotations.delete(sessionId);
    return null;
  }
  if (entry.prevHash !== presentedHash) return null;

  return entry;
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
    const reused = reuseRecentRotation(payload.session_id, presentedHash);

    if (!reused) {
      throw new Error("INVAILD_REFRESH_TOKEN");
    }

    return {
      accessToken: reused.accessToken,
      refreshToken: reused.refreshToken,
      sessionId: payload.session_id,
      user: {
        user_id: payload.user_id,
        username: payload.username,
        admin: payload.admin,
      },
    };
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
