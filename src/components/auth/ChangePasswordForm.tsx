"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { changePasswordAction } from "@/actions/auth";
import { ChangePasswordInput, changePasswordSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUiStore } from "@/store/ui";

export default function ChangePasswordForm() {
  const router = useRouter();
  const showToast = useUiStore((s) => s.showToast);

  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;

  async function onValid(data: ChangePasswordInput) {
    const result = await changePasswordAction(data);

    if (!result.ok) {
      showToast({ type: "error", message: result.error });
      return;
    }

    showToast({
      type: "success",
      message: "비밀번호 변경 완료",
    });
    router.back();
  }

  return (
    <div
      className="fixed top-1/2 left-1/2 w-[320px] -translate-x-1/2 -translate-y-1/2 animate-[fadeIn_0.3s_ease-out_forwards]"
      style={{ boxShadow: "var(--shadow-2)" }}
    >
      <button
        type="button"
        onClick={() => router.back()}
        className="bg-success flex h-14 w-full items-center justify-center rounded-t-[10px] text-[1.212rem] font-extrabold tracking-[2px] text-white hover:opacity-90"
      >
        비밀번호 변경
      </button>

      <form
        onSubmit={handleSubmit(onValid)}
        className="bg-surface p-[1.215rem]"
        noValidate
      >
        <table className="w-full table-fixed border-separate border-spacing-y-1">
          <colgroup>
            <col className="w-[42%]" />
            <col className="w-[58%]" />
          </colgroup>
          <tbody>
            <tr className="hover:bg-[rgba(165,102,255,0.2)]">
              <th className="bg-warning rounded-lg px-2 py-1 text-center text-sm font-semibold whitespace-nowrap text-white">
                새 비밀번호
              </th>
              <td className="rounded-lg px-1 py-1">
                <input
                  type="password"
                  autoComplete="new-password"
                  className="border-line text-text w-full rounded border bg-transparent p-2 outline-none"
                  {...register("password")}
                  autoFocus
                />
              </td>
            </tr>
            {errors.password?.message && (
              <tr>
                <td colSpan={2} className="text-error text-xs">
                  {errors.password.message}
                </td>
              </tr>
            )}

            <tr className="hover:bg-[rgba(165,102,255,0.2)]">
              <th className="bg-warning rounded-lg px-2 py-1 text-center text-sm font-semibold whitespace-nowrap text-white">
                비밀번호 확인
              </th>
              <td className="rounded-lg px-1 py-1">
                <input
                  type="password"
                  autoComplete="new-password"
                  className="border-line text-text w-full rounded border bg-transparent p-2 outline-none"
                  {...register("confirmPassword")}
                />
              </td>
            </tr>
            {errors.confirmPassword?.message && (
              <tr>
                <td colSpan={2} className="text-error text-xs">
                  {errors.confirmPassword.message}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-4 flex justify-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="border-error bg-surface text-error hover:bg-error min-w-[90px] rounded-md border px-2 py-2 text-base font-bold transition hover:text-white active:translate-y-[3px]"
          >
            뒤 로
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="border-success bg-surface text-success hover:bg-success min-w-[90px] rounded-md border px-2 py-2 text-base font-bold transition hover:text-white active:translate-y-[3px] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "변경중..." : "변 경"}
          </button>
        </div>
      </form>
    </div>
  );
}
