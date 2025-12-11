// КОД. ФАЙЛ: src/entities/report/api/reportsApi.ts (НОВЫЙ ФАЙЛ)

import { baseApi } from "../../../shared/api/baseApi";
import { API_ROUTES } from "../../../shared/config/api";
import { type CampaignReport, type GetReportParams } from "../model/types";

// Используем 'Report' как тег для кэша отчетов
export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Получение отчета с параметрами
    getCampaignReport: builder.query<CampaignReport, GetReportParams>({
      query: (params) => {
        // Добавляем параметры в строку запроса (Query Params)
        const queryParams = new URLSearchParams({
          start_date: params.startDate,
          end_date: params.endDate,
          ...(params.campaignId && { campaign_id: String(params.campaignId) }),
        }).toString();

        return {
          url: `${API_ROUTES.REPORTS}?${queryParams}`,
          method: "GET",
        };
      },
      providesTags: (result, error, params) => [
        {
          type: "Report",
          id: `${params.startDate}-${params.endDate}-${
            params.campaignId || "all"
          }`,
        },
      ],
    }),
  }),
});

export const { useGetCampaignReportQuery } = reportsApi;
