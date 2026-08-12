/** 클라이언트, 서버 공통 로그인 사용자 정보 */
export type AuthUser = {
  user_id: string;
  username: string;
  admin: boolean;
};

/** Access Token JWT payload (짧은 기간) */
export type AccessTokenPayload = AuthUser & {
  session_id: string;
};

/** Refresh Token JWT payload (긴 기간) */
export type RefreshTokenPayload = AuthUser & {
  session_id: string;
};
