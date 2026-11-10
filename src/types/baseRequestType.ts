// NOTE: Форма ошибки повторяет fetchBaseQuery, чтобы потом их было удобно сравнивать
export type RequestError =
  // NOTE: причины FETCH_ERROR (запрос не дошёл или ответ не вернулся)
  // нет интернета (авиарежим, выключенный Wi-Fi);
  // опечатка в домене, и DNS не нашёл сервер;
  // сервер отказал в соединении;
  // проблема с SSL-сертификатом;
  // на iOS запрос по http:// без s заблокирован политикой безопасности (ATS);
  // связь оборвалась посреди скачивания ответа.
  // таймаут нативного слоя сработал раньше, чем наш таймаут
  | { status: 'FETCH_ERROR'; error: string }
  // NOTE: причины TIMEOUT_ERROR (Возникает, когда сработал наш таймер - ответ не пришёл вовремя)
  // медленная сеть или ответ большой для такой скорости;
  // сервер завис и молчит;
  // Сервер уже мог получить запрос, но мы не успели получить ответ. Для GET-запросов это не страшно, в отличии от запросов, которые что-то меняют.
  | { status: 'TIMEOUT_ERROR'; error: string } // ответ не пришёл вовремя
  | { status: number; data: unknown } // сервер ответил, но статус не 2xx
  | {
      status: 'PARSING_ERROR'; // ответ пришёл, но это не JSON
      originalStatus: number;
      data: string; // сырой текст сохраняем, чтобы было что показать в логах
      error: string;
    };

// NOTE: Ровно одно из полей есть всегда. Проверка `if (result.error)` сужает тип
export type RequestResult<T> =
  | { data: T; error?: undefined }
  | { data?: undefined; error: RequestError };

export type Params = Record<string, string | number | boolean | undefined>;

export type RequestArgs = {
  url: string;
  params?: Params;
  timeoutMs?: number;
};
