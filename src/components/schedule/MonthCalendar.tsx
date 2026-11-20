import Link from "next/link";
import { buildCells, shiftMonth } from "@/lib/schedule/calendar";

const WEEK = ["일", "월", "화", "수", "목", "금", "토"];

type Props = {
  month: string;
  today: string;
  items: Record<string, string>;
  basePath: string;
  onSelect?: (date: string) => void;
};

/**
 * 월간 일정 달력
 * - onSelect가 있으면 편집용(날짜 칸이 버튼, 모바일에서도 달력 유지)
 * - 없으면 보기용(640px 미만에서는 일정 목록으로 전환)
 */
export default function MonthCalendar({
  month,
  today,
  items,
  basePath,
  onSelect,
}: Props) {
  const [year, mon] = month.split("-");
  const entries = Object.entries(items);

  if (month === today.slice(0, 7) && !items[today]) entries.push([today, ""]);
  entries.sort(([a], [b]) => a.localeCompare(b));

  return (
    <section className="w-full">
      <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-center">
        <Link
          href={`${basePath}?month=${today.slice(0, 7)}`}
          className="border-line hover:border-member hover:text-member justify-self-start rounded border px-3 py-1 text-sm lg:px-6 lg:text-base"
        >
          오늘
        </Link>

        <div className="flex items-center gap-2 sm:gap-6">
          <Link
            href={`${basePath}?month=${shiftMonth(month, -1)}`}
            aria-label="이전 달"
            className="hover:text-member px-3 py-1 text-2xl"
          >
            ‹
          </Link>
          <h2 className="text-2xl font-bold lg:text-4xl">
            {year}년 {mon}월
          </h2>
          <Link
            href={`${basePath}?month=${shiftMonth(month, 1)}`}
            aria-label="다음 달"
            className="hover:text-member px-3 py-1 text-2xl"
          >
            ›
          </Link>
        </div>
      </div>

      <div
        className={`${onSelect ? "grid" : "hidden sm:grid"} border-line bg-surface grid-cols-7 border-t border-l`}
      >
        {WEEK.map((w, i) => (
          <div
            key={w}
            className={`border-line bg-bg border-r border-b py-2 text-center text-sm font-bold lg:py-4 lg:text-lg ${
              i === 0 ? "text-error" : ""
            }`}
          >
            {w}
          </div>
        ))}

        {buildCells(month).map((date, i) => {
          if (!date) {
            return (
              <div key={i} className="border-line bg-bg/50 border-r border-b" />
            );
          }

          const isToday = date === today;

          const body = (
            <>
              <time
                className={`text-sm lg:text-base ${i % 7 === 0 ? "text-error" : ""} ${
                  isToday ? "text-member font-bold" : ""
                }`}
              >
                {Number(date.slice(8))}
              </time>
              <span className="mt-1 block w-full text-xs leading-5 wrap-anywhere break-keep whitespace-pre-line sm:text-sm lg:text-base lg:leading-6">
                {items[date]}
              </span>
            </>
          );

          const cell = `border-line min-h-20 border-r border-b p-1 text-left align-top sm:min-h-32 sm:p-2 lg:min-h-[150px] lg:p-3 ${
            isToday ? "ring-member ring-2 ring-inset" : ""
          }`;

          return onSelect ? (
            <button
              key={date}
              type="button"
              className={`${cell} hover:bg-bg flex flex-col items-start justify-start`}
              onClick={() => onSelect(date)}
            >
              {body}
            </button>
          ) : (
            <div key={date} className={cell}>
              {body}
            </div>
          );
        })}
      </div>

      {!onSelect && (
        <ul className="divide-line border-line bg-surface divide-y border-y sm:hidden">
          {entries.length === 0 && (
            <li className="text-text-secondary py-10 text-center text-sm">
              등록된 일정이 없습니다.
            </li>
          )}
          {entries.map(([date, content]) => {
            const isToday = date === today;
            return (
              <li
                key={date}
                className={`flex gap-4 px-2 py-3 ${isToday ? "ring-member ring-2 ring-inset" : ""}`}
              >
                <time
                  className={`w-14 shrink-0 font-bold ${isToday ? "text-member" : ""}`}
                >
                  {date.slice(5).replace("-", ".")}
                </time>
                <p
                  className={`text-sm break-all whitespace-pre-line ${content ? "" : "text-text-secondary"}`}
                >
                  {content || "일정 없음"}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
