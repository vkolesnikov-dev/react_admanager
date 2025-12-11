// КОД. ФАЙЛ: src/app/providers/with-mocks.tsx
// Компонент, который запускает MSW только в режиме разработки.

import React, { useEffect } from "react";

// Запускаем асинхронный импорт worker
async function enableMocking() {
  if (import.meta.env.MODE !== "development") {
    return;
  }

  // Динамический импорт worker для браузера
  const { worker } = await import("../../mocks/browser");
  // Используем start({ onUnhandledRequest: 'bypass' }), чтобы избежать ошибок для не мокированных запросов
  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: { url: "/mockServiceWorker.js" },
  });
}

export const WithMocks = (component: () => React.ReactNode) => () => {
  const [mockingEnabled, setMockingEnabled] = React.useState(false);

  useEffect(() => {
    enableMocking().then(() => setMockingEnabled(true));
  }, []);

  // Рендерим приложение только после запуска MSW
  if (!mockingEnabled && import.meta.env.MODE === "development") {
    return <div>Starting mock server...</div>;
  }

  return <>{component()}</>;
};
