"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth/require-auth";
import { prisma } from "@/lib/db";
import { CartItem } from "@/types/cart";
import {
  addBillSchema,
  addReserveSchema,
  listBillsSchema,
  resolveItemByNativeSchema,
  updateBillSchema,
} from "@/schemas/bill";
import { toBillDetail, toBillRow } from "@/lib/bill/helper";
import { requireAdmin } from "@/lib/auth/require-admin";

const PAGE_SIZE = 30;

/** 카트 → 전표 생성 */
export async function addBillAction(input: {
  title: string;
  hall: string;
  etc: string;
}) {
  const user = await requireAuth();

  const parsed = addBillSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message ?? "빈 칸 없이 입력하세요",
    };
  }

  const title = parsed.data.title;
  const hall = parsed.data.hall;
  const etc = parsed.data.etc?.trim() || " ";

  const cart = await prisma.cart.findFirst({
    where: {
      user_id: user.user_id,
      completed: false,
      deleted: false,
    },
  });

  if (!cart) {
    return {
      ok: false as const,
      error: "카트를 찾을 수 없습니다",
    };
  }

  const items = (cart.items as CartItem[] | null) ?? [];

  if (items.length === 0) {
    return {
      ok: false as const,
      error: "카트에 품목이 없습니다",
    };
  }

  const totalAmount = items.reduce((sum, i) => sum + (i.amount ?? 0), 0);

  const bill = await prisma.$transaction(async (tx) => {
    await tx.bill.deleteMany({ where: { cart_id: cart.id } });

    const created = await tx.bill.create({
      data: {
        title,
        hall,
        etc,
        total_amount: totalAmount,
        items,
        cart_id: cart.id,
        user_id: user.user_id,
        username: user.username,
      },
      select: { id: true, title: true },
    });

    await tx.cart.update({
      where: { id: cart.id },
      data: { completed: true },
    });

    return created;
  });

  revalidatePath("/cart");
  revalidatePath("/fronts");

  return {
    ok: true as const,
    bill,
  };
}

/** 전표 목록 (cursor) */
export async function listBillsAction(input?: {
  title?: string;
  hall?: string;
  userId?: string;
  cursor?: string;
}) {
  const user = await requireAuth();

  const parsed = listBillsSchema.safeParse(input ?? {});

  if (!parsed.success) {
    return {
      ok: false as const,
      error: "입력값을 확인하세요",
    };
  }

  const title = parsed.data.title?.trim() ?? "";
  const hall = parsed.data.hall?.trim() ?? "";
  const userId = parsed.data.userId?.trim() ?? "";
  const cursor = parsed.data.cursor;

  const bills = await prisma.bill.findMany({
    where: {
      ...(title ? { title: { contains: title, mode: "insensitive" } } : {}),
      ...(hall ? { hall: { contains: hall, mode: "insensitive" } } : {}),
      ...(userId ? { user_id: userId } : {}),
    },
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    take: PAGE_SIZE,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    select: {
      id: true,
      title: true,
      hall: true,
      username: true,
      user_id: true,
      created_at: true,
      items: true,
    },
  });

  const rows = bills.map(toBillRow);

  return {
    ok: true as const,
    bills: rows,
    nextCursor: rows.length > 0 ? rows[rows.length - 1]!.id : null,
    hasMore: rows.length === PAGE_SIZE,
  };
}

/** 전표 상세 */
export async function getBillAction(id: string) {
  const user = await requireAuth();

  const bill = await prisma.bill.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      hall: true,
      etc: true,
      total_amount: true,
      reserve: true,
      username: true,
      user_id: true,
      created_at: true,
      items: true,
    },
  });

  if (!bill) {
    return { ok: false as const, error: "전표를 찾을 수 없습니다." };
  }

  return {
    ok: true as const,
    bill: toBillDetail(bill),
  };
}

/** 전표 → 카트 복원 (작성자만) */
export async function restoreBillAction(id: string) {
  const user = await requireAuth();

  const bill = await prisma.bill.findUnique({
    where: { id },
    select: { id: true, user_id: true, cart_id: true },
  });

  if (!bill) {
    return { ok: false as const, error: "전표를 찾을 수 없습니다." };
  }

  if (bill.user_id !== user.user_id) {
    return { ok: false as const, error: "복원 권한이 없습니다." };
  }

  if (!bill.cart_id) {
    return { ok: false as const, error: "연결된 카트가 없습니다." };
  }

  const cart = await prisma.cart.findUnique({
    where: { id: bill.cart_id },
    select: { id: true },
  });

  if (!cart) {
    return { ok: false as const, error: "카트를 찾을 수 없습니다." };
  }

  await prisma.$transaction(async (tx) => {
    await tx.cart.update({
      where: { id: cart.id },
      data: { completed: false, deleted: false },
    });
    await tx.bill.delete({ where: { id: bill.id } });
  });

  revalidatePath("/cart");
  revalidatePath("/fronts");

  return { ok: true as const };
}

/** 전표 품목 수정 (관리자만) */
export async function updateBillAction(input: {
  id: string;
  items: {
    id: string;
    native: string;
    price: number;
    count: number;
    name?: string;
    divide?: string;
    unit?: string;
  }[];
}) {
  await requireAdmin();

  const parsed = updateBillSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message ?? "입력값을 확인하세요.",
    };
  }

  const bill = await prisma.bill.findUnique({
    where: { id: parsed.data.id },
    select: { id: true, items: true },
  });

  if (!bill) {
    return { ok: false as const, error: "전표를 찾을 수 없습니다." };
  }

  const nextItems: CartItem[] = [];

  for (const patch of parsed.data.items) {
    const price = Math.trunc(patch.price);
    const count = Math.trunc(patch.count);

    if (price < 0) {
      return {
        ok: false as const,
        error: "단가/수량을 확인하세요. (수량은 1 이상)",
      };
    }

    let catalog: {
      id: string;
      name: string;
      divide: string;
      native: string;
      unit: string;
    } | null = null;

    if (patch.name && patch.divide) {
      catalog = await prisma.item.findFirst({
        where: {
          name: patch.name,
          divide: patch.divide,
          native: patch.native,
        },
        select: {
          id: true,
          name: true,
          divide: true,
          native: true,
          unit: true,
        },
      });
    }

    if (!catalog) {
      catalog = await prisma.item.findUnique({
        where: { id: patch.id },
        select: {
          id: true,
          name: true,
          divide: true,
          native: true,
          unit: true,
        },
      });
    }

    if (!catalog && !(patch.name && patch.divide && patch.unit)) {
      return { ok: false as const, error: "품목 정보를 찾을 수 없습니다" };
    }

    nextItems.push({
      id: catalog?.id ?? patch.id,
      name: catalog?.name ?? patch.name!,
      divide: catalog?.divide ?? patch.divide!,
      native: patch.native,
      unit: catalog?.unit ?? patch.unit!,
      price,
      count,
      amount: price * count,
    });
  }

  const totalAmount = nextItems.reduce((sum, i) => sum + i.amount, 0);

  const updated = await prisma.bill.update({
    where: { id: bill.id },
    data: {
      items: nextItems,
      total_amount: totalAmount,
    },
    select: {
      id: true,
      title: true,
      hall: true,
      etc: true,
      total_amount: true,
      reserve: true,
      username: true,
      user_id: true,
      created_at: true,
      items: true,
    },
  });

  revalidatePath("/fronts");

  return { ok: true as const, bill: toBillDetail(updated) };
}

/** 구분 변경 시 마스터 단가 조회 (관리자) */
export async function resolveItemByNativeAction(input: {
  name: string;
  divide: string;
  native: string;
}) {
  await requireAdmin();

  const parsed = resolveItemByNativeSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: "구분이 올바르지 않습니다." };
  }

  const { name, divide, native } = parsed.data;

  const item = await prisma.item.findFirst({
    where: { name, divide, native },
    select: {
      id: true,
      name: true,
      divide: true,
      native: true,
      unit: true,
      price: true,
    },
  });

  if (!item) {
    return {
      ok: false as const,
      error: `"${name}"의 ${native} 단가가 없습니다.`,
    };
  }

  return { ok: true as const, item };
}

function canManageReserve(user: { admin: boolean; username: string }) {
  return user.admin || user.username === "프론트";
}

/** 예약금 추가 (관리자 / 프론트) */
export async function addReserveAction(input: { id: string; reserve: number }) {
  const user = await requireAuth();

  if (!canManageReserve(user)) {
    return { ok: false as const, error: "예약금 권한이 없습니다." };
  }

  const parsed = addReserveSchema.safeParse({
    id: input.id,
    reserve: Math.trunc(input.reserve),
  });
  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message ?? "예약금을 입력하세요.",
    };
  }

  const bill = await prisma.bill.findUnique({
    where: { id: parsed.data.id },
    select: { id: true },
  });

  if (!bill) {
    return { ok: false as const, error: "전표를 찾을 수 없습니다." };
  }

  const updated = await prisma.bill.update({
    where: { id: bill.id },
    data: { reserve: parsed.data.reserve },
    select: {
      id: true,
      title: true,
      hall: true,
      etc: true,
      total_amount: true,
      reserve: true,
      username: true,
      user_id: true,
      created_at: true,
      items: true,
    },
  });

  revalidatePath("/fronts");

  return { ok: true as const, bill: toBillDetail(updated) };
}

/** 예약금 삭제 (관리자 / 프론트) */
export async function removeReserveAction(id: string) {
  const user = await requireAuth();

  if (!canManageReserve(user)) {
    return { ok: false as const, error: "예약금 권한이 없습니다." };
  }

  const bill = await prisma.bill.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!bill) {
    return { ok: false as const, error: "전표를 찾을 수 없습니다." };
  }

  const updated = await prisma.bill.update({
    where: { id: bill.id },
    data: { reserve: 0 },
    select: {
      id: true,
      title: true,
      hall: true,
      etc: true,
      total_amount: true,
      reserve: true,
      username: true,
      user_id: true,
      created_at: true,
      items: true,
    },
  });

  revalidatePath("/fronts");

  return { ok: true as const, bill: toBillDetail(updated) };
}
