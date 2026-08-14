export type BillLiveEvent = {
  type: "created" | "updated" | "deleted";
};

type Listener = (event: BillLiveEvent) => void;

const g = globalThis as unknown as {
  __billLiveListeners?: Set<Listener>;
};

function listeners() {
  if (!g.__billLiveListeners) {
    g.__billLiveListeners = new Set();
  }

  return g.__billLiveListeners;
}

/** SSE 구독 (연결 끊을 때 unsubscribe 호출) */
export function subscribeBillEvents(listener: Listener) {
  listeners().add(listener);

  return () => {
    listeners().delete(listener);
  };
}

/** 전표 변경 시 접속 중인 /fronts 클라이언트에 알림 */
export function publishBillEvent(event: BillLiveEvent) {
  for (const listener of listeners()) {
    listener(event);
  }
}
