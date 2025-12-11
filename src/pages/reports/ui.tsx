// КОД. ФАЙЛ: src/pages/reports/ui.tsx (Обновление)

import React, { type FC, useState } from "react";

import { Button } from "../../shared/ui";
import type { GetReportParams } from "../../entities/report/model/types";
import { useGetCampaignReportQuery } from "../../entities/report/api/reportsApi";
import { LogoutButton } from "../../features/auth/ui/LogoutButton";
import { ReportParamsForm } from "../../features/report/ui/ReportParamsForm/ReportParamsForm";
import { ReportTable } from "../../widgets/ReportTable/ReportTable";

// Начальные параметры для первого запроса
const initialParams: GetReportParams = {
  startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .substring(0, 10),
  endDate: new Date().toISOString().substring(0, 10),
};

const ReportsPage: FC = () => {
  const [params, setParams] = useState<GetReportParams>(initialParams);

  // 1. Получение данных отчета
  const { data: report, isLoading, error } = useGetCampaignReportQuery(params);

  // Обработчик отправки формы
  const handleFormSubmit = (newParams: GetReportParams) => {
    setParams(newParams);
  };

  return (
    <div style={{ padding: 20, maxWidth: 1400, margin: "0 auto" }}>
      {/* Шапка */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h1>📈 Отчеты по Кампаниям</h1>
        <LogoutButton />
      </header>

      {/* 2. Форма параметров */}
      <ReportParamsForm onSubmit={handleFormSubmit} isLoading={isLoading} />

      {/* 3. Отображение результата */}
      {error ? (
        <div style={{ color: "red", padding: 15, border: "1px solid red" }}>
          Ошибка загрузки отчета.
        </div>
      ) : report ? (
        <ReportTable report={report} />
      ) : (
        !isLoading && (
          <p style={{ padding: 15 }}>Задайте параметры и постройте отчет.</p>
        )
      )}
    </div>
  );
};

export default ReportsPage;
