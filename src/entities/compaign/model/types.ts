// КОД. ФАЙЛ: src/entities/campaign/model/types.ts
// Типы, описывающие сущность "Кампания".

export type CampaignStatus = "ACTIVE" | "PAUSED" | "ARCHIVED";
export type BudgetType = "DAILY" | "TOTAL";

export interface Campaign {
  id: number;
  name: string;
  status: CampaignStatus;
  budgetType: BudgetType;
  budgetLimit: number; // В рублях
  spent: number; // Потрачено
  startDate: string; // ISO дата
  endDate?: string; // Опционально
  ownerId: number;
}

// Тип для создания новой кампании (без id, spent, ownerId)
export type CreateCampaignRequest = Omit<Campaign, "id" | "spent" | "ownerId">;

// Тип для обновления кампании
export type UpdateCampaignRequest = Partial<CreateCampaignRequest> & {
  id: number;
};
