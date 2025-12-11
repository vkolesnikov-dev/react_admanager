// КОД. ФАЙЛ: src/pages/RequireAuth/RequireAuth.tsx
// HOC-компонент для защиты приватных маршрутов.

import React, { type FC, type JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../../shared/lib/auth/token";

interface RequireAuthProps {
  children: JSX.Element;
}

/**
 * Компонент-обертка, который проверяет наличие токена.
 * Если токена нет, перенаправляет на страницу логина.
 */
export const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  // Получаем текущий путь, чтобы после успешного логина вернуться сюда.
  const location = useLocation();

  // Проверяем наличие токена
  const token = getToken();

  // Если токена нет, перенаправляем на /login
  if (!token) {
    // 'replace' заменяет текущий адрес в истории,
    // а 'state' сохраняет адрес, откуда мы пришли.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Если токен есть, отображаем дочерние элементы (защищенный контент)
  return children;
};
