import React, { useState, useRef } from 'react';
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
  const scrollViewRef = useRef<ScrollView>(null);

  const {
    data: dataQuery,
    status,
    isFetching,
  } = useGetNewsListQuery({
    offset,
    limit,
  });

  const validData = Boolean(dataQuery);

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
  };

  const handleNextPage = () => {
    setOffset(prev => prev + limit);
    scrollToTop();
  };

  const handlePrevPage = () => {
    setOffset(prev => Math.max(0, prev - limit));
    scrollToTop();
  };

  const renderNewsScreen = () => {
    if (status === 'pending') {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.UI_COLOR_CONFIG.icon} />
        </View>
      );
    }
    if (status === 'rejected') {
      return (
        <View style={styles.centered}>
          <Text>Космос временно недоступен</Text>;
        </View>
      );
    }
    if (!validData) {
      return (
        <View style={styles.centered}>
          <Text>Космос временно недоступен</Text>;
        </View>
      );
    }
    if (status === 'fulfilled' && dataQuery?.results?.length) {
      return (
        <>
          {dataQuery.results.map(article => (
            <NewsCard article={article} key={article.id} />
          ))}
        </>
      );
    } else {
      return (
        <View style={styles.centered}>
          <Text>Упс! Что-то пошло не так </Text>;
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={[styles.screen]}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.contentContainer}
      >
        {renderNewsScreen()}
        <View style={styles.paginationRow}>
          <Button
            color={theme.UI_COLOR_CONFIG.icon}
            title="Назад"
            onPress={handlePrevPage}
            disabled={offset === 0 || isFetching}
          />
          <Button
            color={theme.UI_COLOR_CONFIG.icon}
            title="Вперед"
            onPress={handleNextPage}
            disabled={!dataQuery?.next || isFetching}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  //
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
    flexGrow: 1,
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
