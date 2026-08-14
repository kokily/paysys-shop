"use client";

import type { WeddingFormInput } from "@/types/wedding";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useUiStore } from "@/store/ui";
import { EMPTY_WEDDING_FORM } from "@/lib/wedding/constants";
import { createWeddingAction, updateWeddingAction } from "@/actions/weddings";
import "./wedding-form.css";
import WeddingFormMeta from "./WeddingFormMeta";
import WeddingFormSections from "./WeddingFormSections";

type Props = {
  mode: "add" | "update";
  weddingId?: string;
  initial?: WeddingFormInput;
};

/** 웨딩 추가/수정 폼 */
export default function WeddingForm({ mode, weddingId, initial }: Props) {
  const router = useRouter();
  const showToast = useUiStore((s) => s.showToast);
  const [form, setForm] = useState<WeddingFormInput>(
    initial ?? EMPTY_WEDDING_FORM,
  );
  const [isPending, startTransition] = useTransition();

  const title = mode === "update" ? "웨딩 정산 수정" : "웨딩 정산 작성";

  function setField(name: keyof WeddingFormInput, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function onBack() {
    router.push("/weddings");
  }

  function onSubmit() {
    startTransition(async () => {
      const result =
        mode === "update" && weddingId
          ? await updateWeddingAction({ id: weddingId, form })
          : await createWeddingAction(form);

      if (!result.ok) {
        showToast({ type: "error", message: result.error });
        return;
      }

      showToast({
        type: "success",
        message:
          mode === "update" ? "웨딩 전표 수정 완료!" : "웨딩 전표 작성 완료!",
      });
      router.push("/weddings");
      router.refresh();
    });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  }

  return (
    <div className="wedding-form">
      <h2 className="wedding-form-title">{title}</h2>

      <WeddingFormMeta form={form} onChange={setField} />

      <hr className="border-line w-full" />

      <WeddingFormSections
        form={form}
        onChange={setField}
        onKeyDown={onKeyDown}
      />

      <div className="wedding-form-actions">
        <button
          type="button"
          className="wf-btn cancel"
          disabled={isPending}
          onClick={onBack}
        >
          취소하기
        </button>
        <button
          type="button"
          className="wf-btn submit"
          disabled={isPending}
          onClick={onSubmit}
        >
          저장하기
        </button>
      </div>
    </div>
  );
}
