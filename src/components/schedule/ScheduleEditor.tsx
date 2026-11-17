"use client";

import { useEffect, useState, useTransition } from "react";
import MonthCalendar from "./MonthCalendar";
import { deleteScheduleAction, saveScheduleAction } from "@/actions/schedule";
import { useUiStore } from "@/store/ui";

type Props = {
  month: string;
  today: string;
  items: Record<string, string>;
};

/**
 * 일정 편집 달력
 * 날짜 클릭 → 팝업. Ctrl+S 저장, ESC 취소, 삭제는 확인 팝업을 거침
 */
export default function ScheduleEditor({ month, today, items }: Props) {
  const showToast = useUiStore((s) => s.showToast);
  const [date, setDate] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  const open = (selected: string) => {
    setDate(selected);
    setText(items[selected] ?? "");
  };

  const save = () => {
    if (!date) return;

    startTransition(async () => {
      const res = await saveScheduleAction(date, text);
      if (!res.ok) {
        showToast({ type: "error", message: res.error });
        return;
      }
      showToast({ type: "success", message: "일정을 저장했습니다." });
      setDate(null);
    });
  };

  const remove = () => {
    if (!date) return;

    startTransition(async () => {
      const res = await deleteScheduleAction(date);
      if (!res.ok) {
        showToast({ type: "error", message: res.error });
        return;
      }
      showToast({ type: "success", message: "일정을 삭제했습니다." });
      setConfirming(false);
      setDate(null);
    });
  };

  useEffect(() => {
    if (!date) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const isSave = e.code === "KeyS" && (e.ctrlKey || e.metaKey);

      if (isSave) {
        e.preventDefault();
        if (!confirming && text.trim() && !pending) save();
        return;
      }

      if (e.key !== "Escape" || pending) return;

      if (confirming) setConfirming(false);
      else setDate(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <>
      <MonthCalendar
        month={month}
        today={today}
        items={items}
        basePath="/schedule/edit"
        onSelect={open}
      />

      {date && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${date} 일정`}
              className="bg-surface w-full max-w-md rounded p-6"
              style={{ boxShadow: "var(--shadow-2)" }}
            >
              <h3 className="mb-3 font-bold">{date}</h3>
              <textarea
                autoFocus
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
                placeholder="일정을 입력해주세요 (저장: Ctrl+S, 취소: ESC)"
                className="border-line bg-surface focus:border-member w-full rounded border p-3 outline-none"
              />
              <div className="mt-3 flex gap-2">
                {items[date] && (
                  <button
                    type="button"
                    onClick={() => setConfirming(true)}
                    disabled={pending}
                    className="border-error text-error mr-auto rounded border px-5 py-2 disabled:opacity-50"
                  >
                    일정 삭제
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setDate(null)}
                  className="border-line ml-auto rounded border px-5 py-2"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={save}
                  disabled={pending || !text.trim()}
                  className="bg-member rounded px-5 py-2 text-white disabled:opacity-50"
                >
                  저장
                </button>
              </div>
            </div>
          </div>

          {confirming && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
              <div
                role="alertdialog"
                aria-modal="true"
                aria-label="일정 삭제 확인"
                className="bg-surface w-full max-w-sm rounded p-6 text-center"
                style={{ boxShadow: "var(--shadow-2)" }}
              >
                <p className="font-bold">{date}</p>
                <p className="text-text-secondary mt-2 text-sm">
                  이 일정을 삭제할까요?
                </p>
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setConfirming(false)}
                    disabled={pending}
                    className="border-line flex-1 rounded border py-2 disabled:opacity-50"
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    autoFocus
                    onClick={remove}
                    disabled={pending}
                    className="bg-error flex-1 rounded py-2 text-white disabled:opacity-50"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
