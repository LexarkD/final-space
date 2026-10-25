import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigateLink } from './NavigateLink';
import { theme } from '../constants/theme';
import { AppText } from './AppText';
import { useGetNewsPreviewQuery } from '../api/newsPreviewApi';
import { RemoteImageWithLoader } from './RemoteImageWithLoader';
import { QueryStateView } from './QueryStateView';

export const NewsPreview: React.FC = () => {
  const { isError, data } = useGetNewsPreviewQuery();

  return (
    <NavigateLink screen="News">
      <View style={styles.card}>
        <Text style={theme.typography.h1}>News</Text>
        <View style={styles.previewImage}>
          <QueryStateView
            data={data}
            isError={isError}
            renderData={article => (
              <RemoteImageWithLoader imageUrl={article.image_url} />
            )}
          />
        </View>
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
