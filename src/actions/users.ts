"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-admin";
import {
  deleteUserSchema,
  listUsersSchema,
  setUserAdminSchema,
} from "@/schemas/user";

const PAGE_SIZE = 30;

/** 승인된 사용자 목록 (커서 페이지네이션) */
export async function listUsersAction(input?: {
  username?: string;
  cursor?: string;
}) {
  await requireAdmin();

  const parsed = listUsersSchema.safeParse(input ?? {});
  if (!parsed.success) {
    return { ok: false as const, error: "입력값을 확인하세요." };
  }

  const username = parsed.data.username?.trim() ?? "";
  const cursor = parsed.data.cursor;

  const users = await prisma.user.findMany({
    where: {
      approved: true,
      ...(username
        ? { username: { contains: username, mode: "insensitive" } }
        : {}),
    },
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    take: PAGE_SIZE,
    ...(cursor
      ? {
          skip: 1,
          cursor: { id: cursor },
        }
      : {}),
    select: {
      id: true,
      username: true,
      admin: true,
      created_at: true,
    },
  });

  return {
    ok: true as const,
    users,
    nextCursor: users.length > 0 ? users[users.length - 1]!.id : null,
    hasMore: users.length === PAGE_SIZE,
  };
}

/** 관리자 권한 변경 (승급/강등) */
export async function setUserAdminAction(input: {
  id: string;
  admin: boolean;
}) {
  const admin = await requireAdmin();

  const parsed = setUserAdminSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: "입력값을 확인하세요." };
  }

  if (admin.user_id === parsed.data.id && !parsed.data.admin) {
    return { ok: false as const, error: "본인 권한은 해제할 수 없습니다." };
  }

  const user = await prisma.user.findUnique({
    where: { id: parsed.data.id },
    select: { id: true, approved: true },
  });

  if (!user || !user.approved) {
    return { ok: false as const, error: "사용자를 찾을 수 없습니다." };
  }

  await prisma.user.update({
    where: { id: parsed.data.id },
    data: { admin: parsed.data.admin },
  });

  revalidatePath("/users");
  revalidatePath(`/users/${parsed.data.id}`);

  return { ok: true as const };
}

/**
 * 사용자 삭제
 */
export async function deleteUserAction(input: { id: string }) {
  const admin = await requireAdmin();

  const parsed = deleteUserSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: "입력값을 확인하세요." };
  }

  if (admin.user_id === parsed.data.id) {
    return { ok: false as const, error: "본인 계정은 삭제 불가합니다." };
  }

  const user = await prisma.user.findUnique({
    where: { id: parsed.data.id },
    select: { id: true },
  });

  if (!user) {
    return { ok: false as const, error: "사용자를 찾을 수 없습니다." };
  }

  await prisma.user.delete({ where: { id: parsed.data.id } });

  revalidatePath("/users");

  return { ok: true as const };
}
