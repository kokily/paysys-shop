"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db";
import { formToWeddingData } from "@/lib/wedding/calc";
import { toWedding, toWeddingDate } from "@/lib/wedding/map";
import {
  addWeddingSignSchema,
  removeWeddingSignSchema,
  weddingFormSchema,
  WeddingSignSex,
} from "@/schemas/wedding";
import { WeddingFormInput, WeddingRow } from "@/types/wedding";

const PAGE_SIZE = 30;

/** 웨딩 목록 (cursor + 선택 일자) */
export async function listWeddingsAction(input?: {
  cursor?: string;
  date?: string;
}) {
  await requireAdmin();

  const cursor = input?.cursor;
  const date = input?.date?.trim();

  // @db.Date 는 UTC 날짜로 저장됨. 로컬 T00:00:00 범위는 KST에서 하루 밀림
  const weddingAt =
    date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? toWeddingDate(date) : undefined;

  const rows = await prisma.wedding.findMany({
    where: weddingAt ? { wedding_at: weddingAt } : undefined,
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    take: PAGE_SIZE,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    select: {
      id: true,
      wedding_at: true,
      event_at__type__text: true,
      husband_name: true,
      bride_name: true,
    },
  });

  const weddings: WeddingRow[] = rows.map((w) => ({
    id: w.id,
    wedding_at: w.wedding_at,
    event_at: w.event_at__type__text,
    husband_name: w.husband_name,
    bride_name: w.bride_name,
  }));

  return {
    ok: true as const,
    weddings,
    nextCursor: weddings.length > 0 ? weddings[weddings.length - 1]!.id : null,
    hasMore: weddings.length === PAGE_SIZE,
  };
}

/** 웨딩 상세 */
export async function getWeddingAction(id: string) {
  await requireAdmin();

  const row = await prisma.wedding.findUnique({ where: { id } });

  if (!row) {
    return {
      ok: false as const,
      error: "웨딩 전표를 찾을 수 없습니다",
    };
  }

  return {
    ok: true as const,
    wedding: toWedding(row),
  };
}

/** 웨딩 생성 */
export async function createWeddingAction(form: WeddingFormInput) {
  await requireAdmin();

  const parsed = weddingFormSchema.safeParse(form);

  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message ?? "입력값을 확인하세요",
    };
  }

  const data = formToWeddingData(form);

  const created = await prisma.wedding.create({
    data,
    select: { id: true },
  });

  revalidatePath("/weddings");

  return {
    ok: true as const,
    id: created.id,
  };
}

/** 웨딩 수정 (서명 이미지는 유지, 이름 재마스킹 안 함) */
export async function updateWeddingAction(input: {
  id: string;
  form: WeddingFormInput;
}) {
  await requireAdmin();

  const parsed = weddingFormSchema.safeParse(input.form);

  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message ?? "",
    };
  }

  const existing = await prisma.wedding.findUnique({
    where: { id: input.id },
    select: { id: true },
  });

  if (!existing) {
    return {
      ok: false as const,
      error: "웨딩 전표를 찾을 수 없습니다",
    };
  }

  const data = formToWeddingData(input.form);
  const { husband_image: _h, bride_image: _b, ...rest } = data;

  await prisma.wedding.update({
    where: { id: input.id },
    data: {
      ...rest,
      husband_name: input.form.husband_name.trim(),
      bride_name: input.form.bride_name.trim(),
    },
  });

  revalidatePath("/weddings");

  return {
    ok: true as const,
  };
}

/** 웨딩 삭제 */
export async function deleteWeddingAction(id: string) {
  await requireAdmin();

  const existing = await prisma.wedding.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    return {
      ok: false as const,
      error: "웨딩 전표를 찾을 수 없습니다",
    };
  }

  await prisma.wedding.delete({ where: { id } });

  revalidatePath("/weddings");

  return {
    ok: true as const,
  };
}

/** 신랑/부 서명 등록 (base64 PNG) */
export async function addWeddingSignAction(input: {
  weddingId: string;
  sex: WeddingSignSex;
  image: string;
}) {
  await requireAdmin();

  const parsed = addWeddingSignSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message ?? "입력값을 확인하세요",
    };
  }

  const existing = await prisma.wedding.findUnique({
    where: { id: input.weddingId },
    select: { id: true },
  });

  if (!existing) {
    return {
      ok: false as const,
      error: "웨딩 전표를 찾을 수 없습니다",
    };
  }

  await prisma.wedding.update({
    where: { id: input.weddingId },
    data:
      input.sex === "husband"
        ? { husband_image: input.image }
        : { bride_image: input.image },
  });

  revalidatePath("/weddings");

  return {
    ok: true as const,
  };
}

/** 신랑/부 서명 삭제 */
export async function removeWeddingSignAction(input: {
  weddingId: string;
  sex: WeddingSignSex;
}) {
  await requireAdmin();

  const parsed = removeWeddingSignSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message ?? "입력값을 확인하세요",
    };
  }

  const existing = await prisma.wedding.findUnique({
    where: { id: input.weddingId },
    select: { id: true },
  });

  if (!existing) {
    return {
      ok: false as const,
      error: "웨딩 전표를 찾을 수 없습니다",
    };
  }

  await prisma.wedding.update({
    where: { id: input.weddingId },
    data:
      input.sex === "husband" ? { husband_image: null } : { bride_image: null },
  });

  revalidatePath("/weddings");

  return {
    ok: true as const,
  };
}
