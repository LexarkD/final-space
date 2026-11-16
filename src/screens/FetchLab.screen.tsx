import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../components/AppText';
import { theme } from '../constants/theme';

//Задача - различить ошибки по месту появления. Увидеть ошибки в консоли

//union тип нужен, что б кпримеру, проверив error.kind === 'http', TypeScript сам понимал, что у ошибки есть status и body.
type FetchLabError =
  | { kind: 'network'; message: string }
  | { kind: 'http'; status: number; body: unknown }
  | { kind: 'parse'; status: number; message: string };

//Вывод пойманой ошибки
const logError = (error: FetchLabError) => {
  console.log('Ошибка загрузки:', error);
};

// NOTE: Cсылки для ручных тестов
// const APOD_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic?per_page=1'; // Рабочий url
// const APOD_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic-xxx'; // Ошибка в url, тело ошибки JSON
// const APOD_URL = 'https://science.nasa.gov/'; //это обычная HTML-страница со статусом 200.
const APOD_URL = 'https://science.nasa.gov/nonexistent-page-xxx'; // Ошибка в url, тело ошибки HTML-страница

export const FetchLabScreen: React.FC = () => {
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    const loadApod = async () => {
      let response: Response;
      // место - Запрос: ответа может не быть совсем
      try {
        response = await fetch(APOD_URL);
      } catch (e) {
        logError({ kind: 'network', message: String(e) });
        return;
      }

      // место - Статус ответа: сервер ответил, но с ошибкой
      if (!response.ok) {
        let body: unknown = null;
        try {
          // Пытаюсь прочитать тело ошибки: там может быть JSON, HTML или пусто
          body = await response.json();
        } catch {}
        // fetch не считает 404 и 500 ошибками, поэтому статус проверяю сам и помечаю такую ошибку как 'http'.
        // В этой ветке я пытаюсь прочитать тело ради подробностей, но оно может оказаться не JSON, и тогда response.json() бросит SyntaxError. Чтение тела здесь «по возможности», его неудача не должна заменить главный факт, плохой статус.
        // Поэтому catch{} превращает отклонение в значение null, и выполнение доходит до logError({ kind: 'http', ... }).
        logError({ kind: 'http', status: response.status, body });
      }

      if (!response.ok) {
        const body = await response.json().catch(() => null);

        logError({ kind: 'http', status: response.status, body });
        return;
      }

      // место - Разбор ответа: статус хороший, но тело может оказаться не JSON
      let json: any; // NOTE: any временно
      try {
        json = await response.json();
      } catch (e) {
        logError({
          kind: 'parse',
          status: response.status,
          message: String(e),
        });
        return;
      }

      // NOTE: намеренно вне try — баг в моем коде не должен маскироваться под сетевую ошибку. Баг в коде будет отлавливаться на другом уровне
      setTitle(json[0].title);
    };

    loadApod();
  }, []);

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.screen}>
      <AppText variant="body">{title ?? 'Загрузка...'}</AppText>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: theme.spacing.m,
    backgroundColor: theme.UI_COLOR_CONFIG.screenBackground,
  },
});

// Отличия fetch vs fetchBaseQuery.
// fetchBaseQuery проверяет те же три места сбоя, но в другом порядке (сначала разбор ответа, потом статус ответа), поэтому нераспознанное тело ошибки он сохраняет как текст, а не теряет.
// Ошибку он возвращает как значение { error }, а не бросает, и её форма размечена полем status вместо kind.

// Эксперименты
// 4 случая:

// 1. Выключенный Wi-Fi.
// => Ошибка загрузки: {kind: 'network', message: 'TypeError: Network request failed'}

// 2. APOD_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic-xxx'. Ошибка в url
// => Ошибка загрузки: {kind: 'http', status: 404, body: {…}}
// body: {code: 'rest_no_route', message: 'No route was found matching the URL and request method.', data: {…}}code: "rest_no_route"data: {status: 404}status: 404[[Prototype]]: Objectmessage: "No route was found matching the URL and request method."[[Prototype]]: Objectkind: "http"status: 404[[Prototype]]: Object

// 3. POD_URL = 'https://science.nasa.gov/'. Ответ не в формате JSON.
// => Ошибка загрузки: {kind: 'parse', status: 200, message: 'SyntaxError: JSON Parse error: Unexpected character: <'}

// 4. APOD_URL = 'https://science.nasa.gov/nonexistent-page-xxx'. HTML-страница со статусом 404
// => Ошибка загрузки: {kind: 'http', status: 404, body: null}
// body: nullkind: "http"status: 404[[Prototype]]: Objectconstructor: ƒ Object()hasOwnProperty: ƒ hasOwnProperty()isPrototypeOf: ƒ isPrototypeOf()propertyIsEnumerable: ƒ propertyIsEnumerable()toLocaleString: ƒ toLocaleString()toString: ƒ toString()valueOf: ƒ valueOf()__defineGetter__: ƒ __defineGetter__()__defineSetter__: ƒ __defineSetter__()__lookupGetter__: ƒ __lookupGetter__()__lookupSetter__: ƒ __lookupSetter__()__proto__: (...)get __proto__: ƒ __proto__()set __proto__: ƒ __proto__()
// 4 БЕЗ catch {}; Теряю статус ошибки. Получаю SyntaxError
// Error: Uncaught (in promise, id: 0): "SyntaxError: JSON Parse error: Unexpected character: <"

// Недостатки:
// Проблема - экран не знает о состоянии запроса и на люблую ошибку показывает только "Загрузка...".
