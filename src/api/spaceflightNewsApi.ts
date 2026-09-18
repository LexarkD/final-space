// NOTE: Контракт и хуки сгенерированы автоматически (см. openapi-config.ts)
// Используется подход Code Splitting:
// Вместо того чтобы инициализировать все эндпоинты огромного API при старте приложения, происходит инициализация пустого API (baseSplitApi.ts),
// а затем происходит «внедрение» (inject) в него эндпоинтов, по мере загрузки экранов, использующих эти хуки.
// Внутрянка этих хуков такая же, как если бы это были рукописные хуки.
// rtk-query/codegen-openapi использует этот подход при генерации.

import { baseSplitApi as api } from './baseSplitApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    articlesList: build.query<ArticlesListApiResponse, ArticlesListApiArg>({
      query: queryArg => ({
        url: `/v4/articles/`,
        params: {
          event: queryArg.event,
          has_event: queryArg.hasEvent,
          has_launch: queryArg.hasLaunch,
          is_featured: queryArg.isFeatured,
          launch: queryArg.launch,
          // NOTE: limit: Количество результатов в ответе
          limit: queryArg.limit,
          news_site: queryArg.newsSite,
          news_site_exclude: queryArg.newsSiteExclude,
          offset: queryArg.offset,
          ordering: queryArg.ordering,
          published_at_gt: queryArg.publishedAtGt,
          published_at_gte: queryArg.publishedAtGte,
          published_at_lt: queryArg.publishedAtLt,
          published_at_lte: queryArg.publishedAtLte,
          // NOTE: search: Поиск документов, содержащих определенную фразу в заголовке или кратком описании.
          search: queryArg.search,
          summary_contains: queryArg.summaryContains,
          summary_contains_all: queryArg.summaryContainsAll,
          summary_contains_one: queryArg.summaryContainsOne,
          title_contains: queryArg.titleContains,
          title_contains_all: queryArg.titleContainsAll,
          title_contains_one: queryArg.titleContainsOne,
          updated_at_gt: queryArg.updatedAtGt,
          updated_at_gte: queryArg.updatedAtGte,
          updated_at_lt: queryArg.updatedAtLt,
          updated_at_lte: queryArg.updatedAtLte,
        },
      }),
    }),

    //NOTE: articlesRetrieve автоматически подставит id в URL: url: /v4/articles/${queryArg.id}/``.
    articlesRetrieve: build.query<
      ArticlesRetrieveApiResponse,
      ArticlesRetrieveApiArg
    >({
      // NOTE: /v4/articles/{id}/
      // Возвращает статью по id
      query: queryArg => ({ url: `/v4/articles/${queryArg.id}/` }),
    }),
    blogsList: build.query<BlogsListApiResponse, BlogsListApiArg>({
      query: queryArg => ({
        url: `/v4/blogs/`,
        params: {
          event: queryArg.event,
          has_event: queryArg.hasEvent,
          has_launch: queryArg.hasLaunch,
          is_featured: queryArg.isFeatured,
          launch: queryArg.launch,
          limit: queryArg.limit,
          news_site: queryArg.newsSite,
          news_site_exclude: queryArg.newsSiteExclude,
          offset: queryArg.offset,
          ordering: queryArg.ordering,
          published_at_gt: queryArg.publishedAtGt,
          published_at_gte: queryArg.publishedAtGte,
          published_at_lt: queryArg.publishedAtLt,
          published_at_lte: queryArg.publishedAtLte,
          search: queryArg.search,
          summary_contains: queryArg.summaryContains,
          summary_contains_all: queryArg.summaryContainsAll,
          summary_contains_one: queryArg.summaryContainsOne,
          title_contains: queryArg.titleContains,
          title_contains_all: queryArg.titleContainsAll,
          title_contains_one: queryArg.titleContainsOne,
          updated_at_gt: queryArg.updatedAtGt,
          updated_at_gte: queryArg.updatedAtGte,
          updated_at_lt: queryArg.updatedAtLt,
          updated_at_lte: queryArg.updatedAtLte,
        },
      }),
    }),
    blogsRetrieve: build.query<BlogsRetrieveApiResponse, BlogsRetrieveApiArg>({
      query: queryArg => ({ url: `/v4/blogs/${queryArg.id}/` }),
    }),
    infoRetrieve: build.query<InfoRetrieveApiResponse, InfoRetrieveApiArg>({
      query: () => ({ url: `/v4/info/` }),
    }),
    reportsList: build.query<ReportsListApiResponse, ReportsListApiArg>({
      query: queryArg => ({
        url: `/v4/reports/`,
        params: {
          limit: queryArg.limit,
          news_site: queryArg.newsSite,
          news_site_exclude: queryArg.newsSiteExclude,
          offset: queryArg.offset,
          ordering: queryArg.ordering,
          published_at_gt: queryArg.publishedAtGt,
          published_at_gte: queryArg.publishedAtGte,
          published_at_lt: queryArg.publishedAtLt,
          published_at_lte: queryArg.publishedAtLte,
          search: queryArg.search,
          summary_contains: queryArg.summaryContains,
          summary_contains_all: queryArg.summaryContainsAll,
          summary_contains_one: queryArg.summaryContainsOne,
          title_contains: queryArg.titleContains,
          title_contains_all: queryArg.titleContainsAll,
          title_contains_one: queryArg.titleContainsOne,
          updated_at_gt: queryArg.updatedAtGt,
          updated_at_gte: queryArg.updatedAtGte,
          updated_at_lt: queryArg.updatedAtLt,
          updated_at_lte: queryArg.updatedAtLte,
        },
      }),
    }),
    reportsRetrieve: build.query<
      ReportsRetrieveApiResponse,
      ReportsRetrieveApiArg
    >({
      query: queryArg => ({ url: `/v4/reports/${queryArg.id}/` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as spaceflightNewsApi };
export type ArticlesListApiResponse =
  /** status 200  */ PaginatedArticleListRead;
export type ArticlesListApiArg = {
  /** Search for all documents related to a specific event using its Launch Library 2 ID. */
  event?: number[];
  /** Get all documents that have a related event. */
  hasEvent?: boolean;
  /** Get all documents that have a related launch. */
  hasLaunch?: boolean;
  /** Get all documents that are featured. */
  isFeatured?: boolean;
  /** Search for all documents related to a specific launch using its Launch Library 2 ID. */
  launch?: string[];
  /** Number of results to return per page. */
  limit?: number;
  /** Search for documents with a news_site__name present in a list of comma-separated values. Case insensitive. */
  newsSite?: string;
  /** Search for documents with a news_site__name not present in a list of comma-separated values. Case insensitive. */
  newsSiteExclude?: string;
  /** The initial index from which to return the results. */
  offset?: number;
  /** Order the result on `published_at, -published_at, updated_at, -updated_at`.
    
    * `published_at` - Published at
    * `-published_at` - Published at (descending)
    * `updated_at` - Updated at
    * `-updated_at` - Updated at (descending) */
  ordering?: (
    | '-published_at'
    | '-updated_at'
    | 'published_at'
    | 'updated_at'
  )[];
  /** Get all documents published after a given ISO8601 timestamp (excluded). */
  publishedAtGt?: string;
  /** Get all documents published after a given ISO8601 timestamp (included). */
  publishedAtGte?: string;
  /** Get all documents published before a given ISO8601 timestamp (excluded). */
  publishedAtLt?: string;
  /** Get all documents published before a given ISO8601 timestamp (included). */
  publishedAtLte?: string;
  /** Search for documents with a specific phrase in the title or summary. */
  search?: string;
  /** Search for all documents with a specific phrase in the summary. */
  summaryContains?: string;
  /** Search for documents with a summary containing all keywords from comma-separated values. */
  summaryContainsAll?: string;
  /** Search for documents with a summary containing at least one keyword from comma-separated values. */
  summaryContainsOne?: string;
  /** Search for all documents with a specific phrase in the title. */
  titleContains?: string;
  /** Search for documents with a title containing all keywords from comma-separated values. */
  titleContainsAll?: string;
  /** Search for documents with a title containing at least one keyword from comma-separated values. */
  titleContainsOne?: string;
  /** Get all documents updated after a given ISO8601 timestamp (excluded). */
  updatedAtGt?: string;
  /** Get all documents updated after a given ISO8601 timestamp (included). */
  updatedAtGte?: string;
  /** Get all documents updated before a given ISO8601 timestamp (excluded). */
  updatedAtLt?: string;
  /** Get all documents updated before a given ISO8601 timestamp (included). */
  updatedAtLte?: string;
};
export type ArticlesRetrieveApiResponse = /** status 200  */ ArticleRead;
export type ArticlesRetrieveApiArg = {
  /** A unique integer value identifying this article. */
  id: number;
};
export type BlogsListApiResponse = /** status 200  */ PaginatedBlogListRead;
export type BlogsListApiArg = {
  /** Search for all documents related to a specific event using its Launch Library 2 ID. */
  event?: number[];
  /** Get all documents that have a related event. */
  hasEvent?: boolean;
  /** Get all documents that have a related launch. */
  hasLaunch?: boolean;
  /** Get all documents that are featured. */
  isFeatured?: boolean;
  /** Search for all documents related to a specific launch using its Launch Library 2 ID. */
  launch?: string[];
  /** Number of results to return per page. */
  limit?: number;
  /** Search for documents with a news_site__name present in a list of comma-separated values. Case insensitive. */
  newsSite?: string;
  /** Search for documents with a news_site__name not present in a list of comma-separated values. Case insensitive. */
  newsSiteExclude?: string;
  /** The initial index from which to return the results. */
  offset?: number;
  /** Order the result on `published_at, -published_at, updated_at, -updated_at`.
    
    * `published_at` - Published at
    * `-published_at` - Published at (descending)
    * `updated_at` - Updated at
    * `-updated_at` - Updated at (descending) */
  ordering?: (
    | '-published_at'
    | '-updated_at'
    | 'published_at'
    | 'updated_at'
  )[];
  /** Get all documents published after a given ISO8601 timestamp (excluded). */
  publishedAtGt?: string;
  /** Get all documents published after a given ISO8601 timestamp (included). */
  publishedAtGte?: string;
  /** Get all documents published before a given ISO8601 timestamp (excluded). */
  publishedAtLt?: string;
  /** Get all documents published before a given ISO8601 timestamp (included). */
  publishedAtLte?: string;
  /** Search for documents with a specific phrase in the title or summary. */
  search?: string;
  /** Search for all documents with a specific phrase in the summary. */
  summaryContains?: string;
  /** Search for documents with a summary containing all keywords from comma-separated values. */
  summaryContainsAll?: string;
  /** Search for documents with a summary containing at least one keyword from comma-separated values. */
  summaryContainsOne?: string;
  /** Search for all documents with a specific phrase in the title. */
  titleContains?: string;
  /** Search for documents with a title containing all keywords from comma-separated values. */
  titleContainsAll?: string;
  /** Search for documents with a title containing at least one keyword from comma-separated values. */
  titleContainsOne?: string;
  /** Get all documents updated after a given ISO8601 timestamp (excluded). */
  updatedAtGt?: string;
  /** Get all documents updated after a given ISO8601 timestamp (included). */
  updatedAtGte?: string;
  /** Get all documents updated before a given ISO8601 timestamp (excluded). */
  updatedAtLt?: string;
  /** Get all documents updated before a given ISO8601 timestamp (included). */
  updatedAtLte?: string;
};
export type BlogsRetrieveApiResponse = /** status 200  */ BlogRead;
export type BlogsRetrieveApiArg = {
  /** A unique integer value identifying this blog. */
  id: number;
};
export type InfoRetrieveApiResponse = /** status 200  */ Info;
export type InfoRetrieveApiArg = void;
export type ReportsListApiResponse = /** status 200  */ PaginatedReportListRead;
export type ReportsListApiArg = {
  /** Number of results to return per page. */
  limit?: number;
  /** Search for documents with a news_site__name present in a list of comma-separated values. Case insensitive. */
  newsSite?: string;
  /** Search for documents with a news_site__name not present in a list of comma-separated values. Case insensitive. */
  newsSiteExclude?: string;
  /** The initial index from which to return the results. */
  offset?: number;
  /** Order the result on `published_at, -published_at, updated_at, -updated_at`.
    
    * `published_at` - Published at
    * `-published_at` - Published at (descending)
    * `updated_at` - Updated at
    * `-updated_at` - Updated at (descending) */
  ordering?: (
    | '-published_at'
    | '-updated_at'
    | 'published_at'
    | 'updated_at'
  )[];
  /** Get all documents published after a given ISO8601 timestamp (excluded). */
  publishedAtGt?: string;
  /** Get all documents published after a given ISO8601 timestamp (included). */
  publishedAtGte?: string;
  /** Get all documents published before a given ISO8601 timestamp (excluded). */
  publishedAtLt?: string;
  /** Get all documents published before a given ISO8601 timestamp (included). */
  publishedAtLte?: string;
  /** Search for documents with a specific phrase in the title or summary. */
  search?: string;
  /** Search for all documents with a specific phrase in the summary. */
  summaryContains?: string;
  /** Search for documents with a summary containing all keywords from comma-separated values. */
  summaryContainsAll?: string;
  /** Search for documents with a summary containing at least one keyword from comma-separated values. */
  summaryContainsOne?: string;
  /** Search for all documents with a specific phrase in the title. */
  titleContains?: string;
  /** Search for documents with a title containing all keywords from comma-separated values. */
  titleContainsAll?: string;
  /** Search for documents with a title containing at least one keyword from comma-separated values. */
  titleContainsOne?: string;
  /** Get all documents updated after a given ISO8601 timestamp (excluded). */
  updatedAtGt?: string;
  /** Get all documents updated after a given ISO8601 timestamp (included). */
  updatedAtGte?: string;
  /** Get all documents updated before a given ISO8601 timestamp (excluded). */
  updatedAtLt?: string;
  /** Get all documents updated before a given ISO8601 timestamp (included). */
  updatedAtLte?: string;
};
export type ReportsRetrieveApiResponse = /** status 200  */ ReportRead;
export type ReportsRetrieveApiArg = {
  /** A unique integer value identifying this report. */
  id: number;
};
export type Socials = {
  x?: string;
  youtube?: string;
  instagram?: string;
  linkedin?: string;
  mastodon?: string;
  bluesky?: string;
};
export type Author = {
  name: string;
  socials?: Socials;
};
export type Launch = {
  launch_id: string;
};
export type LaunchRead = {
  launch_id: string;
  provider: string;
};
export type Event = {
  event_id: number;
};
export type EventRead = {
  event_id: number;
  provider: string;
};
export type Article = {
  title: string;
  authors: Author[];
  url: string;
  image_url: string;
  summary: string;
  published_at: string;
  featured?: boolean;
  launches: Launch[];
  events: Event[];
};
export type ArticleRead = {
  id: number;
  title: string;
  authors: Author[];
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured?: boolean;
  launches: LaunchRead[];
  events: EventRead[];
};
export type PaginatedArticleList = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Article[];
};
export type PaginatedArticleListRead = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: ArticleRead[];
};
export type Blog = {
  title: string;
  authors: Author[];
  url: string;
  image_url: string;
  summary: string;
  published_at: string;
  featured?: boolean;
  launches: Launch[];
  events: Event[];
};
export type BlogRead = {
  id: number;
  title: string;
  authors: Author[];
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured?: boolean;
  launches: LaunchRead[];
  events: EventRead[];
};
export type PaginatedBlogList = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Blog[];
};
export type PaginatedBlogListRead = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: BlogRead[];
};
export type Info = {
  version: string;
  news_sites: string[];
};
export type Report = {
  title: string;
  authors: Author[];
  url: string;
  image_url: string;
  summary?: string;
  published_at: string;
};
export type ReportRead = {
  id: number;
  title: string;
  authors: Author[];
  url: string;
  image_url: string;
  news_site: string;
  summary?: string;
  published_at: string;
  updated_at: string;
};
export type PaginatedReportList = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Report[];
};
export type PaginatedReportListRead = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: ReportRead[];
};
export const {
  useArticlesListQuery,
  useArticlesRetrieveQuery,
  useBlogsListQuery,
  useBlogsRetrieveQuery,
  useInfoRetrieveQuery,
  useReportsListQuery,
  useReportsRetrieveQuery,
} = injectedRtkApi;
