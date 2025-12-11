// КОД. ФАЙЛ: src/features/auth/ui/LoginByEmail.tsx

import React, { type FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { LoginForm } from "../../../widgets/LoginForm/LoginForm";
import { Input } from "../../../shared/ui";
import { useLoginMutation } from "../../../entities/user/api/authApi";
import { loginSchema, type LoginFormData } from "../lib/validation";
import { setToken } from "../../../shared/lib/auth/token"; // Предполагаем, что setToken уже существует

export const LoginByEmail: FC = () => {
  const navigate = useNavigate();

  // Хук RTK Query
  const [login, { isLoading, error }] = useLoginMutation();

  // Настройка React Hook Form с Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "user@example.com",
      password: "123456",
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const result = await login(data).unwrap();

      // Сохраняем токен и перенаправляем (логика из Итерации 9)
      setToken(result.token);
      navigate("/campaigns");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit(onSubmit)} isLoading={isLoading}>
      <Input
        label="Email"
        type="email"
        placeholder="test@example.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Пароль"
        type="password"
        placeholder="******"
        error={errors.password?.message}
        {...register("password")}
      />
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          Неверный Email или пароль.
        </p>
      )}
    </LoginForm>
  );
};
