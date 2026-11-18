import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../components/AppText';
import { theme } from '../constants/theme';

//Задача - У запроса в каждый момент есть состояние: идёт загрузка, пришла ошибка или пришли данные. Экран должен показывать каждое из них.

type FetchLabError =
  | { kind: 'network'; message: string }
  | { kind: 'http'; status: number; body: unknown }
  | { kind: 'parse'; status: number; message: string };

// NOTE: Cсылки для ручных тестов
// const APOD_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic?per_page=1'; // Рабочий url
// const APOD_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic-xxx'; // Ошибка в url, тело ошибки JSON
// const APOD_URL = 'https://science.nasa.gov/'; //это обычная HTML-страница со статусом 200.
const APOD_URL = 'https://science.nasa.gov/nonexistent-page-xxx'; // Ошибка в url, тело ошибки HTML-страница

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
  const [title, setTitle] = useState<string | null>(null);
  //NOTE: Запрос начинается с загрузки (isLoading = true)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FetchLabError | null>(null);

  useEffect(() => {
    const loadApod = async () => {
      let response: Response;
      try {
        response = await fetch(APOD_URL);
      } catch (e) {
        setError({ kind: 'network', message: String(e) });
        //NOTE: Тут и далее, после того, как я получил ошибку, нужно убрать ActivityIndicator (setIsLoading(false))
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        let body: unknown = null;
        try {
          body = await response.json();
        } catch {
          //Уточняющий комментарий catch {} ничего не возвращает, поэтому body остается = null;
        }
        setError({ kind: 'http', status: response.status, body });
        setIsLoading(false);
        return;
        //BAGFIX: в прошлой итерациии я забыл установить return для try/catch. А также забыл стереть дублирующее решение через .const body = await response.json().catch(() => null);
      }

      let json: any; // NOTE: any временно
      try {
        json = await response.json();
      } catch (e) {
        setError({
          kind: 'parse',
          status: response.status,
          message: String(e),
        });
        setIsLoading(false);
        return;
      }

      // NOTE: намеренно вне try — баг в моем коде не должен маскироваться под сетевую ошибку. Баг в коде будет отлавливаться на другом уровне
      setTitle(json[0].title);
      // Тут есть намеренно необработанная точка выхода. Если сервер ответит 200 с пустым массивом [], то обращение к .title бросит TypeError и код не дойдет до setIsLoading(false)- я получаю вечный спинер
      setIsLoading(false);
    };

    loadApod();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator color={theme.UI_COLOR_CONFIG.icon} />;
    }
    if (error) {
      return (
        <>
          <AppText variant="body">{getErrorMessage(error)}</AppText>
          {/* детали для разработчика */}
          <AppText variant="caption">{JSON.stringify(error)}</AppText>
        </>
      );
    }
    return <AppText variant="h1">{title}</AppText>;
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
// Самое прямолинейное решение — завести по useState на каждую часть состояния запроса : флаг загрузки, ошибку и данные.
// Три независимых значения (есть / нет) дают 8 комбинаций, из которых часть не имеет смысла вообще.
// TypeScript не знает, как связаны три значения: в ветке успеха title по-прежнему string | null.
// Так же необходимо вручную переключать части состояния, для корректной отрисовки статуса - к примеру setIsLoading(false) вручную прописано 4 раза, для того чтобы индикатор загрузки пропал и позволил отоборазиться -результату.
// Пятая, неявная точка выхода — исключение в setTitle(json[0].title): там setIsLoading(false) не выполнится, и спиннер будет вечным.
// Ручное управление порождает ошибки и вероятность возникновения бессмысленных комбинаций флагов.
// Сложные комбинации состояний пораждают неочевидную логику в коде. К примеру, при isLoading = true и заданном error, показан будет индикатор загрузки. Это неочевидный эффект порядка проверок (if) внутри renderContent()
