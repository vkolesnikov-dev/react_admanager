// КОД. ФАЙЛ: src/shared/ui/Button/Button.tsx

import React, { type ButtonHTMLAttributes, type FC } from "react";
import styles from "./Button.module.css";

// Определяем пропсы, наследуя стандартные атрибуты кнопки
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Дополнительные пропсы, если нужны (например, isLoading)
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  isLoading,
  disabled,
  ...rest
}) => {
  return (
    <button
      className={styles.button}
      // Кнопка отключена, если передан disabled или isLoading
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? "Загрузка..." : children}
    </button>
  );
};
