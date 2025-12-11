// КОД. ФАЙЛ: src/shared/config/api.ts
// Здесь будут храниться базовые настройки для работы с API

export const API_BASE_URL = "http://localhost:8000/api";
export const API_ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  CAMPAIGNS: "/campaigns",
  CREATIVES: "/creatives",
  REPORTS: "/reports",
};
