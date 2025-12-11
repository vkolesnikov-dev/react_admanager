// КОД. ФАЙЛ: src/features/creative/lib/validation.ts

import { z } from "zod";
import { CreativeFormat } from "../../../entities/creative/model/types";

// Базовая схема, общая для всех форматов
const baseCreativeSchema = z.object({
  name: z
    .string()
    .min(3, "Название креатива должно содержать минимум 3 символа."),
  // ID кампании, к которой привязывается креатив. Должен быть числом.
  campaignId: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z
      .number({ required_error: "Выберите кампанию." })
      .int()
      .positive("ID кампании должен быть положительным числом.")
  ),
});

// Схема для формата IMAGE
const imageCreativeSchema = baseCreativeSchema.extend({
  // Используем CreativeFormat.IMAGE как КОНСТАНТНОЕ ЗНАЧЕНИЕ
  format: z.literal(CreativeFormat.IMAGE),
  url: z.string().url("Введите корректный URL изображения."),
  content: z.string().optional(),
});

// Схема для формата VIDEO
const videoCreativeSchema = baseCreativeSchema.extend({
  format: z.literal(CreativeFormat.VIDEO),
  url: z.string().url("Введите корректный URL видео."),
  content: z.string().optional(),
});

// Схема для формата TEXT
const textCreativeSchema = baseCreativeSchema.extend({
  format: z.literal(CreativeFormat.TEXT),
  content: z
    .string()
    .min(10, "Текстовый креатив должен содержать минимум 10 символов."),
  url: z.string().optional(),
});

// Дискриминированное объединение: валидируем по-разному в зависимости от поля 'format'
export const creativeFormSchema = z.discriminatedUnion("format", [
  imageCreativeSchema,
  videoCreativeSchema,
  textCreativeSchema,
]);

export type CreativeFormData = z.infer<typeof creativeFormSchema>;

// Тип для формы, учитывая, что поля могут быть опциональными
export type CreativeFormRawData = {
  name: string;
  campaignId: number;
  format: CreativeFormat;
  url?: string;
  content?: string;
};
