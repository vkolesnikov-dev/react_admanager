// КОД. ФАЙЛ: src/shared/api/baseApi.ts
// Базовый API-файл для RTK Query с логикой авторизации.

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../config/api";

/**
 * Базовый запрос с автоматическим добавлением токена.
 */
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // 1. Получаем токен из LocalStorage (или другого хранилища)
    const token = localStorage.getItem("jwt_token");

    // 2. Если токен существует, добавляем его в заголовок Authorization
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    // 3. Устанавливаем тип контента по умолчанию
    headers.set("Content-Type", "application/json");

    return headers;
  },
});

/**
 * Главный API-экземпляр. Все остальные entityApi будут расширять его.
 */
export const baseApi = createApi({
  reducerPath: "api", // Ключ в Redux Store
  baseQuery: baseQuery,
  tagTypes: ["User", "Campaign", "Creative", "Report"], // Используем для кэширования
  endpoints: () => ({}), // Эндпоинты будут добавляться в entities/
});
