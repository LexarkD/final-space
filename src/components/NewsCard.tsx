import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from './AppText';
import { theme } from '../constants/theme';
import type { ArticleRead } from '../types/newsApiType';
import { RemoteImageWithLoader } from './RemoteImageWithLoader';
import { openExternalUrl } from '../utils/openExternalUrl';

type NewsCardProps = {
  article: ArticleRead;
};

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const dateNews = article.published_at.split('T')[0];

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => openExternalUrl(article.url)}
    >
      <View style={styles.previewImage}>
        <RemoteImageWithLoader imageUrl={article.image_url} />
      </View>
      <AppText variant="body" numberOfLines={2}>
        {article.title}
      </AppText>
      <AppText variant="caption">{dateNews}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 320,
    gap: theme.spacing.m,
    padding: theme.spacing.m,
    borderRadius: 12,
    backgroundColor: theme.UI_COLOR_CONFIG.cardBackground,
  },
  previewImage: {
    width: '100%',
    height: 190,
    overflow: 'hidden',
    borderRadius: 12,
  },
});
