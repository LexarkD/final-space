// NOTE: APOD находится в процессе переезда на новый API. Ручные тесты показали, что поля ответов при разных media_type не всегда соответствуют документации
// Поэтому логика обработки ответа строится не на контракте, а на реально пришедших данных

export type ApodResponse = {
  //NOTE: формат даты  "YYYY-MM-DD"
  date: string;
  post_id: number;
  title: string;
  permalink: string;
  media_type: string;
  // NOTE: после миграции APOD на новый API, explanation стал приходить с HTML-разметкой и припиской вконце
  explanation: string;
  credit: string;
  alt: string;
  //NOTE: ссылка на СТАТЬЮ
  url: string;
  //NOTE: ссылка на картинку
  hdurl: string;
  basic_html: string;
  basic_html_url: string;
};

// NOTE: Доменная модель - то что нужно для UI
export type Apod = {
  date: string;
  title: string;
  explanation: string;
  credit: string;
  alt: string | null;
  media_type: 'image' | 'video' | 'other';
  imageUrl: string | null;
  permalink: string;
};
