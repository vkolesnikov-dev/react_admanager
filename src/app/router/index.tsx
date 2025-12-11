// КОД. ФАЙЛ: src/app/router/index.tsx (Обновление)
// Заменяем заглушку LoginPage на реальный импорт страницы.

import { createBrowserRouter } from "react-router-dom";
// Используем React.lazy для асинхронной загрузки страницы
import React, { lazy, Suspense } from "react";
import { LogoutButton } from "../../features/auth/ui/LogoutButton";
import { RequireAuth } from "../../pages/RequireAuth/RequireAuth";
import CreateCampaignPage from "../../pages/campaigns/create/ui";
import EditCampaignPage from "../../pages/campaigns/edit/ui";

// Ленивая загрузка страниц (лучшая практика FSD/React)
const LoginPage = lazy(() => import("../../pages/login/ui"));
const CampaignsPage = lazy(() => import("../../pages/campaigns/ui"));
const CreativesPage = lazy(() => import("../../pages/creatives/ui"));
const CreateCreativePage = lazy(
  () => import("../../pages/creatives/create/ui")
);
const ReportsPage = () => <h1>Reports Page Placeholder</h1>;

// Компонент-обертка для ленивой загрузки
const LazyRoute = (Component: React.ElementType) => (
  <Suspense fallback={<div>Loading Page...</div>}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: LazyRoute(CampaignsPage),
  },
  {
    // ИСПОЛЬЗУЕМ РЕАЛЬНУЮ СТРАНИЦУ
    path: "/login",
    element: LazyRoute(LoginPage),
  },
  {
    path: "/registration",
    element: LazyRoute(() => <h1>Registration Page Placeholder</h1>),
  },
  {
    path: "/campaigns",
    element: <RequireAuth>{LazyRoute(CampaignsPage)}</RequireAuth>,
  },
  {
    path: "/campaigns/create",
    // НОВЫЙ РОУТ: Создание кампании, также защищен
    element: <RequireAuth>{LazyRoute(CreateCampaignPage)}</RequireAuth>,
  },
  {
    path: "/campaigns/:id/edit", // НОВЫЙ РОУТ: Редактирование с параметром ID
    element: <RequireAuth>{LazyRoute(EditCampaignPage)}</RequireAuth>,
  },
  {
    path: "/creatives",
    element: <RequireAuth>{LazyRoute(CreativesPage)}</RequireAuth>,
  },
  {
    path: "/creatives/create",
    element: <RequireAuth>{LazyRoute(CreateCreativePage)}</RequireAuth>,
  },
  {
    path: "/reports",
    element: LazyRoute(ReportsPage),
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);
