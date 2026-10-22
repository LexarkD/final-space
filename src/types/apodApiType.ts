export type ApodResponse = {
  //NOTE: формат даты  "YYYY-MM-DD"
  date: string;
  post_id: number;
  title: string;
  permalink: string;
  //NOTE: APOD находится в процессе переезда на новый API и задокументированные media_type: 'image' | 'video' | 'iframe' не соотвествуют реальным результатам тестов.
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
  media_type: 'image' | 'video' | 'iframe' | 'other';
  imageUrl: string | null;
  permalink: string;
};
