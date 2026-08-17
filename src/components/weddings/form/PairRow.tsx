import { formatAmount } from "@/lib/format";
import { WeddingFormInput } from "@/types/wedding";

export function digitsOnly(value: string) {
  return value.replace(/[^\d]/g, "");
}

/** 저장용 숫자 문자열 → 화면용 콤마 */
export function formatDigits(value: string) {
  if (!value) return "";
  return Number(value).toLocaleString("ko-KR");
}

function num(value: string) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

type Props = {
  title: string;
  husbandName: keyof WeddingFormInput;
  brideName: keyof WeddingFormInput;
  form: WeddingFormInput;
  unit: string;
  /** 금액 필드면 true (천단위 콤마). 인원 등은 false */
  comma?: boolean;
  onChange: (name: keyof WeddingFormInput, value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function PairRow({
  title,
  husbandName,
  brideName,
  form,
  unit,
  comma = true,
  onChange,
  onKeyDown,
}: Props) {
  const husbandRaw = String(form[husbandName]);
  const brideRaw = String(form[brideName]);
  const sum = num(husbandRaw) + num(brideRaw);

  return (
    <tr>
      <th>{title}</th>
      <td>
        <input
          value={comma ? formatDigits(husbandRaw) : husbandRaw}
          onChange={(e) => onChange(husbandName, digitsOnly(e.target.value))}
        />
      </td>
      <td>
        <input
          value={comma ? formatDigits(brideRaw) : brideRaw}
          onChange={(e) => onChange(brideName, digitsOnly(e.target.value))}
          onKeyDown={onKeyDown}
        />
      </td>
      <td className="sum">{formatAmount(sum, unit)}</td>
    </tr>
  );
}
