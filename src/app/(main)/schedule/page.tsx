import { Metadata } from "next";
import Link from "next/link";
import { checkAuthAction } from "@/actions/auth";
import { hasPermission } from "@/lib/auth/permissions";
import { parseMonth, todayKST } from "@/lib/schedule/calendar";
import { getSchedules } from "@/lib/schedule/query";
import MonthCalendar from "@/components/schedule/MonthCalendar";

export const metadata: Metadata = {
  title: "행사 일정 - 행사전표시스템",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ month?: string }>;
};

/** /schedule - 행사 일정 달력 (로그인 없이 링크로 열람) */
export default async function SchedulePage({ searchParams }: Props) {
  const month = parseMonth((await searchParams).month);
  const [items, auth] = await Promise.all([
    getSchedules(month),
    checkAuthAction(),
  ]);
  const canEdit = !!auth.user && hasPermission(auth.user, "schedule");

  return (
    <div className="flex min-h-full flex-col items-center">
      <main className="w-full max-w-[1400px] px-4 py-8 md:px-8">
        {canEdit && (
          <div className="mb-2 flex justify-end">
            <Link
              href={`/schedule/edit?month=${month}`}
              className="border-member text-member hover:bg-member rounded border px-4 py-1.5 text-sm hover:text-white"
            >
              일정 편집
            </Link>
          </div>
        )}
        <MonthCalendar
          month={month}
          today={todayKST()}
          items={items}
          basePath="/schedule"
        />
      </main>
    </div>
  );
}
