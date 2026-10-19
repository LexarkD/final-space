import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';

import { HomeScreenHeader } from '../components/HomeScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../constants/theme';
import { PictureDayPreview } from '../components/PictureDayPreview';
import { useGetNewsPreviewQuery } from '../api/newsPreviewApi';
import { useGetApodQuery } from '../api/nasaApi';
import { NewsPreview } from '../components/NewsPreview';

export const HomeScreen: React.FC = () => {
  const { refetch: refetchAPOD } = useGetApodQuery();
  const { refetch: refetchNews } = useGetNewsPreviewQuery();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchAPOD(), refetchNews()]);
    } catch (error) {
      console.error('Ошибка при обновлении данных: ', error);
    } finally {
      setRefreshing(false);
    }
  }, [refetchAPOD, refetchNews]);

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
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

//TODO: сделать некликабельной NavigateLink, если запрос закончился с ошибкой или data не валидна

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
