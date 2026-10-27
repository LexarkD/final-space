import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Button,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useGetNewsListQuery } from '../api/newsListApi';
import { NewsCard } from '../components/NewsCard';
import { theme } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QueryStateView } from '../components/QueryStateView';
import { AppText } from '../components/AppText';
import { useRefreshByUser } from '../hooks/useRefreshByUser';

export const NewsScreen: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const { currentData, isError, refetch } = useGetNewsListQuery({
    offset,
    limit,
  });

  // NOTE: refetch перезапрашивает текущий offset- обновляет показанную страницу или повторяет упавшую загрузку
  const { isRefreshingByUser, refreshByUser } = useRefreshByUser([refetch]);

  // NOTE: Не вижу смысла выносить логику пагинации из компонента, так как в ближайших планах заменить ее на Infinite scroll (Фаза 4)
  const handleNextPage = () => {
    setOffset(prev => prev + limit);
  };

  const handlePrevPage = () => {
    setOffset(prev => Math.max(0, prev - limit));
  };

  return (
    <SafeAreaView style={styles.screen}>
      {/* NOTE: key={offset} нужен, чтоб при смене страница рендерить новый ScrollView с положением скрола сверху*/}
      <ScrollView
        key={offset}
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
        <QueryStateView
          // NOTE: Использую currentData, потому что он показывает данные только для текущих параметров.
          // data - может вернуть результат запроса с прошлыми параметрами, тем самым вызывая случай, когда offset: 10, а я имею список статей от запроса с offset: 0.
          data={currentData}
          isError={isError}
          errorMessage="Не удалось загрузить новости. Потяните вниз, чтобы повторить"
          renderData={newsList =>
            newsList.results.length ? (
              <>
                {newsList.results.map(article => (
                  <NewsCard article={article} key={article.id} />
                ))}
                <View style={styles.paginationRow}>
                  <Button
                    color={theme.UI_COLOR_CONFIG.icon}
                    title="Назад"
                    onPress={handlePrevPage}
                    disabled={!newsList.previous}
                  />
                  <Button
                    color={theme.UI_COLOR_CONFIG.icon}
                    title="Вперед"
                    onPress={handleNextPage}
                    disabled={!newsList.next}
                  />
                </View>
              </>
            ) : (
              // NOTE: Пустой список обрабатывается как успешный ответ без содержимого
              <View style={styles.centered}>
                <AppText variant="body">Новостей пока нет</AppText>
              </View>
            )
          }
        />
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
    flexGrow: 1,
    gap: theme.spacing.m,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.m,
  },
});
