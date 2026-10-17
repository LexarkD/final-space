import { newsOpenApi } from './newsOpenApi';
import type {
  PaginatedArticleListRead,
  ArticlesListApiArg,
} from '../types/newsApiType';

export const newsListApi = newsOpenApi.injectEndpoints({
  endpoints: builder => ({
    getNewsList: builder.query<PaginatedArticleListRead, ArticlesListApiArg>({
      query: ({ limit = 10, offset = 0 }) => ({
        url: '/v4/articles/',
        params: {
          limit,
          offset,
        },
      }),
      transformResponse: (
        response: PaginatedArticleListRead,
      ): PaginatedArticleListRead => {
        if (!response || !response.results) {
          throw new Error('Сервер вернул пустой ответ: новости не найдены');
        }
        return response;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetNewsListQuery } = newsListApi;
