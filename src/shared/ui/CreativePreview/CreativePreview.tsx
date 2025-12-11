// КОД. ФАЙЛ: src/shared/ui/CreativePreview/CreativePreview.tsx

import React, { type FC } from "react";
import { type Creative } from "../../../entities/creative/model/types";
import styles from "./CreativePreview.module.css";

interface CreativePreviewProps {
  creative: Creative;
}

export const CreativePreview: FC<CreativePreviewProps> = ({ creative }) => {
  const { format, url, content } = creative;

  switch (format) {
    case "IMAGE":
    case "VIDEO":
      // Предполагаем, что URL содержит ссылку на миниатюру
      if (url) {
        return (
          <div className={styles.preview}>
            <img
              src={url}
              alt={`Превью ${format}`}
              className={styles.image}
              // Обработка отсутствующего или битого изображения
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        );
      }
      return <div className={styles.preview}>Нет файла</div>;

    case "TEXT":
      return (
        <div className={styles.preview}>
          <div className={styles.text}>{content || "[Пустой текст]"}</div>
        </div>
      );

    default:
      return <div className={styles.preview}>Неизвестный формат</div>;
  }
};
