import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigateLink } from './NavigateLink';
import { theme } from '../constants/theme';
import { AppText } from './AppText';
import { useGetNewsPreviewQuery } from '../api/newsPreviewApi';
import { RemoteImageWithLoader } from './RemoteImageWithLoader';

export const NewsPreview: React.FC = () => {
  const { status, data: dataQuery } = useGetNewsPreviewQuery();

  const validData = Boolean(dataQuery);
  const imageUrl = dataQuery?.image_url;

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
    <NavigateLink screen="News">
      <View style={styles.card}>
        <Text style={theme.typography.h1}>News</Text>
        <View style={styles.previewImage}>{renderContainerStatus()}</View>
        <AppText variant="body">See More News</AppText>
      </View>
    </NavigateLink>
  );
};

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.m,
    padding: theme.spacing.m,
    borderRadius: 12,
    backgroundColor: theme.UI_COLOR_CONFIG.cardBackground,
  },
  previewImage: {
    width: '100%',
    height: 192,
    overflow: 'hidden',
    borderRadius: 12,
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
