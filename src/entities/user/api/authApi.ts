// КОД. ФАЙЛ: src/entities/user/api/authApi.ts
// Эндпоинты RTK Query для логина и регистрации.

import { baseApi } from "../../../shared/api/baseApi";
import { API_ROUTES } from "../../../shared/config/api";
import {
  type LoginRequest,
  type AuthResponse,
  type RegisterRequest,
  type User,
} from "../model/types";

// Расширяем базовый API
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Мутация для логина
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: API_ROUTES.LOGIN,
        method: "POST",
        body: credentials,
      }),
      // При успешном логине мы помечаем сущность 'User' как невалидную,
      // чтобы Redux Store мог обновить связанные с пользователем данные.
      invalidatesTags: ["User"],
    }),

    // Мутация для регистрации
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (credentials) => ({
        url: API_ROUTES.REGISTER,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    // Эндпоинт для получения текущего пользователя (будет использоваться для проверки авторизации)
    getMe: builder.query<User, void>({
      query: () => ({ url: "/auth/me" }),
      providesTags: ["User"],
    }),
  }),
});

// Экспорт типизированных хуков
export const { useLoginMutation, useRegisterMutation, useGetMeQuery } = authApi;
