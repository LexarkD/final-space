import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  RefreshControl,
} from 'react-native';
import { useGetApodQuery } from '../api/nasaApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../constants/theme';
import { AppText } from '../components/AppText';
import { QueryStateView } from '../components/QueryStateView';
import { ApodMediaView } from '../components/ApodMediaView';
import { openExternalUrl } from '../utils/openExternalUrl';
import { useRefreshByUser } from '../hooks/useRefreshByUser';

export const PictureDayScreen: React.FC = () => {
  const { isError, data, refetch } = useGetApodQuery();

  const { isRefreshingByUser, refreshByUser } = useRefreshByUser([refetch]);

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
        <View style={styles.image}>
          <QueryStateView
            data={data}
            isError={isError}
            errorMessage="Не удалось загрузить фото дня. Потяните вниз, чтобы повторить"
            renderData={apod => <ApodMediaView apod={apod} />}
          />
        </View>
        {data && (
          <View style={styles.textContainer}>
            <AppText variant="h1">{data.title}</AppText>
            <AppText variant="caption">{data.date}</AppText>
            <AppText variant="body">{data.explanation}</AppText>
            <Pressable
              style={styles.linkButton}
              onPress={() => openExternalUrl(data.permalink)}
            >
              <AppText variant="body" style={styles.linkText}>
                Открыть на сайте NASA
              </AppText>
            </Pressable>
          </View>
        )}
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
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.UI_COLOR_CONFIG.screenBackground,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  textContainer: {
    gap: theme.spacing.m,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.m,
  },
  linkButton: {
    minHeight: 48,
    justifyContent: 'center',
  },
  linkText: {
    textDecorationLine: 'underline',
  },
});
