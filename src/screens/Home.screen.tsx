import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useGetApodQuery } from '../api/nasaApi';
import { useGetNewsPreviewQuery } from '../api/newsPreviewApi';
import { HomeScreenHeader } from '../components/HomeScreenHeader';
import { OfflineBanner } from '../components/OfflineBanner';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../constants/theme';
import { PictureDayPreview } from '../components/PictureDayPreview';
import { NewsPreview } from '../components/NewsPreview';

export const HomeScreen: React.FC = () => {
  // NOTE: хук apod запроса. Пинаю запрос, получаю метаданные

  const { isError: isErrorApod } = useGetApodQuery();
  const { isError: isErrorNews } = useGetNewsPreviewQuery();
  const isErrorQuery = isErrorApod || isErrorNews;

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {isErrorQuery && <OfflineBanner />}
        <HomeScreenHeader />

        <PictureDayPreview />
        <NewsPreview />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.UI_COLOR_CONFIG.screenBackground,
  },
  contentContainer: {
    gap: 8,
    paddingHorizontal: theme.spacing.m,
    paddingBottom: theme.spacing.l,
  },

  description: {
    color: '#CBD5E1',
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    alignItems: 'flex-end',
    paddingVertical: 12,
  },
});

// TODO: реализовать
// refetchOnFocus - повторный запрос после скрытия и открытия приложения
// refetchOnReconnect - повторный запрос после потери и восстановления сети
// refetch - реализация "Pull to Refresh"

//TODO: Поскольку приложение работает с разными серверами, сообщение об ошибке сети должны быть понятно связано с конкретным сервером. Потому что один сервер может работать штатно, а другой -нет
