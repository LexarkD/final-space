import type { Apod, ApodResponse } from '../types/apodApiType';

// NOTE: оф.документ "APOD Feed And API User Guide" предупреждает, что эндпоинт ещё меняется

// NOTE: при переходе на новый API, explanation стал приходить с HTML-разметкой и припиской вконце
const ENTITIES: Record<string, string> = {
  '&#039;': "'",
  '&quot;': '"',
  '&#8211;': '–',
  '&lt;': '<',
  '&gt;': '>',
};

// NOTE: cutEditorialNotes отрезает приписки вконце explanation (они отделены "<br><br>")
const cutEditorialNotes = (html: string): string =>
  html.split(/<br\s*\/?>\s*<br\s*\/?>/i)[0];

// NOTE: Декодирую HTML для получения текста
export const htmlToPlainText = (html: string): string =>
  html
    .replace(/<br\s*\/?>/gi, '\n') // Заменяю <br> на \n
    .replace(/<[^>]+>/g, '') // Удаляю теги
    .replace(/&#039;|&quot;|&#8211;|&lt;|&gt;/g, m => ENTITIES[m]) // Декодирую HTML
    .replace(/&amp;/g, '&') // &amp декодирую последним
    .replace(/^(\s*Explanation\s*:\s*)+/i, '') // Удаляю префиксc Explanation
    .trim(); // Убираю оставшиеся ненужные пробелы и переносы по краям строки.

// NOTE: assets.science.nasa.gov отдаёт уменьшенную копию изображения по параметру w (проверено вручную).
const APOD_IMAGE_WIDTH = 1080;

const toResizedImageUrl = (hdurl: string): string | null => {
  if (!hdurl) {
    return null;
  }
  const baseUrl = hdurl.split('?')[0];
  return `${baseUrl}?w=${APOD_IMAGE_WIDTH}&fit=clip`;
};

//NOTE: APOD находится в процессе переезда на новый API и задокументированные media_type: 'image' | 'video' | 'iframe' не соотвествуют реальным результатам тестов.
const toMediaType = (value: string): Apod['media_type'] => {
  if (value === 'image' || value === 'video' || value === 'iframe') {
    return value;
  }
  return 'other';
};

export const toApod = (raw: ApodResponse): Apod => ({
  date: raw.date,
  title: raw.title,
  explanation: htmlToPlainText(cutEditorialNotes(raw.explanation)),
  credit: raw.credit,
  alt: raw.alt,
  media_type: toMediaType(raw.media_type),
  imageUrl: toResizedImageUrl(raw.hdurl),
  permalink: raw.permalink,
});
