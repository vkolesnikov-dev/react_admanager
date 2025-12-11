// КОД. ФАЙЛ: src/entities/report/model/types.ts (НОВЫЙ ФАЙЛ)

// Структура строки отчета (ежедневная метрика)
export interface ReportRow {
  date: string; // Формат 'YYYY-MM-DD'
  impressions: number; // Показы
  clicks: number;
  cost: number; // Стоимость (в рублях)
  ctr: number; // Кликабельность (Clicks / Impressions)
  cpc: number; // Цена за клик (Cost / Clicks)
}

// Параметры, которые мы отправляем для получения отчета
export interface GetReportParams {
  startDate: string; // 'YYYY-MM-DD'
  endDate: string; // 'YYYY-MM-DD'
  campaignId?: number; // Опциональный фильтр
}

// Общая структура отчета
export interface CampaignReport {
  reportName: string;
  totalImpressions: number;
  totalClicks: number;
  totalCost: number;
  rows: ReportRow[];
}
