// КОД. ФАЙЛ: src/widgets/CreativesTable/CreativesTable.tsx

import React, { type FC } from "react";

import styles from "./CreativesTable.module.css";
import type { Creative } from "../../entities/creative/model/types";
import { Badge, CreativePreview } from "../../shared/ui";
// В будущем сюда добавим логику удаления и редактирования

interface CreativesTableProps {
  creatives: Creative[];
  onDelete?: (id: number) => void;
  // onEdit?: (id: number) => void;
}

export const CreativesTable: FC<CreativesTableProps> = ({
  creatives,
  onDelete,
}) => {
  if (creatives.length === 0) {
    return <p>Нет креативов для отображения.</p>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Превью</th>
            <th>Название</th>
            <th>Кампания ID</th>
            <th>Формат</th>
            <th>Статус</th>
            <th>Создан</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {creatives.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>
                <CreativePreview creative={c} />
              </td>
              <td>{c.name}</td>
              <td>{c.campaignId}</td>
              <td>{c.format}</td>
              <td>
                <Badge status={c.status.toUpperCase() as any} />
              </td>{" "}
              {/* Переиспользуем Badge */}
              <td>{c.createdAt.substring(0, 10)}</td>
              <td>
                {/* Кнопки действий (редактирование, удаление) */}
                <button
                  onClick={() => onDelete && onDelete(c.id)} // <-- Вызываем onDelete
                  disabled={c.status === "APPROVED"} // Пример бизнес-правила: одобренные нельзя удалять
                  style={{
                    color: c.status === "APPROVED" ? "gray" : "red",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
