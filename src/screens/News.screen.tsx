import React, { useState, useRef } from 'react';
import {
  ScrollView,
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useGetNewsListQuery } from '../api/newsListApi';
import { NewsCard } from '../components/NewsCard';
import { theme } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export const NewsScreen: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const scrollViewRef = useRef<ScrollView>(null);
  const { data, isLoading, isFetching } = useGetNewsListQuery({
    offset,
    limit,
  });

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

  if (isLoading || isFetching) {
    return (
      <SafeAreaView style={[styles.screen, styles.centered]}>
        <ActivityIndicator size="large" color={theme.UI_COLOR_CONFIG.icon} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.screen}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.contentContainer}
      >
        {data &&
          data.results.map(item => <NewsCard article={item} key={item.id} />)}
        <View style={styles.paginationRow}>
          <Button
            color={theme.UI_COLOR_CONFIG.icon}
            title="Назад"
            onPress={handlePrevPage}
            disabled={offset === 0 || isLoading}
          />
          <Button
            color={theme.UI_COLOR_CONFIG.icon}
            title="Вперед"
            onPress={handleNextPage}
            disabled={!data?.next || isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.UI_COLOR_CONFIG.screenBackground,
  },
  centered: {
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
});
