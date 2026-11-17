import { prisma } from "@/lib/db";

/** 해당 월("YYYY-MM")의 일정 { "YYYY-MM-DD": 내용 } */
export async function getSchedules(month: string) {
  const rows = await prisma.schedule.findMany({
    where: { date: { startsWith: `${month}-` } },
    select: { date: true, content: true },
  });

  return Object.fromEntries(rows.map((r) => [r.date, r.content]));
}
