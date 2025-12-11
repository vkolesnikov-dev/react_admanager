// КОД. ФАЙЛ: src/shared/ui/Input/Input.tsx

import React, {
  type InputHTMLAttributes,
  type ForwardedRef,
  forwardRef,
} from "react";
import styles from "./Input.module.css";

// Определяем пропсы. Наследуем стандартные атрибуты HTML-ввода.
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  // Опциональное сообщение об ошибке, которое будем получать от React Hook Form
  error?: string;
}

// Используем forwardRef для совместимости с React Hook Form
export const Input = forwardRef(
  (
    { label, error, ...rest }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={styles.inputWrapper}>
        {label && <label htmlFor={rest.id}>{label}</label>}
        <input
          ref={ref} // Пробрасываем реф для RHF
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          aria-invalid={!!error} // Указываем ARIA-статус, если есть ошибка
          {...rest}
        />
        {/* Отображаем сообщение об ошибке */}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    );
  }
);

// Добавляем display name для удобства отладки
Input.displayName = "Input";
