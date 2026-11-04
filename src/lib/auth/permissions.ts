/** 관리자 외 특정 사용자 개별 메뉴 권한 */
export const PERMISSIONS = {
  weddings: "웨딩빌지",
  stats: "품목 통계",
} as const;

export type Permission = keyof typeof PERMISSIONS;

/** 관리자이거나 해당 권한이 있으면 true */
export function hasPermission(
  user: { admin: boolean; permissions?: string[] },
  permission: Permission,
) {
  return user.admin || (user.permissions ?? []).includes(permission);
}
