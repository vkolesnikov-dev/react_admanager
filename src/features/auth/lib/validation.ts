// КОД. ФАЙЛ: src/features/auth/lib/validation.ts

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Неверный формат email" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен быть не менее 6 символов" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
