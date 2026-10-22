import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Apod, ApodResponse } from '../types/apodApiType';
import { toApod } from '../utils/apodMapper';

export const nasaApi = createApi({
  reducerPath: 'nasaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://science.nasa.gov/wp-json/wp/v2/',
  }),
  endpoints: builder => ({
    getApod: builder.query<Apod, void>({
      query: () => ({ url: 'apod-basic', params: { per_page: 1 } }),
      transformResponse: (response: ApodResponse[]): Apod => {
        const latest = response?.[0];
        if (!latest) {
          throw new Error('Сервер вернул пустой ответ: фото дня не найдено');
        }
        return toApod(latest);
      },
    }),
  }),
});

// NOTE: RTK Query автоматически создают хук по шаблону- use + <endpoints name> + Query
export const { useGetApodQuery } = nasaApi;

//NOTE: Общая картина
// Сервер → RTK Query получает JSON → transformResponse → toApod(raw) → кэш в Redux store → компонент
