import { Metadata } from "next";
import Link from "next/link";
import { requirePermission } from "@/lib/auth/require-admin";
import { parseMonth, todayKST } from "@/lib/schedule/calendar";
import { getSchedules } from "@/lib/schedule/query";
import PageTemplate from "@/components/template/PageTemplate";
import ScheduleEditor from "@/components/schedule/ScheduleEditor";

export const metadata: Metadata = {
  title: "행사 일정 관리 - 행사전표시스템",
};

type Props = {
  searchParams: Promise<{ month?: string }>;
};

/** /schedule/edit - 행사 일정 입력·수정·삭제 (관리자 또는 schedule 권한) */
export default async function ScheduleEditPage({ searchParams }: Props) {
  const user = await requirePermission("schedule");
  const month = parseMonth((await searchParams).month);
  const items = await getSchedules(month);

  return (
    <PageTemplate native="member" username={user.username} admin={user.admin}>
      <div className="mb-2 flex justify-end">
        <Link
          href={`/schedule?month=${month}`}
          target="_blank"
          className="text-text-secondary hover:text-member text-sm underline"
        >
          공개 일정 페이지 보기
        </Link>
      </div>
      <ScheduleEditor month={month} today={todayKST()} items={items} />
    </PageTemplate>
  );
}
