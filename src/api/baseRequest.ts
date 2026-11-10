// src/api/baseRequest.ts (песочница)

import type {
  //   RequestError,
  RequestResult,
  Params,
  RequestArgs,
} from '../types/baseRequestType';

// Шаг 1а: склейка без двойных и потерянных слэшей
const joinUrl = (base: string, path: string): string =>
  `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;

// Шаг 1б: undefined выкидываем, ключи и значения кодируем
// NOTE: Пишу вручную через encodeURIComponent, а не через URLSearchParams,
// чтобы увидеть, что именно он делает, и не зависеть от его реализации в RN
const buildQuery = (params?: Params): string => {
  if (!params) {
    return '';
  }
  const pairs = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    );
  return pairs.length ? `?${pairs.join('&')}` : '';
};

const toMessage = (e: unknown): string =>
  e instanceof Error ? e.message : String(e);

// NOTE: Фабрика повторяет идею fetchBaseQuery({ baseUrl }): baseUrl задаём один раз
export const createBaseRequest =
  (baseUrl: string, defaultTimeoutMs = 10_000) =>
  async <T>({
    url,
    params,
    timeoutMs = defaultTimeoutMs,
  }: RequestArgs): Promise<RequestResult<T>> => {
    const fullUrl = joinUrl(baseUrl, url) + buildQuery(params);

    // Шаг 2: таймаут через AbortController
    const controller = new AbortController();
    // NOTE: Флаг нужен, потому что ошибка отмены не говорит, КТО отменил запрос.
    // Причину знает только тот, кто вызвал abort()
    let isTimedOut = false;
    const timerId = setTimeout(() => {
      isTimedOut = true;
      controller.abort();
    }, timeoutMs);

    // Шаги 3–4: запрос и чтение тела. Тело читаем ОДИН раз и как текст
    let response: Response;
    let text: string;
    try {
      response = await fetch(fullUrl, { signal: controller.signal });
      text = await response.text();
    } catch (e) {
      return isTimedOut
        ? {
            error: {
              status: 'TIMEOUT_ERROR',
              error: `Нет ответа за ${timeoutMs} мс`,
            },
          }
        : { error: { status: 'FETCH_ERROR', error: toMessage(e) } };
    } finally {
      // NOTE: finally гарантирует, что таймер не сработает после завершения запроса
      clearTimeout(timerId);
    }

    // Шаг 5: парсинг отдельно от чтения. Если упадёт, text у нас остался
    let body: unknown;
    try {
      body = text.length ? JSON.parse(text) : null; // пустое тело (204) — не ошибка
    } catch (e) {
      return {
        error: {
          status: 'PARSING_ERROR',
          originalStatus: response.status,
          data: text,
          error: toMessage(e),
        },
      };
    }

    // Шаг 6: HTTP-ошибка. Тело сохраняем: сервер часто объясняет в нём причину
    if (!response.ok) {
      return { error: { status: response.status, data: body } };
    }

    // Шаг 7: успех
    // NOTE: `as T` — это обещание, а не проверка. Сервер может прислать что угодно.
    // Проверка формы данных в рантайме — тема zod из Фазы 3
    return { data: body as T };
  };
