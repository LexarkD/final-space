import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useAppSelector } from '../hooks/redux.hooks';
import { selectNewsPreview } from '../store/slices/newsPreviewSlice';
import { NavigateLink } from './NavigateLink';
import { AppText } from './AppText';
import { theme } from '../constants/theme';
import FastImage from '@d11/react-native-fast-image';

export const NewsPreview: React.FC = () => {
  const newsPreview = useAppSelector(selectNewsPreview);
  const datePreview = !newsPreview
    ? null
    : newsPreview.published_at.split('T')[0];

  const renderImagePreview = () => {
    if (!newsPreview) {
      return (
        <View style={styles.stubContainer}>
          <Image
            source={require('../../assets/images/stub-space.jpg')}
            style={styles.image}
          />
        </View>
      );
    }
    return (
      <FastImage
        style={styles.image}
        source={{
          uri: newsPreview.image_url,
          priority: FastImage.priority.high,
          //NOTE: web означает, доверять заголовкам сервера, но кэшировать на диск
          cache: FastImage.cacheControl.web,
        }}
        resizeMode="cover"
      />
    );
  };
  return (
    <NavigateLink screen="News">
      <View style={styles.card}>
        <Text style={theme.typography.h1}>News</Text>
        <View style={styles.previewImage}>{renderImagePreview()}</View>
        {newsPreview && (
          <>
            <AppText variant="body" numberOfLines={2}>
              {newsPreview.title}
            </AppText>
            <AppText variant="caption">{`${datePreview}`}</AppText>
          </>
        )}
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
  stubContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: theme.spacing.m,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
