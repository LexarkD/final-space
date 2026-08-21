import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NASA_API_KEY } from '../constants/apiKey';
import type { APODResponse } from '../types/apod';

// NOTE: Если отсутствует собственный зарегестрированный ключ, NASA предоставляет тестовый ключ 'DEMO_KEY'
// const NASA_API_KEY = 'DEMO_KEY';

export const nasaApi = createApi({
  reducerPath: 'nasaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.nasa.gov/',
  }),
  endpoints: builder => ({
    // NOTE: тип ответа - APODResponse, тип аргумента - void, так как ничего передавать не нужно.
    getApod: builder.query<APODResponse, void>({
      query: () => ({
        url: 'planetary/apod',
        params: {
          api_key: NASA_API_KEY,
          thumbs: true,
        },
      }),
    }),
  }),
});

// NOTE: RTK Query автоматически создают хук по шаблону- use + <endpoints name> + Query
export const { useGetApodQuery } = nasaApi;
