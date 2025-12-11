// КОД. ФАЙЛ: src/app/ui/ToastProvider/ToastProvider.tsx (НОВЫЙ ФАЙЛ)

import React, { type FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "../../../shared/ui/Toast/Toast";
import { removeToast } from "../../../shared/lib/toast/toastSlice";
import styles from "./ToastProvider.module.css";
import type { RootState } from "../../../shared/store/store";

export const ToastProvider: FC = () => {
  const dispatch = useDispatch();
  // Получаем список тостов из Redux Store
  const toasts = useSelector((state: RootState) => state.toast.toasts);

  const handleClose = (id: string) => {
    dispatch(removeToast(id));
  };

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toastItem) => (
        <Toast
          key={toastItem.id}
          id={toastItem.id}
          message={toastItem.message}
          type={toastItem.type}
          onClose={handleClose}
        />
      ))}
    </div>
  );
};
