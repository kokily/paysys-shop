"use client";

import type { ItemStatsRow } from "@/types/stats";
import { useState } from "react";
import { useUiStore } from "@/store/ui";
import { monthLabel, shortDate } from "@/lib/stats/label";
import { downloadStatsXlsx } from "@/lib/stats/xlsx";

type Props = {
  rows: ItemStatsRow[];
  months: string[];
  from: string;
  to: string;
};

function num(value: number) {
  return value.toLocaleString("ko-KR");
}

const th =
  "bg-member px-2 py-3 text-center font-semibold whitespace-nowrap text-white";
const td = "text-text px-2 py-3 whitespace-nowrap";

/** 품목 통계 표 (시작/종료일자, 품류, 분류, 품목, 단위, 단가, 월별 수량, 합계) */
export default function StatsTable({ rows, months, from, to }: Props) {
  const showToast = useUiStore((s) => s.showToast);
  const [downloading, setDownloading] = useState(false);
  const totalAmount = rows.reduce((sum, r) => sum + r.totalAmount, 0);

  async function onDownload() {
    setDownloading(true);
    try {
      await downloadStatsXlsx({ rows, months, from, to });
    } catch {
      showToast({ type: "error", message: "엑셀 파일을 만들지 못했습니다." });
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="mt-2 flex w-full flex-col items-end gap-2">
      <button
        type="button"
        onClick={onDownload}
        disabled={rows.length === 0 || downloading}
        className="border-line text-text-secondary hover:text-text rounded border px-3 py-1.5 text-sm disabled:opacity-40"
      >
        {downloading ? "만드는 중..." : "엑셀 다운로드"}
      </button>

      <div className="w-full overflow-x-auto rounded-[0.8rem]">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className={th}>시작일자</th>
              <th className={th}>종료일자</th>
              <th className={th}>순번</th>
              <th className={th}>품류</th>
              <th className={th}>분류</th>
              <th className={th}>품목</th>
              <th className={th}>단위</th>
              <th className={th}>단가</th>
              {months.map((m) => (
                <th key={m} className={th}>
                  {monthLabel(m)}
                </th>
              ))}
              <th className={th}>총판매량</th>
              <th className={th}>총 판매금액</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={10 + months.length}
                  className="text-text-secondary py-8 text-center"
                >
                  해당 기간에 등록된 품목이 없습니다.
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr
                  key={`${r.divide}|${r.native}|${r.name}|${r.unit}|${r.price}`}
                  className="border-line border-b hover:bg-[rgba(255,187,0,0.2)]"
                >
                  <td className={`${td} text-center`}>{shortDate(from)}</td>
                  <td className={`${td} text-center`}>{shortDate(to)}</td>
                  <td className={`${td} text-center`}>{i + 1}</td>
                  <td className={`${td} text-center`}>{r.divide}</td>
                  <td className={`${td} text-center`}>{r.native}</td>
                  <td className={`${td} text-center`}>{r.name}</td>
                  <td className={`${td} text-center`}>{r.unit}</td>
                  <td className={`${td} text-right`}>{num(r.price)}</td>
                  {months.map((m) => (
                    <td key={m} className={`${td} text-right`}>
                      {r.monthly[m] ? num(r.monthly[m]) : "-"}
                    </td>
                  ))}
                  <td className={`${td} text-right font-semibold`}>
                    {num(r.totalCount)}
                  </td>
                  <td className={`${td} text-right font-semibold`}>
                    {num(r.totalAmount)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
          {rows.length > 0 && (
            <tfoot>
              <tr>
                <td
                  colSpan={9 + months.length}
                  className={`${td} text-center font-bold`}
                >
                  합 계
                </td>
                <td className={`${td} text-right font-bold`}>
                  {num(totalAmount)}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
