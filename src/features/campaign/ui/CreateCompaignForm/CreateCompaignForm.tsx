// КОД. ФАЙЛ: src/features/campaign/ui/CreateCampaignForm/CreateCampaignForm.tsx

import React, { type FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import {
  campaignFormSchema,
  type CampaignFormData,
} from "../../lib/validation";
import styles from "./CreateCompaignForm.module.css";
import { useCreateCampaignMutation } from "../../../../entities/compaign/api/campaignsApi";
import { Button, Input } from "../../../../shared/ui";
import { number, unknown } from "zod";

export const CreateCampaignForm: FC = () => {
  const navigate = useNavigate();
  const [createCampaign, { isLoading, error }] = useCreateCampaignMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      name: "",
      budgetType: "TOTAL",
      budgetLimit: "500.0",
      startDate: new Date().toISOString().substring(0, 10), // Сегодняшняя дата
      endDate: "",
      status: "PAUSED",
    },
  });

  const onSubmit: SubmitHandler<CampaignFormData> = async (data) => {
    try {
      // Преобразуем данные формы к типу, ожидаемому API (CreateCampaignRequest)
      await createCampaign({
        ...data,
        // budgetLimit уже число благодаря z.preprocess
      }).unwrap();

      // Успех: перенаправляем обратно на список кампаний
      navigate("/campaigns");
    } catch (err) {
      console.error("Ошибка создания кампании:", err);
      // Реальное приложение должно показать уведомление
    }
  };

  // Временно используем Select, который мы пока не создавали
  const Select = ({ label, children, ...rest }: any) => (
    <div className={styles.fieldGroup}>
      <label>{label}</label>
      <select className={styles.select} {...rest}>
        {children}
      </select>
      {rest.error && <p className={styles.errorMessage}>{rest.error}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <h2>Новая кампания</h2>

      {/* 1. Название */}
      <Input
        label="Название кампании"
        placeholder="Рекламная кампания X"
        error={errors.name?.message}
        {...register("name")}
      />

      <div className={styles.row}>
        {/* 2. Тип бюджета */}
        <Select
          label="Тип бюджета"
          error={errors.budgetType?.message}
          {...register("budgetType")}
        >
          <option value="TOTAL">Общий бюджет</option>
          <option value="DAILY">Ежедневный лимит</option>
        </Select>

        {/* 3. Лимит бюджета */}
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
        {/* 4. Дата начала */}
        <Input
          label="Дата начала"
          type="date"
          error={errors.startDate?.message}
          {...register("startDate")}
        />

        {/* 5. Дата окончания */}
        <Input
          label="Дата окончания (опционально)"
          type="date"
          error={errors.endDate?.message}
          {...register("endDate")}
        />
      </div>

      {/* 6. Статус (Скрыт или простой Select для тестирования) */}
      <Select
        label="Статус"
        error={errors.status?.message}
        {...register("status")}
      >
        <option value="PAUSED">Приостановлена</option>
        <option value="ACTIVE">Активна</option>
      </Select>

      <Button
        type="submit"
        isLoading={isLoading}
        className={styles.submitButton}
      >
        Создать
      </Button>

      {error && (
        <p className={styles.generalError}>
          Ошибка: Не удалось создать кампанию.
        </p>
      )}
    </form>
  );
};
