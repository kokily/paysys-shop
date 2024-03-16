export function unitOfAccount(target: number, unit?: string) {
  return `${target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${unit ?? ''}`;
}

export function unitOfDate(target: Date) {
  return new Date(target).toLocaleDateString();
}

export function unitOfTime(target: Date) {
  return new Date(target).toLocaleTimeString();
}
