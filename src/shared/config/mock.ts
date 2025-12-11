// КОД. ФАЙЛ: src/shared/config/mock.ts
// Жестко закодированный JWT-токен для симуляции успешного входа.

import type { Campaign } from "../../entities/compaign/model/types";
import type { Creative } from "../../entities/creative/model/types";

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
export const MOCK_CREATIVES: Creative[] = [
  {
    id: 201,
    campaignId: 101, // Новогодняя распродажа 2025
    name: "Баннер 728x90: Главный слайд",
    format: "IMAGE",
    status: "APPROVED",
    url: "http://example.com/creative/banner_728.jpg",
    createdAt: "2025-11-20T10:00:00Z",
  },
  {
    id: 202,
    campaignId: 102, // Тест A/B
    name: "Текстовое объявление: Ключевая фраза",
    format: "TEXT",
    status: "PENDING",
    content: "Купите сейчас со скидкой 30%!",
    createdAt: "2025-11-14T15:30:00Z",
  },
  {
    id: 203,
    campaignId: 101,
    name: "Видео 15s: Праздничный ролик",
    format: "VIDEO",
    status: "REJECTED",
    url: "http://example.com/creative/video_15s.mp4",
    createdAt: "2025-11-22T08:00:00Z",
  },
];
import {
  type CampaignReport,
  type GetReportParams,
  type ReportRow,
} from "../../entities/report/model/types"; // <-- НОВЫЙ ИМПОРТ

// Функция для генерации отчетов в зависимости от дат
export const generateMockReport = (params: GetReportParams): CampaignReport => {
  // В реальной жизни здесь была бы сложная логика агрегации
  const startDate = new Date(params.startDate);
  const endDate = new Date(params.endDate);

  const rows: ReportRow[] = [];
  let currentDate = new Date(startDate);
  let totalImpressions = 0;
  let totalClicks = 0;
  let totalCost = 0;

  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().substring(0, 10);

    // Моделируем случайные, но реалистичные метрики
    const impressions = Math.floor(Math.random() * 5000) + 1000;
    const clicks = Math.floor(impressions * (Math.random() * 0.05 + 0.01)); // CTR от 1% до 6%
    const cost = Math.floor(clicks * (Math.random() * 50 + 10)); // CPC от 10 до 60

    totalImpressions += impressions;
    totalClicks += clicks;
    totalCost += cost;

    rows.push({
      date: dateString,
      impressions,
      clicks,
      cost,
      ctr: clicks / impressions,
      cpc: clicks > 0 ? cost / clicks : 0,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return {
    reportName: params.campaignId
      ? `Отчет по Кампании ID ${params.campaignId}`
      : "Сводный отчет по всем кампаниям",
    totalImpressions,
    totalClicks,
    totalCost,
    rows,
  };
};
