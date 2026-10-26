/** "2025-01-01" → "25. 1. 1." */
export function shortDate(date: string) {
  const [y, m, d] = date.split("-");
  return `${y!.slice(2)}. ${Number(m)}. ${Number(d)}.`;
}

/** "2025-01" → "25년 1월" */
export function monthLabel(month: string) {
  const [y, m] = month.split("-");
  return `${y!.slice(2)}년 ${Number(m)}월`;
}
