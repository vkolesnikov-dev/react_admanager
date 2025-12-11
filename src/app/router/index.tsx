// КОД. ФАЙЛ: src/app/router/index.tsx (Обновление)
// Заменяем заглушку LoginPage на реальный импорт страницы.

import { createBrowserRouter } from "react-router-dom";
// Используем React.lazy для асинхронной загрузки страницы
import React, { lazy, Suspense } from "react";
import { LogoutButton } from "../../features/auth/ui/LogoutButton";
import { RequireAuth } from "../../pages/RequireAuth/RequireAuth";
import CreateCampaignPage from "../../pages/campaigns/create/ui";
import EditCampaignPage from "../../pages/campaigns/edit/ui";
import Layout from "../../pages/layout/Layout";

// Ленивая загрузка страниц (лучшая практика FSD/React)
const LoginPage = lazy(() => import("../../pages/login/ui"));
const CampaignsPage = lazy(() => import("../../pages/campaigns/ui"));
const CreativesPage = lazy(() => import("../../pages/creatives/ui"));
const CreateCreativePage = lazy(
  () => import("../../pages/creatives/create/ui")
);
const ReportsPage = lazy(() => import("../../pages/reports/ui"));

// Компонент-обертка для ленивой загрузки
const LazyRoute = (Component: React.ElementType) => (
  <Suspense fallback={<div>Loading Page...</div>}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    // ИСПОЛЬЗУЕМ РЕАЛЬНУЮ СТРАНИЦУ
    path: "/login",
    element: LazyRoute(LoginPage),
  },
  {
    path: "/registration",
    element: LazyRoute(() => <h1>Registration Page Placeholder</h1>),
  },

  // 2. ЗАЩИЩЕННЫЕ РОУТЫ (Используют Layout, который включает RequireAuth)
  {
    element: LazyRoute(Layout), // <-- Общий Layout для всех вложенных роутов
    children: [
      {
        path: "/", // Главная страница
        element: LazyRoute(CampaignsPage),
      },
      {
        path: "/campaigns",
        element: LazyRoute(CampaignsPage),
      },
      {
        path: "/campaigns/create",
        element: LazyRoute(CreateCampaignPage),
      },
      {
        path: "/campaigns/:id/edit",
        element: LazyRoute(EditCampaignPage),
      },
      {
        path: "/creatives",
        element: LazyRoute(CreativesPage),
      },
      {
        path: "/creatives/create",
        element: LazyRoute(CreateCreativePage),
      },
      {
        path: "/reports", // <-- Маршрут отчетов
        element: LazyRoute(ReportsPage),
      },
    ],
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);
