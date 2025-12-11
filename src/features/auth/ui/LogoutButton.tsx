// КОД. ФАЙЛ: src/features/auth/ui/LogoutButton.tsx
// Кнопка, выполняющая логаут и очистку.

import React, { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared/ui";
import { useAppDispatch } from "../../../shared/lib/hooks/redux";
import { logout } from "../../../entities/user/model/userSlice";
import { removeToken } from "../../../shared/lib/auth/token";

export const LogoutButton: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Удаляем токен из хранилища
    removeToken();
    // 2. Сбрасываем локальное состояние пользователя в Redux
    dispatch(logout());
    // 3. Перенаправляем на страницу логина
    navigate("/login");
  };

  return (
    <Button onClick={handleLogout} style={{ backgroundColor: "#808080" }}>
      Выйти
    </Button>
  );
};
