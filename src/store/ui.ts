import { create } from "zustand";

type Toast = {
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
  showToast: (toast) => set({ toast }),
  clearToast: () => set({ toast: null }),
}));
