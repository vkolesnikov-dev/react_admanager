// КОД. ФАЙЛ: src/pages/creatives/ui.tsx
// Страница, которая получает данные и передает их виджету.

import { useGetAllCreativesQuery } from "../../entities/creative/api/creativesApi";
import { CreativesTable } from "../../widgets/CreativesTable/CreativesTable";
import { LogoutButton } from "../../features/auth/ui/LogoutButton";
import { DeleteCreative } from "../../features/creative/ui/DeleteCreative/DeleteCreative"; // <-- НОВЫЙ ИМПОРТ
import { Button } from "../../shared/ui";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, type FC } from "react";

const CreativesPage: FC = () => {
  const navigate = useNavigate();
  // 1. Получение данных с помощью RTK Query
  const { data: creatives, isLoading, error } = useGetAllCreativesQuery();

  // Состояние для модального окна удаления
  const [creativeToDeleteId, setCreativeToDeleteId] = useState<number | null>(
    null
  );

  // Получаем имя креатива для отображения в модальном окне
  const creativeToDelete =
    creatives?.find((c) => c.id === creativeToDeleteId) || null;

  const handleCreate = () => {
    navigate("/creatives/create");
  };
  // Функция, вызываемая из таблицы для подтверждения удаления
  const handleDeleteClick = useCallback((id: number) => {
    setCreativeToDeleteId(id);
  }, []);
  // Функция для закрытия модального окна
  const handleCloseDelete = useCallback(() => {
    setCreativeToDeleteId(null);
  }, []);

  // В будущем сюда добавим логику onDelete, используя useDeleteCreativeMutation

  if (isLoading) {
    return <div style={{ padding: 20 }}>Загрузка списка креативов...</div>;
  }

  if (error) {
    console.error("Ошибка загрузки креативов:", error);
    return (
      <div style={{ padding: 20, color: "red" }}>
        Ошибка при загрузке данных креативов.
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
        <h1>🖼️ Креативы ({creatives?.length || 0})</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <Button onClick={handleCreate}>+ Создать креатив</Button>
          <LogoutButton />
        </div>
      </header>

      {creatives && (
        <CreativesTable creatives={creatives} onDelete={handleDeleteClick} />
      )}

      <DeleteCreative
        creativeId={creativeToDeleteId}
        creativeName={creativeToDelete?.name || null}
        onClose={handleCloseDelete}
      />
    </div>
  );
};

export default CreativesPage;
