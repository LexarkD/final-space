import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../components/AppText';
import { theme } from '../constants/theme';

//Задача - одно состояние запроса вместо трех частей из независимых useState
//NOTE: Это размеченное объединение отображает три варианта состояния запроса.
// ДАННЫЙ RequestState КОРРЕКТЕН С УЧЕТОМ ТОГО, ЧТО ЭТО ПЕРВЫЙ ЗАПРОС! Т.е. пока что не рассматривается вариант, когда одновременно существуют старые данные и новая загрузка/новая ошибка.
type RequestState =
  | { status: 'loading' }
  | { status: 'error'; error: FetchLabError }
  | { status: 'success'; title: string };

type FetchLabError =
  | { kind: 'network'; message: string }
  | { kind: 'http'; status: number; body: unknown }
  | { kind: 'parse'; status: number; message: string };

// NOTE: Ссылки для ручных тестов
const APOD_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic?per_page=1'; // Рабочий url
// const APOD_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic-xxx'; // Ошибка в url, тело ошибки JSON
// const APOD_URL = 'https://science.nasa.gov/'; //это обычная HTML-страница со статусом 200.
// const APOD_URL = 'https://science.nasa.gov/nonexistent-page-xxx'; // Ошибка в url, тело ошибки HTML-страница

// Сообщение для пользователя. Технические детали ему не нужны
const getErrorMessage = (error: FetchLabError): string => {
  switch (error.kind) {
    case 'network':
      return 'Нет связи с сервером. Проверьте подключение к интернету';
    case 'http':
      //NOTE: TS знает, что здесь у error есть status — сужение по kind: 'http'
      return error.status >= 500
        ? 'Сервер временно недоступен'
        : `Не удалось получить данные (ошибка ${error.status})`;
    case 'parse':
      return 'Сервер вернул данные в неожиданном формате';
  }
};

export const FetchLabScreen: React.FC = () => {
  // NOTE: Запрос начинается с загрузки
  const [state, setState] = useState<RequestState>({ status: 'loading' });

  useEffect(() => {
    const loadApod = async () => {
      let response: Response;
      try {
        response = await fetch(APOD_URL);
      } catch (e) {
        setState({
          status: 'error',
          error: { kind: 'network', message: String(e) },
        });
        return;
      }

      if (!response.ok) {
        let body: unknown = null;
        try {
          body = await response.json();
        } catch {
          // catch {} ничего не возвращает, поэтому body остается = null;
        }
        setState({
          status: 'error',
          error: { kind: 'http', status: response.status, body },
        });
        return;
      }

      let json: any; // NOTE: any временно
      try {
        json = await response.json();
      } catch (e) {
        setState({
          status: 'error',
          error: { kind: 'parse', status: response.status, message: String(e) },
        });
        return;
      }
      // NOTE: Пятая точка выхода: вечный спиннер - проблема остается нерешенной
      // Если json[0].title бросит ошибку, setState не выполнится, state останется { status: 'loading' }
      setState({ status: 'success', title: json[0].title });
    };

    loadApod();
  }, []);

  const renderContent = (): React.ReactElement => {
    switch (state.status) {
      case 'loading':
        return <ActivityIndicator color={theme.UI_COLOR_CONFIG.icon} />;
      case 'error':
        return (
          <>
            <AppText variant="body">{getErrorMessage(state.error)}</AppText>
            {/* детали для разработчика */}
            <AppText variant="caption">{JSON.stringify(state.error)}</AppText>
          </>
        );
      case 'success':
        return <AppText variant="h1">{state.title}</AppText>;
    }
  };

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.screen}>
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: theme.spacing.m,
    padding: theme.spacing.m,
    backgroundColor: theme.UI_COLOR_CONFIG.screenBackground,
  },
});

// Решение проблем:
// Точки выхода изменились: вместо пары setError(...) + setIsLoading(false) теперь один setState(...).
// Переход в новое состояние автоматически означает выход из старого, поэтому «забыть выключить загрузку» больше нельзя: отдельного флага загрузки просто нет.
// 8 комбинаций, часть из них бессмысленны => решено: тип допускает только 3 комбинации
// title в ветке успеха string | null => решено: в 'success' он string
// Неочевидный порядок if в renderContent => решено: switch перебирает варианты, а не приоритеты.

// Эксперименты - проверяю сообщения для пользователя
// 4 случая:

// 1. Выключенный Wi-Fi.
// => 'Нет связи с сервером. Проверьте подключение к интернету'
// {kind: 'network', message: 'TypeError: Network request failed'}

// 2. APOD_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic-xxx'. Ошибка в url
// => `Не удалось получить данные (ошибка 404)`
// {kind: 'http', status: 404, body: {…}}
// body: {code: 'rest_no_route', message: 'No route was found matching the URL and request method.', ...

// 3. APOD_URL = 'https://science.nasa.gov/'. Ответ не в формате JSON.
// => 'Сервер вернул данные в неожиданном формате'
// {kind: 'parse', status: 200, message: 'SyntaxError: JSON Parse error: Unexpected character: <'}

// 4. APOD_URL = 'https://science.nasa.gov/nonexistent-page-xxx'. HTML-страница со статусом 404
// => `Не удалось получить данные (ошибка 404)`
// {kind: 'http', status: 404, body: null}

// Результат тестов 2 и 4 выводит пользователю одинаковый ответ - это не баг. Для пользователя это одна и та же ошибка. Разница в body, нужна только разработчику

// Недостатки:
// Данная реализация состояний (RequestState) актуальна только при ПЕРВОМ запросе - не учитывает, что возможны старые данные.
// Пятая точка выхода: вечный спиннер - проблема остается нерешенной. Если json[0].title бросит ошибку, setState не выполнится, state останется { status: 'loading' }
// json[0].title имеет тип any, поэтому строка title: json[0].title проходит проверку типов, даже если там окажется число или undefined.
