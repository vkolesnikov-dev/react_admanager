// КОД. ФАЙЛ: src/entities/campaign/api/campaignsApi.ts
// Эндпоинты RTK Query для работы с кампаниями.

import { baseApi } from "../../../shared/api/baseApi";
import { API_ROUTES } from "../../../shared/config/api";
import {
  type Campaign,
  type CreateCampaignRequest,
  type UpdateCampaignRequest,
} from "../model/types";

// Расширяем базовый API
export const campaignsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Получение всех кампаний (Query)
    getAllCampaigns: builder.query<Campaign[], void>({
      query: () => ({ url: API_ROUTES.CAMPAIGNS }),
      // Предоставляем теги для инвалидации кэша
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Campaign" as const, id })),
              { type: "Campaign", id: "LIST" },
            ]
          : [{ type: "Campaign", id: "LIST" }],
    }),

    // 2. Создание новой кампании (Mutation)
    createCampaign: builder.mutation<Campaign, CreateCampaignRequest>({
      query: (newCampaign) => ({
        url: API_ROUTES.CAMPAIGNS,
        method: "POST",
        body: newCampaign,
      }),
      // Инвалидируем кэш списка после создания
      invalidatesTags: [{ type: "Campaign", id: "LIST" }],
    }),

    // 3. Обновление существующей кампании (Mutation)
    updateCampaign: builder.mutation<Campaign, UpdateCampaignRequest>({
      query: ({ id, ...patch }) => ({
        url: `${API_ROUTES.CAMPAIGNS}/${id}`,
        method: "PATCH",
        body: patch,
      }),
      // Инвалидируем конкретный элемент и список после обновления
      invalidatesTags: (result, error, { id }) => [{ type: "Campaign", id }],
    }),
    // 4. Получение ОДНОЙ кампании по ID (Query)
    getCampaign: builder.query<Campaign, number>({
      query: (id) => ({ url: `${API_ROUTES.CAMPAIGNS}/${id}` }),
      // Предоставляем тег для кэша
      providesTags: (result, error, id) => [{ type: "Campaign", id }],
    }),
  }),
});

// Экспорт хуков
export const {
  useGetAllCampaignsQuery,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
  useGetCampaignQuery,
} = campaignsApi;
