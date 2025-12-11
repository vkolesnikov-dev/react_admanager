// КОД. ФАЙЛ: src/entities/user/model/userSlice.ts
// Слайс для локального состояния пользователя (хранение объекта User).

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type User } from "./types";
import { authApi } from "../api/authApi";

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<{ user: User | null }>) => {
      state.currentUser = action.payload.user;
      state.isAuthenticated = !!action.payload.user;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
  // Добавление логики для обработки успешного логина (RTK Query)
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          // При успешном логине сохраняем данные пользователя в локальный стейт
          state.currentUser = payload.user;
          state.isAuthenticated = true;
        }
      )
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          // При успешной регистрации
          state.currentUser = payload.user;
          state.isAuthenticated = true;
        }
      );
    // Здесь можно добавить обработку getMe, если нужно
  },
});

export const { setAuthData, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
