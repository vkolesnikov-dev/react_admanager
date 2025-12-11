// КОД. ФАЙЛ: src/features/campaign/lib/validation.ts

import { z } from "zod";

// Схема для формы создания кампании
export const campaignFormSchema = z
  .object({
    // 1. Название: Обязательно, минимум 3 символа.
    name: z.string().min(3, "Название должно содержать минимум 3 символа."),

    // 2. Тип бюджета: Должен быть одним из двух значений.
    budgetType: z.enum(["DAILY", "TOTAL"], {
      message: "Выберите тип бюджета.",
    }),

    // 3. Лимит бюджета: Обязательное число, минимум 100.00. Преобразуем из строки.
    budgetLimit: z.preprocess(
      (val) => (typeof val === "string" ? parseFloat(val) : val),
      z.number().min(100, "Бюджет должен быть не менее 100 рублей.")
    ),

    // 4. Дата начала: Обязательная строка-дата.
    startDate: z.string().min(1, "Укажите дату начала кампании."),

    // 5. Дата окончания: Опциональная строка-дата. Должна быть пустой или валидной.
    endDate: z
      .string()
      .optional()
      .refine((val) => !val || new Date(val).toString() !== "Invalid Date", {
        message: "Неверный формат даты окончания.",
      }),

    // 6. Статус: По умолчанию 'PAUSED' при создании.
    status: z
      .enum(["ACTIVE", "PAUSED"], {
        message: "Выберите статус.",
      })
      .default("PAUSED"),
  })
  .refine(
    (data) => {
      // Кросс-валидация: Дата окончания должна быть позже даты начала, если она указана.
      if (data.endDate) {
        const start = new Date(data.startDate);
        const end = new Date(data.endDate);

        // Сравниваем только даты, игнорируя время
        return end.setHours(0, 0, 0, 0) >= start.setHours(0, 0, 0, 0);
      }
      return true;
    },
    {
      message:
        "Дата окончания не может быть раньше или совпадать с датой начала.",
      path: ["endDate"],
    }
  );

export type CampaignFormData = z.infer<typeof campaignFormSchema>;
