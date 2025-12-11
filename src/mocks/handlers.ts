// КОД. ФАЙЛ: src/mocks/handlers.ts
// Определения мок-обработчиков для MSW.

import { http, HttpResponse } from "msw";
import { API_BASE_URL, API_ROUTES } from "../shared/config/api";
import {
  generateMockReport,
  MOCK_CAMPAIGNS,
  MOCK_CREATIVES,
  MOCK_JWT_TOKEN,
  MOCK_USER,
} from "../shared/config/mock";
import type { LoginRequest } from "../entities/user/model/types";
import type { Campaign } from "../entities/compaign/model/types";
import {
  type Creative,
  type CreateCreativeRequest,
} from "../entities/creative/model/types";
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
  // 6. Хендлер для получения списка креативов
  http.get(`${API_PREFIX}${API_ROUTES.CREATIVES}`, () => {
    // В будущем здесь должна быть проверка авторизации
    return HttpResponse.json(MOCK_CREATIVES, { status: 200 });
  }),
  // 7. Хендлер для получения одного креатива
  http.get(`${API_PREFIX}${API_ROUTES.CREATIVES}/:id`, ({ params }) => {
    const { id } = params;
    const creativeId = Number(id);
    const creative = MOCK_CREATIVES.find((c) => c.id === creativeId);

    if (creative) {
      return HttpResponse.json(creative, { status: 200 });
    }
    return HttpResponse.json(
      { message: "Creative not found" },
      { status: 404 }
    );
  }),
  // 8. Хендлер для создания креатива (Mutation - POST)
  http.post(`${API_PREFIX}${API_ROUTES.CREATIVES}`, async ({ request }) => {
    // 1. Приведение типа: Ожидаем, что тело будет соответствовать CreateCreativeRequest
    const newCreativeData = (await request.json()) as CreateCreativeRequest;

    // 2. Проверка данных: Если данных нет или они не являются объектом, возвращаем ошибку
    if (!newCreativeData || typeof newCreativeData !== "object") {
      return HttpResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    // 3. Расчет нового ID
    const newId = Math.max(...MOCK_CREATIVES.map((c) => c.id)) + 1;

    // 4. Создание объекта: Теперь TS не ругается, так как newCreativeData гарантированно является объектом
    const createdCreative: Creative = {
      ...newCreativeData,
      id: newId,
      status: "PENDING",
      createdAt: new Date().toISOString().substring(0, 10),
      // Убеждаемся, что content/url установлены, хотя для CreateCreativeRequest это должно быть корректно
      url: newCreativeData.url,
      content: newCreativeData.content,
    }; // Приведение к Creative больше не требуется, так как мы явно создали объект типа Creative

    // 5. Добавляем новый креатив в мок-массив
    MOCK_CREATIVES.push(createdCreative);

    // 6. Возвращаем созданный объект
    return HttpResponse.json(createdCreative, { status: 201 });
  }),
  // 9. Хендлер для получения Отчетов
  http.get(`${API_PREFIX}${API_ROUTES.REPORTS}`, ({ request }) => {
    // 1. Извлекаем параметры из URL запроса
    const url = new URL(request.url);
    const startDate = url.searchParams.get("start_date");
    const endDate = url.searchParams.get("end_date");
    const campaignId = url.searchParams.get("campaign_id");

    if (!startDate || !endDate) {
      return HttpResponse.json(
        { message: "Missing date parameters" },
        { status: 400 }
      );
    }

    const params = {
      startDate,
      endDate,
      campaignId: campaignId ? Number(campaignId) : undefined,
    };

    // 2. Генерируем мок-отчет
    const mockReport = generateMockReport(params);

    // 3. Возвращаем отчет
    return HttpResponse.json(mockReport, { status: 200 });
  }),
  // Здесь будут добавляться другие хендлеры (campaigns, creatives)
];
