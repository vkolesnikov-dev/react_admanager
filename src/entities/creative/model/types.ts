// КОД. ФАЙЛ: src/entities/creative/model/types.ts
// Типы, описывающие сущность "Креатив".

// 1. Создаем КОНСТАНТНЫЙ ОБЪЕКТ, который можно использовать как значение
export const CreativeFormat = {
  IMAGE: "IMAGE",
  VIDEO: "VIDEO",
  TEXT: "TEXT",
} as const;

// 2. Создаем ТИП из этого объекта (для TypeScript)
export type CreativeFormat =
  (typeof CreativeFormat)[keyof typeof CreativeFormat];

export type CreativeStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Creative {
  id: number;
  campaignId: number; // К какому ID кампании привязан креатив
  name: string;
  format: CreativeFormat;
  status: CreativeStatus;
  url?: string; // Ссылка на файл (для IMAGE/VIDEO)
  content?: string; // Текст (для TEXT)
  createdAt: string; // ISO дата создания
}

// Тип для создания нового креатива
export type CreateCreativeRequest = Omit<
  Creative,
  "id" | "status" | "createdAt"
>;
