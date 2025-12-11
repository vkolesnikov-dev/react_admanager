// КОД. ФАЙЛ: src/features/creative/ui/CreateCreativeForm/CreateCreativeForm.tsx

import React, { type FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { Input, Button } from "../../../../shared/ui";
import { useCreateCreativeMutation } from "../../../../entities/creative/api/creativesApi";
import {
  creativeFormSchema,
  type CreativeFormRawData,
} from "../../lib/validation";
import { CreativeFormat } from "../../../../entities/creative/model/types";
import styles from "./CreateCreativeForm.module.css";
import { useGetAllCampaignsQuery } from "../../../../entities/compaign/api/campaignsApi";

// Временный Select (переиспользуем стили)
const Select = ({ label, children, error, ...rest }: any) => (
  <div className={styles.fieldGroup}>
    <label>{label}</label>
    <select className={styles.select} {...rest}>
      {children}
    </select>
    {error && <p className={styles.errorMessage}>{error}</p>}
  </div>
);

export const CreateCreativeForm: FC = () => {
  const navigate = useNavigate();
  const [createCreative, { isLoading: isCreating, error: createError }] =
    useCreateCreativeMutation();

  // Получаем список кампаний для Select
  const { data: campaigns, isLoading: isCampaignsLoading } =
    useGetAllCampaignsQuery();

  const {
    register,
    handleSubmit,
    watch, // Для динамического отображения полей
    formState: { errors },
  } = useForm<CreativeFormRawData>({
    resolver: zodResolver(creativeFormSchema),
    defaultValues: {
      name: "",
      campaignId: 0, // Невалидное начальное значение
      format: CreativeFormat.TEXT,
      url: "",
      content: "",
    },
  });

  // Отслеживаем выбранный формат
  const selectedFormat = watch("format");

  const onSubmit: SubmitHandler<CreativeFormRawData> = async (data) => {
    try {
      await createCreative(data).unwrap();
      navigate("/creatives");
    } catch (err) {
      console.error("Ошибка создания креатива:", err);
    }
  };

  if (isCampaignsLoading) {
    return <div style={{ padding: 20 }}>Загрузка данных...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <h2>Создать новый креатив</h2>

      {/* 1. Название */}
      <Input
        label="Название креатива"
        placeholder="Баннер для акции 'Весна'"
        error={errors.name?.message}
        {...register("name")}
      />

      {/* 2. Выбор кампании */}
      <Select
        label="Привязать к кампании"
        error={errors.campaignId?.message}
        {...register("campaignId")}
      >
        <option value={0} disabled>
          -- Выберите кампанию --
        </option>
        {campaigns?.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} (ID: {c.id})
          </option>
        ))}
      </Select>

      {/* 3. Выбор формата */}
      <Select
        label="Формат креатива"
        error={errors.format?.message}
        {...register("format")}
      >
        <option value={CreativeFormat.TEXT}>Текст</option>
        <option value={CreativeFormat.IMAGE}>Изображение</option>
        <option value={CreativeFormat.VIDEO}>Видео</option>
      </Select>

      {/* 4. Динамические поля */}
      {selectedFormat === CreativeFormat.TEXT && (
        <div className={styles.fieldGroup}>
          <label>Текст объявления</label>
          <textarea
            className={styles.textarea}
            rows={4}
            placeholder="Введите текст объявления (мин. 10 символов)"
            {...register("content")}
          />
          {errors.content && (
            <p className={styles.errorMessage}>{errors.content.message}</p>
          )}
        </div>
      )}

      {(selectedFormat === CreativeFormat.IMAGE ||
        selectedFormat === CreativeFormat.VIDEO) && (
        <Input
          label={`URL ${selectedFormat.toLowerCase()}`}
          placeholder="https://example.com/creative/file.jpg"
          error={errors.url?.message}
          {...register("url")}
        />
      )}

      {/* 5. Кнопка отправки */}
      <Button
        type="submit"
        isLoading={isCreating}
        className={styles.submitButton}
      >
        Создать креатив
      </Button>

      {createError && (
        <p className={styles.generalError}>
          Ошибка: Не удалось создать креатив.
        </p>
      )}
    </form>
  );
};
