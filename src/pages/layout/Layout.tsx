// КОД. ФАЙЛ: src/pages/Layout/Layout.tsx (ИСПРАВЛЕНИЕ)

import React, { type FC } from "react";
// Импортируем Outlet для рендеринга дочерних роутов
import { Outlet } from "react-router-dom";
import { Header } from "../../widgets/Header/Header";
import { RequireAuth } from "../RequireAuth/RequireAuth";
import styles from "./Layout.module.css";

// Удаляем LayoutProps

/**
 * Основной макет приложения для защищенных страниц.
 */
// Layout: FC больше не принимает пропсы
const Layout: FC = () => {
  return (
    // Обертка RequireAuth гарантирует, что Layout виден только авторизованным пользователям
    // ВНИМАНИЕ: Если вы перенесли RequireAuth в роутер (как я рекомендовал),
    // удалите его из этого файла, чтобы избежать двойного рендеринга.
    // Оставляем его здесь по вашей текущей структуре:
    <RequireAuth>
      <div className={styles.appWrapper}>
        <Header />
        {/* Основной контент страницы */}
        <main className={styles.mainContent}>
          {/* Outlet рендерит компонент текущего дочернего роута */}
          <Outlet />
        </main>
      </div>
    </RequireAuth>
  );
};

export default Layout;
