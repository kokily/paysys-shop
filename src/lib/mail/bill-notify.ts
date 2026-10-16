import nodemailer from "nodemailer";
import { formatAmount } from "@/lib/format";
import { buildBillMailHtml, type BillMailInput } from "@/lib/mail/bill-html";

/** 전표 등록 메일 (실패해도 throw 하지 않음) */
export async function sendBillCreatedMail(input: BillMailInput) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  const to = process.env.BILL_NOTIFY_EMAIL;

  if (!host || !user || !pass || !from || !to) {
    console.error("[mail] SMTP env missing — skip bill notify");
    return;
  }

  const subject = `[전표등록] ${input.title}, ${input.hall}, ${input.username}`;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      subject,
      html: buildBillMailHtml(input),
      text: [
        `행사명: ${input.title}`,
        `장소: ${input.hall}`,
        `작성자: ${input.username}`,
        `합계: ${formatAmount(input.totalAmount)}`,
      ].join("\n"),
    });
  } catch (err) {
    console.error("[mail] bill notify failed", err);
  }
}
