import React from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';

import { HomeScreenHeader } from '../components/HomeScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../constants/theme';
import { PictureDayPreview } from '../components/PictureDayPreview';
import { useGetNewsPreviewQuery } from '../api/newsPreviewApi';
import { useGetApodQuery } from '../api/nasaApi';
import { NewsPreview } from '../components/NewsPreview';
import { useRefreshByUser } from '../hooks/useRefreshByUser';

export const HomeScreen: React.FC = () => {
  const { refetch: refetchAPOD } = useGetApodQuery();
  const { refetch: refetchNews } = useGetNewsPreviewQuery();

  const { isRefreshingByUser, refreshByUser } = useRefreshByUser([
    refetchAPOD,
    refetchNews,
  ]);

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshingByUser}
            onRefresh={refreshByUser}
            //NOTE: Цвет для iOS
            tintColor={theme.UI_COLOR_CONFIG.icon}
            //NOTE: Цвета для Android
            colors={[theme.UI_COLOR_CONFIG.icon]}
          />
        }
      >
        <HomeScreenHeader />
        <PictureDayPreview />
        <NewsPreview />
      </ScrollView>
    </SafeAreaView>
  );
};

// NOTE: Карточки превью намеренно не отключаются при ошибке:
// NewsPreview и NewsScreen используют разные запросы, ошибка превью не означает ошибку экрана;
// Каждый экран сам показывает ошибку и даёт повторить загрузку через pull-to-refresh.
// Отключённая карточка без объяснения выглядела бы для пользователя как сломанная, что вынуждает добавлять новые UI компоненты

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
});
