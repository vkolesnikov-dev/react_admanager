// КОД. ФАЙЛ: src/features/creative/ui/DeleteCreative/DeleteCreative.tsx

import React, { type FC, useState, useCallback } from "react";
import { useDeleteCreativeMutation } from "../../../../entities/creative/api/creativesApi";
import { Button, Modal } from "../../../../shared/ui";

interface DeleteCreativeProps {
  creativeId: number | null;
  creativeName: string | null;
  onClose: () => void;
}

export const DeleteCreative: FC<DeleteCreativeProps> = ({
  creativeId,
  creativeName,
  onClose,
}) => {
  // Хук мутации
  const [deleteCreative, { isLoading, error }] = useDeleteCreativeMutation();

  // Локальное состояние для отображения ошибки после попытки удаления
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleDelete = useCallback(async () => {
    if (!creativeId) return;

    try {
      await deleteCreative(creativeId).unwrap();
      // Успех: закрываем модальное окно
      onClose();
    } catch (err) {
      // Ошибка: показываем сообщение
      setSubmissionError(
        "Не удалось удалить креатив. Возможно, он используется или произошла ошибка сервера."
      );
      console.error("Creative deletion failed:", err);
    }
  }, [creativeId, deleteCreative, onClose]);

  // Сбрасываем ошибку при открытии нового окна
  const handleClose = () => {
    setSubmissionError(null);
    onClose();
  };

  const isModalOpen = creativeId !== null;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleClose}
      title="Подтверждение удаления"
    >
      <p>
        Вы действительно хотите удалить креатив{" "}
        <strong>"{creativeName}"</strong> (ID: {creativeId})?
      </p>
      <p>Это действие необратимо.</p>

      {submissionError && (
        <p style={{ color: "var(--color-error)", marginTop: "10px" }}>
          {submissionError}
        </p>
      )}

      <div slot="footer">
        <Button onClick={handleClose} variant="secondary" disabled={isLoading}>
          Отмена
        </Button>
        <Button onClick={handleDelete} variant="danger" isLoading={isLoading}>
          {isLoading ? "Удаление..." : "Удалить"}
        </Button>
      </div>
    </Modal>
  );
};
