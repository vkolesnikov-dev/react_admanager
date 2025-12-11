// КОД. ФАЙЛ: src/widgets/Header/Header.tsx (НОВЫЙ ФАЙЛ)

import React, { type FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogoutButton } from "../../features/auth/ui/LogoutButton";
import styles from "./Header.module.css";

// Определяем структуру ссылок
const NAV_ITEMS = [
  { path: "/campaigns", label: "Кампании", icon: "🚀" },
  { path: "/creatives", label: "Креативы", icon: "🖼️" },
  { path: "/reports", label: "Отчеты", icon: "📈" },
];

export const Header: FC = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      {/* 1. Логотип / Главная страница */}
      <div className={styles.logo}>
        <Link to="/">Ad.Panel</Link>
      </div>

      {/* 2. Навигационные ссылки */}
      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            // Выделяем активную ссылку
            className={
              location.pathname.startsWith(item.path)
                ? styles.activeLink
                : styles.navLink
            }
          >
            <span className={styles.icon}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* 3. Кнопка выхода (LogoutButton) */}
      <div className={styles.actions}>
        <LogoutButton />
      </div>
    </header>
  );
};
