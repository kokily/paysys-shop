/** 오늘 날짜 (한국 시간, "YYYY-MM-DD") */
export function todayKST() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
  }).format(new Date());
}

/** "YYYY-MM-DD" 형식 여부 */
export function isDateKey(value: string) {
  return /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value);
}

/** ?month= 값 검증. 없거나 잘못되면 이번 달 */
export function parseMonth(value: unknown) {
  return typeof value === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(value)
    ? value
    : todayKST().slice(0, 7);
}

/** "YYYY-MM" 기준 diff개월 이동 */
export function shiftMonth(month: string, diff: number) {
  const [y, m] = month.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1 + diff, 1)).toISOString().slice(0, 7);
}

/** 달력 칸 목록: 앞뒤 빈칸은 null, 날짜 칸은 "YYYY-MM-DD" */
export function buildCells(month: string) {
  const [y, m] = month.split("-").map(Number);
  const firstDay = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
  const lastDate = new Date(Date.UTC(y, m, 0)).getUTCDate();

  const cells: (string | null)[] = Array(firstDay).fill(null);

  for (let d = 1; d <= lastDate; d++) {
    cells.push(`${month}-${String(d).padStart(2, "0")}`);
  }

  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
