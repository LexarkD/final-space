import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../components/AppText';
import { theme } from '../constants/theme';

// const APOD_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic?per_page=1';
// const APOD_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic-xxx';
const APOD_URL = 'https://science.nasa.gov/'; //это обычная HTML-страница со статусом 200.

export const FetchLabScreen: React.FC = () => {
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    const loadApod = async () => {
      try {
        const response = await fetch(APOD_URL); // сбой сети, бросит здесь

        if (!response.ok) {
          // fetch не проверит это за меня. Для fetch, если есть ответ, уже хорошо - промис fulfilled.
          //  теперь ошибка "status: 404 ok: false" ловится сразу, а не доходит до setTitle(json[0].title);
          throw new Error(`HTTP ${response.status}`);
        }
        const json = await response.json(); // Если пришел не JSON, бросит тут

        setTitle(json[0].title);
      } catch (error) {
        // error имеет тип unknown: в catch может прилететь что угодно
        console.log('Ошибка загрузки:', error);
      }
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

// Недостатки:
// один catch ловит все сбои, они выглядят похоже. Хотя разные ошибки требуют разной реакции
// тут не используется полезное тело ответа(например {code: 'rest_no_route})
// экран ничего не знает об ошибках и реакция на люблую ошибку одна - 'Загрузка...'

// Эксперименты
// три случая:

// Выключенный Wi-Fi. сеть — TypeError, бросает полифил fetch;
// => Ошибка загрузки: TypeError: Network request failed
// at anonymous (fetch.umd.js:567:31)

// Путь apod-basic-xxx при включённой сети. HTTP-статус — Error, бросаем мы сами;
// => Ошибка загрузки: Error: HTTP 404
// at anonymous (FetchLab.screen.tsx:21:26)
// at next (native)

// Ответ не в формате JSON. разбор — SyntaxError, бросает JSON.parse. Символ < — это начало <!DOCTYPE html>, классический признак того, что вместо JSON пришёл HTML.
// => Ошибка загрузки: SyntaxError: JSON Parse error: Unexpected character: <
// at parse (native)
// at tryCallOne (address at InternalBytecode.js:1:1296)
// at anonymous (address at InternalBytecode.js:1:4984)
