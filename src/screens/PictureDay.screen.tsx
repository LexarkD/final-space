import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useGetApodQuery } from '../api/nasaApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../constants/theme';
import { AppText } from '../components/AppText';
import { RemoteImageWithLoader } from '../components/RemoteImageWithLoader';

export const PictureDayScreen: React.FC = () => {
  const { status, data: dataQuery } = useGetApodQuery();

  const validData = Boolean(dataQuery);
  const imageUrl = dataQuery?.imageUrl;

  const renderContainerStatus = () => {
    if (status === 'pending') {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.UI_COLOR_CONFIG.icon} />
        </View>
      );
    }

    if (status === 'rejected') {
      return (
        <View style={styles.errorContainer}>
          <Text>Космос временно недоступен</Text>
        </View>
      );
    }
    if (!validData) {
      return (
        <View style={styles.errorContainer}>
          <Text>Космос временно недоступен</Text>
        </View>
      );
    }

    if (status === 'fulfilled' && imageUrl) {
      return <RemoteImageWithLoader imageUrl={imageUrl} />;
    } else {
      return (
        <View style={styles.errorContainer}>
          <Text>Упс! Что-то пошло не так </Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.image}>{renderContainerStatus()}</View>
        {status === 'fulfilled' && (
          <View style={styles.textContainer}>
            <AppText variant="h1">{dataQuery?.title}</AppText>
            <AppText variant="caption">{dataQuery?.date}</AppText>
            <AppText variant="body">{dataQuery?.explanation}</AppText>
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
  loaderContainer: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 0,
    top: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe6e6',
  },
});
