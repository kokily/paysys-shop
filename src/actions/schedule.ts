"use server";

import { revalidatePath } from "next/cache";
import { getPermittedUser } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db";
import { isDateKey } from "@/lib/schedule/calendar";

const MAX_LENGTH = 1000;

function refreshPages() {
  revalidatePath("/schedule");
  revalidatePath("/schedule/edit");
}

/** 일정 저장 (없으면 추가, 있으면 수정) */
export async function saveScheduleAction(date: string, content: string) {
  const auth = await getPermittedUser("schedule");
  if (!auth.ok) return auth;

  if (!isDateKey(date)) {
    return { ok: false as const, error: "잘못된 날짜입니다." };
  }

  const trimmed = content.trim();
  if (!trimmed) {
    return { ok: false as const, error: "일정 내용을 입력해주세요." };
  }
  if (trimmed.length > MAX_LENGTH) {
    return {
      ok: false as const,
      error: `일정은 ${MAX_LENGTH}자 이내로 입력해주세요.`,
    };
  }

  await prisma.schedule.upsert({
    where: { date },
    create: { date, content: trimmed },
    update: { content: trimmed },
  });

  refreshPages();
  return { ok: true as const };
}

/** 일정 삭제 */
export async function deleteScheduleAction(date: string) {
  const auth = await getPermittedUser("schedule");
  if (!auth.ok) return auth;

  if (!isDateKey(date)) {
    return { ok: false as const, error: "잘못된 날짜입니다." };
  }

  await prisma.schedule.deleteMany({ where: { date } });

  refreshPages();
  return { ok: true as const };
}
