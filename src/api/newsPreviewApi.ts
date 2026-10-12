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
      // keepUnusedDataFor: 10,
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

// NOTE: useGetNewsPreviewQuery - тригер для сетевого запроса
// Описание цепочки событий начиная с тригера:
// 1) Компонент монтируется ➔ вызывает useGetNewsPreviewQuery()
// 2) RTK Query отправляет HTTP-запрос на сервер
// 3) Успешный ответ ➔ RTK Query отправрляет экшен getNewsPreview.matchFulfilled
// 4) newsPreviewSlice перехватывает этот экшен ➔ обновляет state.newsPreview.article
// 5) redux-persist автоматически сохраняет новое состояние на диск в AsyncStorage
// 6) useAppSelector(selectNewsPreview) реагирует на изменение в Store ➔ рендерит новую новость на экране
