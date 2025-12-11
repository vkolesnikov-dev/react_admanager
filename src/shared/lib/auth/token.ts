// КОД. ФАЙЛ: src/shared/lib/auth/token.ts
// Хелпер-функции для работы с JWT-токеном в localStorage.

const TOKEN_KEY = "jwt_token";

/**
 * Получает токен из localStorage. Используется в baseApi.
 */
export const getToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error getting token from storage", error);
    return null;
  }
};

/**
 * Устанавливает токен в localStorage.
 */
export const setToken = (token: string): void => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error setting token to storage", error);
  }
};

/**
 * Удаляет токен из localStorage.
 */
export const removeToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing token from storage", error);
  }
};
