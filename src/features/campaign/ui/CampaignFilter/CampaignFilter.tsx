// КОД. ФАЙЛ: src/features/campaign/ui/CampaignFilter/CampaignFilter.tsx

import React, { type FC } from "react";
import { type CampaignStatus } from "../../../../entities/compaign/model/types";
import { type useCampaignFilters } from "../../hooks/useCampaignFilters";
import styles from "./CampaignFilter.module.css";

// Статусы, доступные для фильтрации
const STATUS_OPTIONS: Array<CampaignStatus | "ALL"> = [
  "ALL",
  "ACTIVE",
  "PAUSED",
  "ARCHIVED",
];

interface CampaignFilterProps {
  filters: ReturnType<typeof useCampaignFilters>["filters"];
  setStatus: ReturnType<typeof useCampaignFilters>["setStatus"];
  setSearch: ReturnType<typeof useCampaignFilters>["setSearch"];
}

export const CampaignFilter: FC<CampaignFilterProps> = ({
  filters,
  setStatus,
  setSearch,
}) => {
  // Обработчик изменения статуса
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as CampaignStatus | "ALL");
  };

  // Обработчик ввода поиска
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.filterContainer}>
      {/* Фильтр по статусу */}
      <select
        className={styles.select}
        value={filters.status}
        onChange={handleStatusChange}
      >
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status === "ALL" ? "Все статусы" : `Статус: ${status}`}
          </option>
        ))}
      </select>

      {/* Поиск по названию */}
      <input
        type="text"
        className={`${styles.input} ${styles.search}`}
        placeholder="Поиск по названию кампании..."
        value={filters.search}
        onChange={handleSearchChange}
      />
    </div>
  );
};
