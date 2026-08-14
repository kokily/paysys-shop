import { create } from "zustand";

type Toast = {
  /** 같은 문구라도 다시 띄우기 위한 키 */
  id?: number;
  type: "success" | "error" | "info";
  message: string;
  href?: string;
} | null;

type UiStore = {
  toast: Toast;
  showToast: (toast: NonNullable<Toast>) => void;
  clearToast: () => void;
};

/** 전역 UI 스토어 (토스트/모달만 서버데이터 금지) */
export const useUiStore = create<UiStore>((set) => ({
  toast: null,
  showToast: (toast) =>
    set({
      toast: {
        ...toast,
        id: toast.id ?? Date.now(),
      },
    }),
  clearToast: () => set({ toast: null }),
}));
