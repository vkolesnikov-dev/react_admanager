// КОД. ФАЙЛ: src/widgets/LoginForm/LoginForm.tsx
// Виджет, отвечающий только за UI формы.

import React, { type FC } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "../../shared/ui";
import styles from "./LoginFrom.module.css";

// Типы пропсов: форма должна принять обработчик и статус загрузки
interface LoginFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  // На этом шаге мы не используем RHF, но готовимся к нему:
  children: React.ReactNode;
}

export const LoginForm: FC<LoginFormProps> = ({
  onSubmit,
  isLoading,
  children,
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Вход в AdManager</h2>

      <form onSubmit={onSubmit} className={styles.form}>
        {children} {/* Место для полей формы, контролируемых RHF */}
        <Button type="submit" isLoading={isLoading} className={styles.button}>
          Войти
        </Button>
      </form>

      <p className={styles.link}>
        Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link>
      </p>
    </div>
  );
};
