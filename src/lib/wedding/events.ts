export type WeddingLiveEvent = {
  type: "signed" | "unsigned" | "updated" | "deleted";
  weddingId: string;
};

type Listener = (event: WeddingLiveEvent) => void;

const g = globalThis as unknown as {
  __weddingLiveListeners?: Set<Listener>;
};

function listeners() {
  if (!g.__weddingLiveListeners) {
    g.__weddingLiveListeners = new Set();
  }

  return g.__weddingLiveListeners;
}

/** SSE 구독 (연결 끊을 때 unsubscribe 호출) */
export function subscribeWeddingEvents(listener: Listener) {
  listeners().add(listener);

  return () => {
    listeners().delete(listener);
  };
}

/** 웨딩 변경 시 상세 보는 클라이언트에 알림 */
export function publishWeddingEvent(event: WeddingLiveEvent) {
  for (const listener of listeners()) {
    listener(event);
  }
}
