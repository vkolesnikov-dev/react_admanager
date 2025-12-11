// КОД. ФАЙЛ: src/app/providers/with-toast.tsx (НОВЫЙ ФАЙЛ)

import React, { type FC } from "react";
import { ToastProvider } from "../ui/ToastProvider/ToastProvider"; // Импорт провайдера

/**
 * HOC для добавления глобальной системы уведомлений (тостера).
 */
export const WithToast = (Component: FC) => () =>
  (
    <>
      {/* ToastProvider должен быть вне основного контента, но внутри Redux Provider */}
      <ToastProvider />
      {/* Рендерим следующий компонент в цепочке (Router/Root) */}
      <Component />
    </>
  );
