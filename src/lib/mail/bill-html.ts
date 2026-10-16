import type { CartItem } from "@/types/cart";
import { formatAmount } from "@/lib/format";
import { escapeHtml } from "@/lib/mail/html";

export type BillMailInput = {
  title: string;
  hall: string;
  etc: string;
  username: string;
  totalAmount: number;
  items: CartItem[];
  createdAt: Date;
};

/** 전표 등록 메일 HTML 본문 */
export function buildBillMailHtml(input: BillMailInput) {
  const rows = input.items
    .map(
      (item) => `
      <tr>
        <td style="border:1px solid #ccc;padding:8px;text-align:center;">${escapeHtml(item.native)}</td>
        <td style="border:1px solid #ccc;padding:8px;">${escapeHtml(item.name)}</td>
        <td style="border:1px solid #ccc;padding:8px;text-align:right;">${formatAmount(item.price)}</td>
        <td style="border:1px solid #ccc;padding:8px;text-align:center;">${item.count}</td>
        <td style="border:1px solid #ccc;padding:8px;text-align:right;">${formatAmount(item.amount)}</td>
      </tr>`,
    )
    .join("");

  const etcTrimmed = input.etc.trim();
  const etc =
    etcTrimmed && etcTrimmed !== ""
      ? `<p style="margin-top:16px;"><b>기타</b><br/>${escapeHtml(etcTrimmed)}</p>`
      : "";

  const created = input.createdAt.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });

  return `
  <div style="font-family:Apple SD Gothic Neo,Malgun Gothic,sans-serif;font-size:14px;color:#222;">
    <h2 style="margin:0 0 12px;">전표 등록 알림</h2>
    <table style="border-collapse:collapse;margin-bottom:16px;">
      <tr><td style="padding:4px 12px 4px 0;"><b>행사명</b></td><td>${escapeHtml(input.title)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;"><b>장소</b></td><td>${escapeHtml(input.hall)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;"><b>작성자</b></td><td>${escapeHtml(input.username)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;"><b>작성일시</b></td><td>${escapeHtml(created)}</td></tr>
    </table>

    <table style="border-collapse:collapse;width:100%;max-width:640px;">
      <thead>
        <tr style="background:#4c6ef5;color:#fff;">
          <th style="border:1px solid #ccc;padding:8px;">구분</th>
          <th style="border:1px solid #ccc;padding:8px;">상품명</th>
          <th style="border:1px solid #ccc;padding:8px;">단가</th>
          <th style="border:1px solid #ccc;padding:8px;">수량</th>
          <th style="border:1px solid #ccc;padding:8px;">소계</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>

    <p style="margin-top:16px;font-size:16px;"><b>합계: ${formatAmount(input.totalAmount)}</b></p>
    ${etc}
  </div>`;
}
