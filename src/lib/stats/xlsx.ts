import type { ItemStatsRow } from "@/types/stats";
import { monthLabel, shortDate } from "@/lib/stats/label";

/** 품목 통계 → .xlsx 다운로드 (exceljs는 클릭 시점에만 로드) */
export async function downloadStatsXlsx(input: {
  rows: ItemStatsRow[];
  months: string[];
  from: string;
  to: string;
}) {
  const { rows, months, from, to } = input;
  const { default: ExcelJS } = await import("exceljs");

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("품목 통계", {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  sheet.columns = [
    { header: "시작일자", width: 11 },
    { header: "종료일자", width: 11 },
    { header: "순번", width: 6 },
    { header: "품류", width: 16 },
    { header: "분류", width: 8 },
    { header: "품목", width: 24 },
    { header: "단위", width: 7 },
    { header: "단가", width: 11, style: { numFmt: "#,##0" } },
    ...months.map((m) => ({
      header: monthLabel(m),
      width: 9,
      style: { numFmt: "#,##0" },
    })),
    { header: "총판매량", width: 10, style: { numFmt: "#,##0" } },
    { header: "총 판매금액", width: 14, style: { numFmt: "#,##0" } },
  ];

  rows.forEach((r, i) => {
    sheet.addRow([
      shortDate(from),
      shortDate(to),
      i + 1,
      r.divide,
      r.native,
      r.name,
      r.unit,
      r.price,
      ...months.map((m) => r.monthly[m] ?? 0),
      r.totalCount,
      r.totalAmount,
    ]);
  });

  const lastCol = sheet.columnCount;
  const total = sheet.addRow([]);
  total.getCell(1).value = "합 계";
  total.getCell(lastCol).value = rows.reduce((s, r) => s + r.totalAmount, 0);
  sheet.mergeCells(total.number, 1, total.number, lastCol - 1);
  total.font = { bold: true };

  const header = sheet.getRow(1);
  header.font = { bold: true, color: { argb: "FFFFFFFF" } };
  header.alignment = { horizontal: "center", vertical: "middle" };
  header.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1098AD" },
    };
  });

  sheet.eachRow((row) => {
    row.eachCell({ includeEmpty: true }, (cell, col) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      if (col <= 7 && row.number > 1) {
        cell.alignment = { horizontal: "center" };
      }
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const url = URL.createObjectURL(
    new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = `품목통계_${from}_${to}.xlsx`;
  a.click();
  URL.revokeObjectURL(url);
}
