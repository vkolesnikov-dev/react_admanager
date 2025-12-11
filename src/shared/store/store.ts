// Настройка корневого Redux Store.

import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, // Добавляем редюсер RTK Query
    // Здесь позже будет reducerPath от RTK Query
  },
  // Включаем middleware по умолчанию для работы с асинхронностью
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: import.meta.env.MODE !== "production",
});

// Типизация
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
