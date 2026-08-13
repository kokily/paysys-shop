"use server";

import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db";
import { rejectPendingUserSchema, setUserApprovedSchema } from "@/schemas/user";
import { revalidatePath } from "next/cache";

/** 가입 승인 */
export async function setUserApprovedAction(input: {
  id: string;
  approved: boolean;
}) {
  await requireAdmin();

  const parsed = setUserApprovedSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false as const,
      error: "입력값을 확인하세요",
    };
  }

  const user = await prisma.user.update({
    where: { id: parsed.data.id },
    data: { approved: parsed.data.approved },
    select: { id: true, username: true, admin: true, approved: true },
  });

  revalidatePath("/approvals");

  return {
    ok: true as const,
    user: {
      user_id: user.id,
      username: user.username,
      admin: user.admin,
      approved: user.approved,
    },
  };
}

/** 가입 거부 */
export async function rejectPendingUserAction(input: { id: string }) {
  const admin = await requireAdmin();

  const parsed = rejectPendingUserSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false as const,
      error: "입력값을 확인하세요.",
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: parsed.data.id },
    select: { id: true, username: true, approved: true },
  });

  if (!user) {
    return {
      ok: false as const,
      error: "사용자를 찾을 수 없습니다.",
    };
  }

  if (user.approved) {
    return {
      ok: false as const,
      error: "이미 승인된 계정입니다.",
    };
  }

  await prisma.user.delete({ where: { id: user.id } });

  revalidatePath("/approvals");

  return {
    ok: true as const,
    username: user.username,
  };
}
