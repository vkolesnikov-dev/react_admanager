// КОД. ФАЙЛ: src/widgets/CampaignsTable/CampaignsTable.tsx

import React, { type FC } from "react";
import { Badge } from "../../shared/ui";
import styles from "./CampaignsTable.module.css";
import type { Campaign } from "../../entities/compaign/model/types";
import { useNavigate } from "react-router-dom";
import type {
  SortDirection,
  SortField,
} from "../../features/campaign/hooks/useCampaignFilters";

interface CampaignsTableProps {
  campaigns: Campaign[];
  onEdit?: (campaign: Campaign) => void;
}
// Добавляем новые пропсы для сортировки
interface CampaignsTableProps {
  campaigns: Campaign[];
  // Пропсы для сортировки
  currentSort: {
    by: SortField;
    direction: SortDirection;
  };
  setSort: (field: SortField) => void;
}

// Хелпер для форматирования валюты
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB" }).format(
    amount
  );

const TableHeader: FC<{
  field: SortField;
  label: string;
  currentSort: CampaignsTableProps["currentSort"];
  setSort: CampaignsTableProps["setSort"];
}> = ({ field, label, currentSort, setSort }) => {
  const isCurrent = currentSort.by === field;
  const arrow = isCurrent
    ? currentSort.direction === "asc"
      ? " ▲"
      : " ▼"
    : "";

  return (
    <th onClick={() => setSort(field)} className={styles.sortable}>
      {label}
      <span className={styles.sortArrow}>{arrow}</span>
    </th>
  );
};

export const CampaignsTable: FC<CampaignsTableProps> = ({
  campaigns,
  currentSort,
  setSort,
}) => {
  const navigate = useNavigate();
  const handleEdit = (id: number) => {
    navigate(`/campaigns/${id}/edit`);
  };
  if (campaigns.length === 0) {
    return <p>Нет активных кампаний.</p>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {/* Заголовки таблицы с сортировкой */}
            <TableHeader
              field="id"
              label="ID"
              currentSort={currentSort}
              setSort={setSort}
            />
            <TableHeader
              field="name"
              label="Название"
              currentSort={currentSort}
              setSort={setSort}
            />
            <th>Статус</th> {/* Статус не сортируется */}
            <TableHeader
              field="budgetLimit"
              label="Бюджет"
              currentSort={currentSort}
              setSort={setSort}
            />
            <TableHeader
              field="spent"
              label="Потрачено"
              currentSort={currentSort}
              setSort={setSort}
            />
            <TableHeader
              field="startDate"
              label="Дата начала"
              currentSort={currentSort}
              setSort={setSort}
            />
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>
                <Badge status={c.status} />
              </td>
              <td className={styles.budget}>
                {formatCurrency(c.budgetLimit)} (
                {c.budgetType === "DAILY" ? "Дн." : "Общ."})
              </td>
              <td>{formatCurrency(c.spent)}</td>
              <td>
                {c.startDate} - {c.endDate || "Нет"}
              </td>
              <td>
                {/* Кнопка Редактировать (будет реализована позже) */}
                <button
                  onClick={() => handleEdit(c.id)} // <-- Вызов навигации
                  disabled={c.status === "ARCHIVED"}
                >
                  {c.status !== "ARCHIVED" ? "Редактировать" : "—"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
