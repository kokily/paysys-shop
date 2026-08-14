import { checkAuthAction } from "@/actions/auth";
import { BillLiveEvent, subscribeBillEvents } from "@/lib/bill/events";

/** /fronts 실시간 갱신용 SSE */
export async function GET() {
  const auth = await checkAuthAction();

  if (!auth.ok || !auth.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const encoder = new TextEncoder();

  let unsubscribe: (() => void) | undefined;
  let heartbeat: ReturnType<typeof setInterval> | undefined;

  const stream = new ReadableStream({
    start(controller) {
      const send = (event: BillLiveEvent) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(event)}\n\n`),
        );
      };

      // 연결 직후 확인용
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: "connected" })}\n\n`),
      );
      unsubscribe = subscribeBillEvents(send);

      // 연결 유지용 ping (nginx/브라우저 idle 끊김 방지)
      heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: ping\n\n`));
        } catch {
          // 이미 닫힘
        }
      }, 15000);
    },
    cancel() {
      if (heartbeat) clearInterval(heartbeat);
      unsubscribe?.();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
