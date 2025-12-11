// КОД. ФАЙЛ: src/features/campaign/hooks/useCampaignFilters.ts

import { useState, useMemo } from "react";
import type {
  Campaign,
  CampaignStatus,
} from "../../../entities/compaign/model/types";

// Типы для сортировки
export type SortField = "id" | "name" | "startDate" | "budgetLimit" | "spent";
export type SortDirection = "asc" | "desc";

interface FilterState {
  status: CampaignStatus | "ALL";
  search: string;
  sortBy: SortField;
  sortDirection: SortDirection;
}

const defaultFilterState: FilterState = {
  status: "ALL",
  search: "",
  sortBy: "id",
  sortDirection: "asc",
};

/**
 * Хук для управления фильтрацией, сортировкой и поиском кампаний на клиенте.
 * @param campaigns Исходный список кампаний.
 */
export const useCampaignFilters = (campaigns: Campaign[] | undefined) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);

  // Функции для обновления состояния
  const setStatus = (status: CampaignStatus | "ALL") =>
    setFilters((prev) => ({ ...prev, status }));
  const setSearch = (search: string) =>
    setFilters((prev) => ({ ...prev, search }));

  const setSort = (field: SortField) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      // Если поле то же, меняем направление, иначе устанавливаем 'asc'
      sortDirection:
        prev.sortBy === field
          ? prev.sortDirection === "asc"
            ? "desc"
            : "asc"
          : "asc",
    }));
  };

  // Основная логика фильтрации и сортировки
  const filteredAndSortedCampaigns = useMemo(() => {
    if (!campaigns) return [];

    let result = [...campaigns];

    // 1. Фильтрация по статусу
    if (filters.status !== "ALL") {
      result = result.filter((c) => c.status === filters.status);
    }

    // 2. Поиск по названию (нечувствительный к регистру)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(searchLower));
    }

    // 3. Сортировка
    result.sort((a, b) => {
      const aValue = a[filters.sortBy];
      const bValue = b[filters.sortBy];

      // Сравнение для чисел и дат
      if (typeof aValue === "number" || filters.sortBy === "startDate") {
        if (filters.sortDirection === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      }

      // Сравнение для строк (name)
      if (typeof aValue === "string") {
        const comparison = aValue.localeCompare(bValue as string);
        return filters.sortDirection === "asc" ? comparison : -comparison;
      }

      return 0;
    });

    return result;
  }, [campaigns, filters]);

  return {
    // Данные
    filteredAndSortedCampaigns,
    // Состояние
    filters,
    // Методы
    setStatus,
    setSearch,
    setSort,
  };
};
