// КОД. ФАЙЛ: src/shared/ui/Modal/Modal.tsx

import React, { type FC, type ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  if (!isOpen) return null;

  // Использование onClick на overlay для закрытия по клику вне модального окна
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.header}>{title}</div>
        <div className={styles.content}>{children}</div>
        <div className={styles.footer}>{footer}</div>
      </div>
    </div>
  );
};
