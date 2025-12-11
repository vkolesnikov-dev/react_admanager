// КОД. ФАЙЛ: src/features/report/ui/ReportParamsForm/ReportParamsForm.tsx

import React, { type FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "../../../../shared/ui";
import styles from "./ReportParamsForm.module.css";

// Zod Схема валидации
const reportParamsSchema = z
  .object({
    startDate: z.string().nonempty("Выберите начальную дату."),
    endDate: z.string().nonempty("Выберите конечную дату."),
    // campaignId опционален, но должен быть числом, если введен
    campaignId: z.preprocess(
      (val) => (val === "" ? undefined : parseInt(String(val), 10)),
      z.number().int().optional().or(z.literal(undefined))
    ),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "Начальная дата не может быть позже конечной.",
    path: ["startDate"],
  });

type ReportParamsFormData = z.infer<typeof reportParamsSchema>;

interface ReportParamsFormProps {
  // Функция для передачи параметров наверх (в useGetCampaignReportQuery)
  onSubmit: (params: ReportParamsFormData) => void;
  isLoading: boolean;
}

// Утилита для получения даты N дней назад
const getDateNDaysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().substring(0, 10);
};

export const ReportParamsForm: FC<ReportParamsFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportParamsFormData>({
    resolver: zodResolver(reportParamsSchema),
    defaultValues: {
      startDate: getDateNDaysAgo(7), // По умолчанию: 7 дней назад
      endDate: getDateNDaysAgo(0), // По умолчанию: Сегодня
      campaignId: undefined,
    },
  });

  const handleFormSubmit: SubmitHandler<ReportParamsFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={styles.formContainer}
    >
      <div className={styles.inputGroup}>
        {/* Начальная дата */}
        <Input
          label="Начальная дата"
          type="date"
          error={errors.startDate?.message}
          {...register("startDate")}
        />

        {/* Конечная дата */}
        <Input
          label="Конечная дата"
          type="date"
          error={errors.endDate?.message}
          {...register("endDate")}
        />

        {/* ID Кампании (опционально) */}
        <Input
          label="ID Кампании (опц.)"
          type="number"
          placeholder="Оставить пустым для всех"
          error={errors.campaignId?.message}
          {...register("campaignId")}
        />
      </div>

      <Button
        type="submit"
        isLoading={isLoading}
        className={styles.submitButton}
      >
        {isLoading ? "Загрузка..." : "Построить отчет"}
      </Button>
    </form>
  );
};
