/** 금액/수량 표시 Unit of account */
export function formatAmount(value: number, unit = "원") {
  return `${value.toLocaleString("ko-KR")}${unit}`;
}
