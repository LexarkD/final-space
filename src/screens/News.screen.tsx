import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useGetNewsListQuery } from '../api/newsListApi';
import { NewsCard } from '../components/NewsCard';
import { theme } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export const NewsScreen: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const {
    data: dataQuery,
    isFetching,
    isSuccess,
    isError,
  } = useGetNewsListQuery({
    offset,
    limit,
  });

  const validData = Boolean(dataQuery);

  const handleNextPage = () => {
    setOffset(prev => prev + limit);
  };

  const handlePrevPage = () => {
    setOffset(prev => Math.max(0, prev - limit));
  };

  const renderNewsScreen = () => {
    if (isFetching) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.UI_COLOR_CONFIG.icon} />
        </View>
      );
    }
    if (isError || !validData) {
      return (
        <View style={styles.centered}>
          <Text>Космос временно недоступен</Text>
        </View>
      );
    }
    if (isSuccess && dataQuery?.results?.length) {
      return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {dataQuery.results.map(article => (
            <NewsCard article={article} key={article.id} />
          ))}
          <View style={styles.paginationRow}>
            <Button
              color={theme.UI_COLOR_CONFIG.icon}
              title="Назад"
              onPress={handlePrevPage}
              disabled={!dataQuery?.previous}
            />
            <Button
              color={theme.UI_COLOR_CONFIG.icon}
              title="Вперед"
              onPress={handleNextPage}
              disabled={!dataQuery?.next}
            />
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.centered}>
          <Text>Упс! Что-то пошло не так </Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={[styles.screen]}>{renderNewsScreen()}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.UI_COLOR_CONFIG.screenBackground,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    gap: theme.spacing.m,
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.m,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe6e6',
  },
});
