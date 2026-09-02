import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { PictureDay } from '../components/PictureDay';
import { useGetApodQuery } from '../api/nasaApi';
import { NavigateLink } from '../components/NavigateLink';
import { OfflineBanner } from '../components/OfflineBanner';

// TODO: реализовать
// refetchOnFocus - повторный запрос после скрытия и открытия приложения
// refetchOnReconnect - повторный запрос после потери и восстановления сети
// refetch - реализация "Pull to Refresh"

export const HomeScreen: React.FC = () => {
  // NOTE: хук apod запроса. Пинаю запрос, получаю метаданные
  const { isError } = useGetApodQuery();

  return (
    <ScrollView style={styles.container}>
      {isError && <OfflineBanner />}

      <NavigateLink screen="PictureDay" style={styles.button}>
        <PictureDay />
      </NavigateLink>

      <NavigateLink screen="Setting" style={styles.button}>
        <Text style={styles.description}>SETTING</Text>
      </NavigateLink>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  description: {
    color: '#CBD5E1',
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
});

//TODO: Если код будет перегружен условными рендерами, стоит выделить отдельные состояния приложения семантически
// const firstLoading = isLoading && !displayData;
// const offlineFirstStart = isError && !displayData;
// сосотояние isLoading && displayData и -  isError && displayData отрабатывает автоматически builder.addMatcher(apodSlice)
