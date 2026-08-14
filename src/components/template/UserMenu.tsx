"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Apeach from "./Apeach";
import { useUiStore } from "@/store/ui";
import { logoutAction } from "@/actions/auth";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import MenuItem from "./MenuItem";

type Props = {
  admin: boolean;
};

export default function UserMenu({ admin }: Props) {
  const router = useRouter();
  const showToast = useUiStore((s) => s.showToast);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  const menuRef = useOutsideClick<HTMLDivElement>(close);

  async function onLogout() {
    close();
    await logoutAction();
    showToast({ type: "success", message: "로그아웃" });
    router.push("/");
    router.refresh();
  }

  return (
    <div ref={menuRef} className="relative">
      <Apeach onClick={() => setOpen((v) => !v)} />

      <div
        className={`absolute top-full right-0 z-30 mt-[0.22rem] origin-top transition-all duration-200 ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-5 scale-[0.8] opacity-0"
        }`}
        style={{ boxShadow: "var(--shadow-2)" }}
      >
        <div className="bg-surface shadow-[0_0_8px_rgba(0,0,0,0.1) relative z-[5] w-48">
          {open && (
            <>
              <MenuItem href="/password" onClick={close}>
                비밀번호 변경
              </MenuItem>

              {admin && (
                <>
                  <div className="from-member to-success mx-4 h-[2px] bg-gradient-to-r" />

                  <MenuItem href="/approvals" onClick={close}>
                    가입승인
                  </MenuItem>
                  <MenuItem href="/weddings" onClick={close}>
                    웨딩빌지
                  </MenuItem>
                  <MenuItem href="/items" onClick={close}>
                    품목 리스트
                  </MenuItem>
                  <MenuItem href="/users" onClick={close}>
                    사용자 리스트
                  </MenuItem>
                </>
              )}

              <div className="from-member to-success mx-4 h-[2px] bg-gradient-to-r" />

              <MenuItem onClick={onLogout}>로그아웃</MenuItem>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
