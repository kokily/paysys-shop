"use client";

import Field from "./CartFormField";

type Props = {
  title: string;
  hall: string;
  etc: string;
  isPending: boolean;
  onTitleChange: (v: string) => void;
  onHallChange: (v: string) => void;
  onEtcChange: (v: string) => void;
  onSubmit: (e: React.SyntheticEvent) => void;
  onRemoveAll: () => void;
};

/** 전표 전송 폼 (행사명/홀/기타) */
export default function CartSubmitForm({
  title,
  hall,
  etc,
  isPending,
  onTitleChange,
  onHallChange,
  onEtcChange,
  onSubmit,
  onRemoveAll,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 flex w-full max-w-[350px] flex-col gap-5"
      noValidate
    >
      <Field
        label="행사명"
        required
        value={title}
        onChange={onTitleChange}
        name="title"
      />
      <Field
        label="행사홀"
        required
        value={hall}
        onChange={onHallChange}
        name="hall"
      />
      <Field label="기타사항" value={etc} onChange={onEtcChange} name="etc" />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          disabled={isPending}
          onClick={onRemoveAll}
          className="border-error text-error hover:bg-error rounded-md border px-4 py-2 text-sm font-bold transition hover:text-white disabled:opacity-60"
        >
          전체삭제
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="border-success text-success hover:bg-success rounded-md border px-4 py-2 text-sm font-bold transition hover:text-white disabled:opacity-60"
        >
          {isPending ? "전송중..." : "전송하기"}
        </button>
      </div>
    </form>
  );
}
