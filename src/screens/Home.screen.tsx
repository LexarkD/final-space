import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { useGetApodQuery } from '../api/nasaApi';
import { HomeScreenHeader } from '../components/HomeScreenHeader';
import { OfflineBanner } from '../components/OfflineBanner';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../constants/theme';
import { PictureDayCard } from '../components/PictureDayCard';

export const HomeScreen: React.FC = () => {
  // NOTE: хук apod запроса. Пинаю запрос, получаю метаданные
  const { isError } = useGetApodQuery();

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {isError && <OfflineBanner />}
        <HomeScreenHeader />

        <PictureDayCard />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.UI_COLOR_CONFIG.screenBackground,
  },
  contentContainer: {
    gap: 8,
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

// TODO: реализовать ActivityIndicator
// пример:
// if (isLoading && !displayData) {
//   return (
//     <View style={styles.centerContainer}>
//       <ActivityIndicator size="large" color="#FFFFFF" />
//     </View>
//   );
// }

// TODO: реализовать
// refetchOnFocus - повторный запрос после скрытия и открытия приложения
// refetchOnReconnect - повторный запрос после потери и восстановления сети
// refetch - реализация "Pull to Refresh"

//TODO: Если код будет перегружен условными рендерами, стоит выделить отдельные состояния приложения семантически
// const firstLoading = isLoading && !displayData;
// const offlineFirstStart = isError && !displayData;
// сосотояние isLoading && displayData и -  isError && displayData отрабатывает автоматически builder.addMatcher(apodSlice)
