// КОД. ФАЙЛ: src/entities/user/model/types.ts
// Все типы, связанные с сущностью User и Аутентификацией.

export interface User {
  id: number;
  email: string;
  name: string;
  role: "MARKETER" | "ADMIN" | "MANAGER";
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Тип для тела запроса логина (Критичен для MSW!)
export interface LoginRequest {
  email: string;
  password: string;
}

// Тип для тела запроса регистрации
export interface RegisterRequest extends LoginRequest {
  name: string;
}
