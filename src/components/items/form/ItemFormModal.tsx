"use client";

import type { ItemRow } from "@/types/items";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createItemAction, updateItemAction } from "@/actions/items";
import { itemFormSchema, type ItemFormInput } from "@/schemas/item";
import { ITEM_DIVIDES, ITEM_NATIVES } from "@/lib/data/item";
import { useUiStore } from "@/store/ui";
import Modal from "@/components/ui/Modal";
import Field from "@/components/items/form/ItemFormField";

type Props = {
  mode: "create" | "edit";
  item?: ItemRow;
  onClose: () => void;
  onSaved: (item: ItemRow) => void;
};

/** 품목 추가/수정 모달 */
export default function ItemFormModal({ mode, item, onClose, onSaved }: Props) {
  const router = useRouter();
  const showToast = useUiStore((s) => s.showToast);

  const divideOptions =
    item?.divide && !(ITEM_DIVIDES as readonly string[]).includes(item.divide)
      ? [item.divide, ...ITEM_DIVIDES]
      : [...ITEM_DIVIDES];

  const form = useForm<ItemFormInput>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      name: item?.name ?? "",
      divide: item?.divide ?? "식사(뷔페)",
      native: (item?.native as ItemFormInput["native"]) ?? "회원",
      unit: item?.unit ?? "",
      price: item?.price ?? 0,
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;

  async function onValid(data: ItemFormInput, close: () => void) {
    if (mode === "create") {
      const result = await createItemAction(data);
      if (!result.ok) {
        showToast({ type: "error", message: result.error });
        return;
      }
      showToast({
        type: "success",
        message: `${result.item.name} 품목 생성`,
      });
      onSaved(result.item);
      close();
      router.refresh();
      return;
    }

    if (!item) return;

    const result = await updateItemAction({ id: item.id, ...data });
    if (!result.ok) {
      showToast({ type: "error", message: result.error });
      return;
    }

    showToast({
      type: "success",
      message: `${result.item.name} 품목 수정`,
    });
    onSaved(result.item);
    close();
    router.refresh();
  }

  return (
    <Modal
      title={mode === "create" ? "품목 추가" : "품목 수정"}
      onClose={onClose}
      headerClassName="bg-success"
      maxWidthClassName="max-w-[400px]"
    >
      {({ close }) => (
        <form
          onSubmit={handleSubmit((data) => onValid(data, close))}
          className="space-y-3 p-4"
          noValidate
        >
          <Field label="품명" error={errors.name?.message}>
            <input
              autoFocus={mode === "create"}
              className="border-line text-text w-full rounded border bg-transparent px-3 py-2 outline-none"
              {...register("name")}
            />
          </Field>

          <Field label="분류" error={errors.native?.message}>
            <select
              className="border-line bg-surface text-text w-full rounded border px-3 py-2"
              {...register("native")}
            >
              {ITEM_NATIVES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Field>

          <Field label="구분" error={errors.divide?.message}>
            <select
              className="border-line bg-surface text-text w-full rounded border px-3 py-2"
              {...register("divide")}
            >
              {divideOptions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </Field>

          <Field label="단위" error={errors.unit?.message}>
            <input
              className="border-line text-text w-full rounded border bg-transparent px-3 py-2 outline-none"
              {...register("unit")}
            />
          </Field>

          <Field label="단가" error={errors.price?.message}>
            <input
              type="number"
              min={0}
              className="border-line text-text w-full rounded border bg-transparent px-3 py-2 outline-none"
              {...register("price", { valueAsNumber: true })}
            />
          </Field>

          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={close}
              disabled={isSubmitting}
              className="border-error bg-surface text-error hover:bg-error min-w-[80px] rounded-md border px-2 py-2 text-sm font-bold transition hover:text-white disabled:opacity-60"
            >
              취 소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="border-success bg-surface text-success hover:bg-success min-w-[80px] rounded-md border px-2 py-2 text-sm font-bold transition hover:text-white disabled:opacity-60"
            >
              {isSubmitting ? "저장중..." : "저 장"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
