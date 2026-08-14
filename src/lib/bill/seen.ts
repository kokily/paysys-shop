/**
 * 전표 new 배지용 "확인 여부" 저장 (localStorage)
 *
 * - 대상: 관리자 / username === "프론트"
 * - NEW: 오늘(로컬 달력일) 작성 + 아직 상세 미확인
 * - 해제: 상세 1회 오픈, 또는 자정(날짜 변경)
 * - DB 없음 → 브라우저·기기별로 따로 기억됨
 */

/** billId → 확인한 시각(ms) */
export type SeenMap = Record<string, number>;

/** localStorage 키 (사용자별) */
function storageKey(meId: string) {
  return `paysys:bill-seen:${meId}`;
}

/** 같은 로컬 날짜인지 (근무일 = 오늘 0시~24시) */
function isSameLocalDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * new 추적 대상인지
 * @param admin 관리자 여부
 * @param username 로그인 이름
 */
export function canTrackBillNew(admin: boolean, username: string) {
  return admin || username === "프론트";
}

/**
 * 이 사용자가 확인한 전표 맵 로드
 * SSR에서는 window 없음 → 빈 객체
 */
export function loadSeenBillIds(meId: string): SeenMap {
  if (typeof window === "undefined") return {};

  try {
    const raw = localStorage.getItem(storageKey(meId));

    if (!raw) return {};
    return JSON.parse(raw) as SeenMap;
  } catch {
    return {};
  }
}

/** 전표 상세를 열었을 때 호출 → new 제거용 기록 */
export function markBillSeen(meId: string, billId: string) {
  if (typeof window === "undefined") return;

  const prev = loadSeenBillIds(meId);

  prev[billId] = Date.now();

  localStorage.setItem(storageKey(meId), JSON.stringify(prev));
}

/**
 * 목록 행에 new를 붙일지
 *  - 오늘 작성분만
 *  - seen에 없으면 true
 *  - 날짜가 바뀌면 (자정 이후) false
 */
export function isUnseenNewBill(
  billId: string,
  createdAt: Date | string,
  seen: SeenMap,
) {
  const created = new Date(createdAt);

  if (Number.isNaN(created.getTime())) return false;

  const now = new Date();

  // 어제 그 이전 작성 → new 아님
  if (!isSameLocalDay(created, now)) return false;

  // 이미 상세 확인함
  if (seen[billId]) return false;

  return true;
}

/**
 * 오늘이 아닌 날에 찍힌 seen 기록 삭제 (용량 정리)
 * ListBills 마운트 시 한 번 호출하면 충분
 */
export function pruneSeenBillIds(meId: string) {
  if (typeof window === "undefined") return;

  const prev = loadSeenBillIds(meId);
  const now = new Date();

  let changed = false;

  for (const [id, at] of Object.entries(prev)) {
    if (!isSameLocalDay(new Date(at), now)) {
      delete prev[id];
      changed = true;
    }
  }

  if (changed) {
    localStorage.setItem(storageKey(meId), JSON.stringify(prev));
  }
}
