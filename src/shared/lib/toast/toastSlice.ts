// КОД. ФАЙЛ: src/shared/lib/toast/toastSlice.ts (НОВЫЙ ФАЙЛ)

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ToastType } from "../../../shared/ui/Toast/Toast";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastState {
  toasts: ToastItem[];
}

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (
      state,
      action: PayloadAction<{ message: string; type: ToastType }>
    ) => {
      // Генерируем уникальный ID
      const newToast: ToastItem = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        ...action.payload,
      };
      // Добавляем в начало очереди
      state.toasts.unshift(newToast);
      // Ограничиваем количество тостов, например, до 5
      state.toasts = state.toasts.slice(0, 5);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
