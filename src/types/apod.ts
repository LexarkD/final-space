// NOTE: API Контракт для APOD
// NOTE: Общие поля - приходят всегда.
export type BaseAPOD = {
  date: string;
  explanation: string;
  title: string;
};

// NOTE: поля приходят, если ответ содержит ссылку на картинку
export type ImageAPOD = {
  media_type: 'image';
  // NOTE: ссылка на картинку
  url: string;
  // NOTE: ссылка на картинку в высоком разрешении. Поле может отсутствовать.
  hdurl?: string;
} & BaseAPOD;

// NOTE: поля приходят, если ответ содержит ссылку на видео
export type VideoAPOD = {
  media_type: 'video';
  // NOTE: ссылка на видеоплеер
  url: string;
  // NOTE: превью видео! Поле может отсутствовать.
  thumbnail_url?: string;
} & BaseAPOD;

// NOTE: итоговый тип с двумя случаями
export type APODResponse = ImageAPOD | VideoAPOD;

// TODO: Следующий контракт нужно сгенерировать автоматически с помощью документации open api nasa(swagger или др.)
