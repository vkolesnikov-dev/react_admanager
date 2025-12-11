// КОД. ФАЙЛ: src/pages/campaigns/ui.tsx
// Страница, которая получает данные и передает их виджету.

import React, { type FC } from "react";
import { useGetAllCampaignsQuery } from "../../entities/compaign/api/campaignsApi";
import { Button } from "../../shared/ui";
import { LogoutButton } from "../../features/auth/ui/LogoutButton";
import { CampaignsTable } from "../../widgets/CampaignsTable/CampaignsTable";
import { CampaignFilter } from "../../features/campaign/ui/CampaignFilter/CampaignFilter";
import { useNavigate } from "react-router-dom";
import { useCampaignFilters } from "../../features/campaign/hooks/useCampaignFilters";

const CampaignsPage: FC = () => {
  const navigate = useNavigate();
  // 1. Получение данных (исходный список)
  const { data: allCampaigns, isLoading, error } = useGetAllCampaignsQuery();

  const { filteredAndSortedCampaigns, filters, setStatus, setSearch, setSort } =
    useCampaignFilters(allCampaigns);

  // Хендлер для навигации на создание (будет реализован позже)
  const handleCreate = () => {
    navigate("/campaigns/create");
    // navigate('/campaigns/create');
  };

  if (isLoading) {
    return <div style={{ padding: 20 }}>Загрузка списка кампаний...</div>;
  }

  if (error) {
    // В зависимости от типа ошибки можно показать разные сообщения
    console.error("Ошибка загрузки кампаний:", error);
    return (
      <div style={{ padding: 20, color: "red" }}>
        Ошибка при загрузке данных. Попробуйте обновить страницу.
      </div>
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
      {/* Шапка страницы */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h1>
          📊 Кампании ({filteredAndSortedCampaigns.length} из{" "}
          {allCampaigns?.length || 0})
        </h1>{" "}
        <div style={{ display: "flex", gap: 10 }}>
          <Button onClick={handleCreate}>+ Создать кампанию</Button>
          <LogoutButton />
        </div>
      </header>
      <CampaignFilter
        filters={filters}
        setStatus={setStatus}
        setSearch={setSearch}
      />

      {/* 4. Отображение виджета с отфильтрованными/отсортированными данными */}
      {filteredAndSortedCampaigns && (
        <CampaignsTable
          campaigns={filteredAndSortedCampaigns}
          currentSort={{ by: filters.sortBy, direction: filters.sortDirection }}
          setSort={setSort}
        />
      )}
    </div>
  );
};

export default CampaignsPage;
