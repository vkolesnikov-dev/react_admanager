// КОД. ФАЙЛ: src/widgets/ReportTable/ReportTable.tsx (НОВЫЙ ФАЙЛ)

import React, { type FC } from "react";
import {
  type CampaignReport,
  type ReportRow,
} from "../../entities/report/model/types";
import styles from "./ReportTable.module.css";

interface ReportTableProps {
  report: CampaignReport;
}

// Утилита для форматирования числа
const formatNumber = (num: number, decimals: number = 2) =>
  num.toLocaleString("ru-RU", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

const TableRow: FC<{ row: ReportRow }> = ({ row }) => (
  <tr>
    <td>{row.date}</td>
    <td>{formatNumber(row.impressions, 0)}</td>
    <td>{formatNumber(row.clicks, 0)}</td>
    <td>{formatNumber(row.cost, 0)}</td>
    <td>{formatNumber(row.ctr * 100, 2)}%</td>
    <td>{formatNumber(row.cpc, 2)} ₽</td>
  </tr>
);

export const ReportTable: FC<ReportTableProps> = ({ report }) => {
  const { reportName, totalClicks, totalCost, totalImpressions, rows } = report;

  if (rows.length === 0) {
    return <p>Отчет не содержит данных за указанный период.</p>;
  }

  return (
    <div className={styles.container}>
      <h2>{reportName}</h2>

      {/* Сводная таблица */}
      <div className={styles.summaryGrid}>
        <div className={styles.summaryItem}>
          <p className={styles.label}>Показы</p>
          <p className={styles.value}>{formatNumber(totalImpressions, 0)}</p>
        </div>
        <div className={styles.summaryItem}>
          <p className={styles.label}>Клики</p>
          <p className={styles.value}>{formatNumber(totalClicks, 0)}</p>
        </div>
        <div className={styles.summaryItem}>
          <p className={styles.label}>Общий расход</p>
          <p className={styles.value}>{formatNumber(totalCost, 0)} ₽</p>
        </div>
        <div className={styles.summaryItem}>
          <p className={styles.label}>Общий CTR</p>
          <p className={styles.value}>
            {formatNumber((totalClicks / totalImpressions) * 100, 2)}%
          </p>
        </div>
      </div>

      {/* Детальная таблица */}
      <h3>Ежедневная детализация</h3>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Показы</th>
              <th>Клики</th>
              <th>Расход, ₽</th>
              <th>CTR</th>
              <th>CPC, ₽</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <TableRow key={row.date} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
