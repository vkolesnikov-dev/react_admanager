// КОД. ФАЙЛ: src/shared/ui/Toast/Toast.tsx (НОВЫЙ ФАЙЛ)

import React, { type FC } from "react";
import styles from "./Toast.module.css";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: (id: string) => void;
}

const ICONS: Record<ToastType, string> = {
  success: "✅",
  error: "❌",
  info: "ℹ️",
};

export const Toast: FC<ToastProps> = ({ id, message, type, onClose }) => {
  // Автоматическое закрытие через 5 секунд
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className={`${styles.toast} ${styles[type]}`} role="alert">
      <div className={styles.icon}>{ICONS[type]}</div>
      <div className={styles.message}>{message}</div>
      <button className={styles.closeButton} onClick={() => onClose(id)}>
        &times;
      </button>
    </div>
  );
};
