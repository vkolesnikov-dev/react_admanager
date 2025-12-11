// КОД. ФАЙЛ: src/entities/creative/api/creativesApi.ts
// Эндпоинты RTK Query для работы с креативами.

import { baseApi } from "../../../shared/api/baseApi";
import { API_ROUTES } from "../../../shared/config/api";
import { type Creative, type CreateCreativeRequest } from "../model/types";

// Расширяем базовый API
export const creativesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Получение всех креативов (Query)
    getAllCreatives: builder.query<Creative[], void>({
      query: () => ({ url: API_ROUTES.CREATIVES }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Creative" as const, id })),
              { type: "Creative", id: "LIST" },
            ]
          : [{ type: "Creative", id: "LIST" }],
    }),

    // 2. Получение одного креатива
    getCreative: builder.query<Creative, number>({
      query: (id) => ({ url: `${API_ROUTES.CREATIVES}/${id}` }),
      providesTags: (result, error, id) => [{ type: "Creative", id }],
    }),

    // 3. Создание нового креатива (Mutation)
    createCreative: builder.mutation<Creative, CreateCreativeRequest>({
      query: (newCreative) => ({
        url: API_ROUTES.CREATIVES,
        method: "POST",
        body: newCreative,
      }),
      invalidatesTags: [{ type: "Creative", id: "LIST" }],
    }),

    // 4. Удаление креатива (Mutation)
    deleteCreative: builder.mutation<void, number>({
      query: (id) => ({
        url: `${API_ROUTES.CREATIVES}/${id}`,
        method: "DELETE",
      }),
      // Инвалидируем список и конкретный элемент
      invalidatesTags: (result, error, id) => [
        { type: "Creative", id: "LIST" },
        { type: "Creative", id },
      ],
    }),
  }),
});

// Экспорт хуков
export const {
  useGetAllCreativesQuery,
  useGetCreativeQuery,
  useCreateCreativeMutation,
  useDeleteCreativeMutation,
} = creativesApi;
