/** 쿠키 이름 */
export const ACCESS_COOKIE = "access_token";
export const REFRESH_COOKIE = "refresh_token";
export const SESSION_COOKIE = "session_token";

/** Access Token 만료 (jose용 문자열) */
export const ACCESS_TTL = "5m";
export const REFRESH_TTL_DAYS = 30;

/** 쿠키 maxAge (초) */
export const ACCESS_MAX_AGE = 5 * 60;
export const REFRESH_MAX_AGE = REFRESH_TTL_DAYS * 24 * 60 * 60;
