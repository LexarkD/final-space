import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../components/AppText';
import { theme } from '../constants/theme';

const APOD_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic-xxx';

export const FetchLabScreen: React.FC = () => {
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    const loadApod = async () => {
      const response = await fetch(APOD_URL);
      console.log('status:', response.status, 'ok:', response.ok);

      const json = await response.json();
      console.log('json:', json);
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

//Ошибка нет сети упадет на const response = await fetch(APOD_URL). Промис будет отклонен
//Ошибка неверный url дойдет до setTitle(json[0].title); -> Cannot read property 'title' of undefined. Потому что промис не будет отклонен и вернет объект с информацией об ошибке, а у объекта с ошибкой нет свойства title
//сервер ответил 200, но тело не JSON. status: 200, а ok будет true, но запрос упадёт уже на response.json()
