// КОД. ФАЙЛ: src/features/campaign/ui/UpdateCampaignForm/UpdateCampaignForm.tsx

import React, { type FC, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";

import { Input, Button } from "../../../../shared/ui";
import {
  useGetCampaignQuery,
  useUpdateCampaignMutation,
} from "../../../../entities/compaign/api/campaignsApi";
import {
  campaignFormSchema,
  type CampaignFormData,
} from "../../lib/validation";
import styles from "./UpdateCompaignsForm.module.css"; // Переиспользуем стили

// Временный Select (для переиспользования)
const Select = ({ label, children, ...rest }: any) => (
  <div className={styles.fieldGroup}>
    <label>{label}</label>
    <select className={styles.select} {...rest}>
      {children}
    </select>
    {rest.error && <p className={styles.errorMessage}>{rest.error}</p>}
  </div>
);

export const UpdateCampaignForm: FC = () => {
  const navigate = useNavigate();
  // 1. Получаем ID из URL
  const { id: campaignId } = useParams<{ id: string }>();
  const campaignIdNum = Number(campaignId);

  // 2. Загружаем данные кампании
  const {
    data: campaign,
    isLoading: isCampaignLoading,
    isError: isCampaignError,
  } = useGetCampaignQuery(
    campaignIdNum,
    { skip: isNaN(campaignIdNum) } // Пропускаем запрос, если ID невалиден
  );

  // 3. Мутация для обновления
  const [updateCampaign, { isLoading: isUpdating, error: updateError }] =
    useUpdateCampaignMutation();

  const {
    register,
    handleSubmit,
    reset, // Используем reset для установки значений после загрузки
    formState: { errors },
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignFormSchema),
    // Здесь мы устанавливаем пустые defaultValues. Реальные значения будут в reset.
    defaultValues: {
      name: "",
      budgetType: "TOTAL",
      budgetLimit: "0.00",
      startDate: "",
      endDate: "",
      status: "PAUSED",
    },
  });

  // Установка значений формы после загрузки данных
  useEffect(() => {
    if (campaign) {
      reset({
        name: campaign.name,
        budgetType: campaign.budgetType,
        // Бюджет передаем как строку, чтобы соответствовать входной схеме Zod (Итерация 13)
        budgetLimit: campaign.budgetLimit.toFixed(2),
        startDate: campaign.startDate,
        endDate: campaign.endDate || "",
        status: campaign.status,
      });
    }
  }, [campaign, reset]);

  const onSubmit: SubmitHandler<CampaignFormData> = async (data) => {
    if (!campaignIdNum) return;

    try {
      await updateCampaign({
        id: campaignIdNum, // Передаем ID в мутацию
        ...data,
        // budgetLimit уже число после трансформации Zod
      }).unwrap();

      // Успех: перенаправляем обратно на список
      navigate("/campaigns");
    } catch (err) {
      console.error("Ошибка обновления кампании:", err);
    }
  };

  if (isCampaignLoading) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        Загрузка данных кампании...
      </div>
    );
  }

  if (isCampaignError || !campaign) {
    return (
      <div style={{ padding: 20, color: "red", textAlign: "center" }}>
        Кампания не найдена или ошибка загрузки.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <h2>
        Редактирование: {campaign.name} (ID: {campaign.id})
      </h2>

      {/* Поля формы идентичны CreateCampaignForm */}
      <Input
        label="Название кампании"
        placeholder="Рекламная кампания X"
        error={errors.name?.message}
        {...register("name")}
      />
      {/* ... (остальные поля row, budgetType, budgetLimit, startDate, endDate) */}
      <div className={styles.row}>
        {/* Тип бюджета */}
        <Select
          label="Тип бюджета"
          error={errors.budgetType?.message}
          {...register("budgetType")}
        >
          <option value="TOTAL">Общий бюджет</option>
          <option value="DAILY">Ежедневный лимит</option>
        </Select>

        {/* Лимит бюджета */}
        <Input
          label="Лимит бюджета (₽)"
          type="number"
          step="0.01"
          placeholder="100.00"
          error={errors.budgetLimit?.message}
          {...register("budgetLimit")}
        />
      </div>
      <div className={styles.row}>
        {/* Дата начала */}
        <Input
          label="Дата начала"
          type="date"
          error={errors.startDate?.message}
          {...register("startDate")}
        />

        {/* Дата окончания */}
        <Input
          label="Дата окончания (опционально)"
          type="date"
          error={errors.endDate?.message}
          {...register("endDate")}
        />
      </div>

      {/* Статус */}
      <Select
        label="Статус"
        error={errors.status?.message}
        {...register("status")}
      >
        <option value="PAUSED">Приостановлена</option>
        <option value="ACTIVE">Активна</option>
        <option value="ARCHIVED">Архивирована (Неактивна)</option>
      </Select>

      <Button
        type="submit"
        isLoading={isUpdating}
        className={styles.submitButton}
      >
        Сохранить изменения
      </Button>

      {updateError && (
        <p className={styles.generalError}>
          Ошибка: Не удалось сохранить изменения.
        </p>
      )}
    </form>
  );
};
