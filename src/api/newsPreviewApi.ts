import { newsOpenApi } from './newsOpenApi';
import type {
  PaginatedArticleListRead,
  ArticleRead,
} from '../types/newsApiType';

// NOTE: принцип расширения запросов описан в baseNewsApi.ts
export const newsPreviewApi = newsOpenApi.injectEndpoints({
  endpoints: builder => ({
    getNewsPreview: builder.query<ArticleRead, void>({
      query: () => ({
        url: '/v4/articles/',
        params: { limit: 1 },
      }),
      // NOTE: Трансформирую и валидирую ответ сервера до попадения в redux store
      transformResponse: (response: PaginatedArticleListRead): ArticleRead => {
        const newsPreview = response?.results?.[0];
        if (!newsPreview) {
          throw new Error(
            'Сервер вернул пустой ответ: новость превью не найдена',
          );
        }

        return newsPreview;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetNewsPreviewQuery } = newsPreviewApi;
