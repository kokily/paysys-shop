import { z } from "zod";

/** 관리자 권한 변경 */
export const setUserAdminSchema = z.object({
  id: z.string().min(1),
  admin: z.boolean(),
});

/** 사용자 삭제 */
export const deleteUserSchema = z.object({
  id: z.string().min(1),
});

/** 가입 승인/취소 */
export const setUserApprovedSchema = z.object({
  id: z.string().min(1),
  approved: z.boolean(),
});

/** 가입 거부 (대기 계정 삭제) */
export const rejectPendingUserSchema = z.object({
  id: z.string().min(1),
});

/** 목록 검색 (선택) */
export const listUsersSchema = z.object({
  username: z.string().optional(),
  cursor: z.string().optional(),
});
