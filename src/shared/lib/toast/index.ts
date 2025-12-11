// КОД. ФАЙЛ: src/shared/lib/toast/index.ts (НОВЫЙ ФАЙЛ)

import { store } from "../../store/store";
import type { ToastType } from "../../ui/Toast/Toast";
import { addToast } from "./toastSlice";

// Функция-обертка для диспатча
const showToast = (message: string, type: ToastType) => {
  store.dispatch(addToast({ message, type }));
};

// Экспортируемый API
export const toast = {
  success: (message: string) => showToast(message, "success"),
  error: (message: string) => showToast(message, "error"),
  info: (message: string) => showToast(message, "info"),
};
