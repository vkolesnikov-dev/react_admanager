// КОД. ФАЙЛ: src/shared/config/mock.ts
// Жестко закодированный JWT-токен для симуляции успешного входа.

import type { Campaign } from "../../entities/compaign/model/types";

// Токен: { id: 1, email: "user@example.com" }
export const MOCK_JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNjQ0NDU0NDAwLCJleHAiOjE5NDQ0NTQ0MDB9.S9d6q3Y-2mJ7eH7w9zGv4r5kO1n8L7Z5C0k9h3pL4oA";

// Моковые данные пользователя, которые могут вернуться после декодирования
export const MOCK_USER = {
  id: 1,
  email: "user@example.com",
  name: "Test User",
  role: "MARKETER",
};

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 101,
    name: "Новогодняя распродажа 2025",
    status: "ACTIVE",
    budgetType: "TOTAL",
    budgetLimit: 50000.0,
    spent: 15450.5,
    startDate: "2025-12-01",
    endDate: "2025-12-31",
    ownerId: 1,
  },
  {
    id: 102,
    name: "Тест A/B: Креатив 1",
    status: "PAUSED",
    budgetType: "DAILY",
    budgetLimit: 1500.0,
    spent: 750.25,
    startDate: "2025-11-15",
    ownerId: 1,
  },
  {
    id: 103,
    name: "Архивная кампания: Лето 2024",
    status: "ARCHIVED",
    budgetType: "TOTAL",
    budgetLimit: 100000.0,
    spent: 100000.0,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    ownerId: 1,
  },
];
