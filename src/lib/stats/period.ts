const KST_OFFSET = 9 * 60 * 60 * 1000;
const DAY = 24 * 60 * 60 * 1000;

/** "YYYY-MM-DD" → 해당 날짜 KST 00:00 */
export function kstStartOfDay(date: string) {
  return new Date(`${date}T00:00:00+09:00`);
}

/** "YYYY-MM-DD" → 다음 날 KST 00:00 (종료일 포함 조회용) */
export function kstNextDay(date: string) {
  return new Date(kstStartOfDay(date).getTime() + DAY);
}

/** Date → KST 기준 "YYYY-MM-DD" */
export function toKstDate(date: Date) {
  return new Date(date.getTime() + KST_OFFSET).toISOString().slice(0, 10);
}

/** Date → KST 기준 "YYYY-MM" */
export function toKstMonth(date: Date) {
  return toKstDate(date).slice(0, 7);
}

/** 기간에 걸친 "YYYY-MM" 목록 */
export function monthKeys(from: string, to: string) {
  let [y, m] = from.split("-").map(Number) as [number, number];
  const [ty, tm] = to.split("-").map(Number) as [number, number];
  const keys: string[] = [];

  while (y < ty || (y === ty && m <= tm)) {
    keys.push(`${y}-${String(m).padStart(2, "0")}`);
    m += 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
  }

  return keys;
}
