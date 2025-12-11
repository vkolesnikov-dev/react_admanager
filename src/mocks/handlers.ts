// КОД. ФАЙЛ: src/mocks/handlers.ts
// Определения мок-обработчиков для MSW.

import { http, HttpResponse } from "msw";
import { API_BASE_URL, API_ROUTES } from "../shared/config/api";
import {
  MOCK_CAMPAIGNS,
  MOCK_JWT_TOKEN,
  MOCK_USER,
} from "../shared/config/mock";
import type { LoginRequest } from "../entities/user/model/types";
import type { Campaign } from "../entities/compaign/model/types";

const API_PREFIX = API_BASE_URL; // Префикс, который мы добавили в baseApi (http://localhost:8000/api)

export const handlers = [
  // 1. Хендлер для логина
  http.post(`${API_PREFIX}${API_ROUTES.LOGIN}`, async ({ request }) => {
    const { email, password } = (await request.json()) as LoginRequest;

    // Простая симуляция проверки:
    if (email === MOCK_USER.email && password === "123456") {
      return HttpResponse.json(
        {
          user: MOCK_USER,
          token: MOCK_JWT_TOKEN, // Отправляем наш мок-токен
        },
        { status: 200 }
      );
    }

    // Если данные не совпадают
    return HttpResponse.json(
      {
        message: "Invalid credentials",
      },
      { status: 401 }
    );
  }),

  // 2. Хендлер для регистрации
  http.post(`${API_PREFIX}${API_ROUTES.REGISTER}`, async ({ request }) => {
    // В реальном приложении здесь была бы логика создания пользователя
    return HttpResponse.json(
      {
        user: MOCK_USER,
        token: MOCK_JWT_TOKEN,
      },
      { status: 201 }
    );
  }),

  http.get(`${API_PREFIX}${API_ROUTES.CAMPAIGNS}`, () => {
    // В будущем здесь должна быть проверка авторизации
    return HttpResponse.json(MOCK_CAMPAIGNS, { status: 200 });
  }),
  // 4. Хендлер для получения ОДНОЙ кампании по ID
  http.get(`${API_PREFIX}${API_ROUTES.CAMPAIGNS}/:id`, ({ params }) => {
    const { id } = params;

    // Ищем кампанию в мок-данных по ID
    const campaignId = Number(id);
    const campaign = MOCK_CAMPAIGNS.find((c) => c.id === campaignId);

    if (campaign) {
      return HttpResponse.json(campaign, { status: 200 });
    }

    return HttpResponse.json(
      { message: "Campaign not found" },
      { status: 404 }
    );
  }),
  http.patch(
    `${API_PREFIX}${API_ROUTES.CAMPAIGNS}/:id`,
    async ({ params, request }) => {
      const { id } = params;
      const campaignIdNum = Number(id);

      // Получаем тело запроса (обновляемые данные)
      const updatedFields = (await request.json()) as Partial<Campaign>;

      const campaignIndex = MOCK_CAMPAIGNS.findIndex(
        (c) => c.id === campaignIdNum
      );

      if (campaignIndex === -1) {
        return HttpResponse.json(
          { message: "Campaign not found" },
          { status: 404 }
        );
      }

      // Симуляция обновления
      const existingCampaign = MOCK_CAMPAIGNS[campaignIndex];
      const updatedCampaign = {
        ...existingCampaign,
        ...updatedFields,
        // Гарантируем, что ID не меняется
        id: existingCampaign.id,
      } as Campaign;

      // Обновляем мок-массив (для симуляции кэша)
      MOCK_CAMPAIGNS[campaignIndex] = updatedCampaign;

      // Возвращаем обновленный объект
      return HttpResponse.json(updatedCampaign, { status: 200 });
    }
  ),
  // Здесь будут добавляться другие хендлеры (campaigns, creatives)
];
