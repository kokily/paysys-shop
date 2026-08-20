"use client";

import { CredentialsInput, credentialsSchema } from "@/schemas/auth";
import { useUiStore } from "@/store/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction, registerAction } from "@/actions/auth";
import ThemeToggle from "../theme/ThemeToggle";

type Mode = "login" | "register";

/**
 * 로그인/회원가입 폼
 * - 폼 상태: React Hooks Form + Zod
 * - 탭(mode) 만 로컬 UI 상태
 */
export default function LoginForm() {
  const router = useRouter();
  const showToast = useUiStore((s) => s.showToast);

  /** 로그인 | 회원가입 탭 */
  const [mode, setMode] = useState<Mode>("login");

  const form = useForm<CredentialsInput>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // RHF 관리 값
  const { register, handleSubmit, setError, resetField } = form;
  const { errors, isSubmitting } = form.formState;

  async function onValid(data: CredentialsInput) {
    if (mode === "login") {
      const result = await loginAction(data);
      if (!result.ok) {
        setError("root", { message: result.error });
        return;
      }

      if (result.user.admin && result.pendingCount > 0) {
        showToast({
          type: "info",
          message: `가입 신청 대기자가 ${result.pendingCount}명 있습니다.`,
          href: "/approvals",
        });
      } else {
        showToast({ type: "success", message: "로그인 되었습니다." });
      }

      router.push("/member");
      router.refresh();
      return;
    }

    const result = await registerAction(data);
    if (!result.ok) {
      setError("root", { message: result.error });
      return;
    }
    showToast({ type: "info", message: result.message });
    setMode("login");
    resetField("password");
  }

  return (
    <main>
      <ThemeToggle />

      <div
        className="fixed top-1/2 left-1/2 max-h-full w-[320px] -translate-x-1/2 -translate-y-1/2 animate-[fadeIn_0.3s_ease-in-out_forwards] overflow-y-auto"
        style={{ boxShadow: "var(--shadow-2)" }}
      >
        <div className="bg-member flex h-20 items-center justify-center">
          <span className="text-[2.4rem] font-extrabold tracking-[5px] text-white">
            {mode === "login" ? "로그인" : "회원가입"}
          </span>
        </div>
        <div className="bg-surface p-8">
          <div className="border-line mb-6 flex border-b">
            <button
              type="button"
              className={`flex-1 pb-2 text-sm font-semibold ${
                mode === "login"
                  ? "border-member text-member border-b-2"
                  : "text-text-secondary"
              }`}
              onClick={() => setMode("login")}
            >
              로그인
            </button>
            <button
              type="button"
              className={`flex-1 pb-2 text-sm font-semibold ${
                mode === "register"
                  ? "border-member text-member border-b-2"
                  : "text-text-secondary"
              }`}
              onClick={() => setMode("register")}
            >
              회원가입
            </button>
          </div>
          {/* 서버 Action 실패 메시지 (setError("root")로 넣은 값) */}
          {errors.root?.message && (
            <p className="text-error mb-4 text-sm">{errors.root.message}</p>
          )}
          <form onSubmit={handleSubmit(onValid)} noValidate>
            <div className="relative mb-[30px] w-full">
              <input
                id="username"
                type="text"
                required
                autoComplete="username"
                className="peer border-member text-text block w-[92%] border-0 border-b bg-transparent p-[10px] outline-none"
                {...register("username")}
              />
              <span className="before:bg-member relative block w-full before:absolute before:right-1/2 before:bottom-0 before:left-1/2 before:h-[3px] before:transition-all before:duration-200 peer-focus:before:right-0 peer-focus:before:left-0" />
              <label
                htmlFor="username"
                className="text-text peer-valid:text-member peer-focus:text-member pointer-events-none absolute top-3 left-0 transition-all duration-200 peer-valid:top-[-10px] peer-valid:text-[14px] peer-focus:top-[-10px] peer-focus:text-[14px]"
              >
                사용자 이름
              </label>
              {errors.username?.message && (
                <p className="text-error mt-1 text-xs">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="relative mb-[30px] w-full">
              <input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                className="peer border-member text-text block w-[92%] border-0 border-b bg-transparent p-[10px] outline-none"
                {...register("password")}
              />
              <span className="before:bg-member relative block w-full before:absolute before:right-1/2 before:bottom-0 before:left-1/2 before:h-[3px] before:transition-all before:duration-200 peer-focus:before:right-0 peer-focus:before:left-0" />
              <label
                htmlFor="password"
                className="text-text peer-valid:text-member peer-focus:text-member pointer-events-none absolute top-3 left-0 transition-all duration-200 peer-valid:top-[-10px] peer-valid:text-[14px] peer-focus:top-[-10px] peer-focus:text-[14px]"
              >
                비밀번호
              </label>
              {errors.password?.message && (
                <p className="text-error mt-1 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group border-member text-member relative mt-4 block w-full overflow-hidden rounded border bg-transparent pt-[0.6rem] pb-[0.5rem] text-[1.25rem] font-semibold transition-all duration-500 outline-none disabled:cursor-not-allowed disabled:opacity-60"
            >
              <div className="bg-member absolute top-[-70px] left-0 w-full py-[10px] text-white transition-all duration-400 group-hover:top-0 group-disabled:top-[-70px]">
                {isSubmitting
                  ? "처리중..."
                  : mode === "login"
                    ? "로그인하기!"
                    : "가입신청"}
              </div>
              {isSubmitting
                ? "처리중..."
                : mode === "login"
                  ? "로그인하기!"
                  : "가입신청"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
