import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { AppText } from './AppText';
import { theme } from '../constants/theme';
import type { ArticleRead } from '../types/newsApiType';
import { RemoteImageWithLoader } from './RemoteImageWithLoader';

type NewsCardProps = {
  article: ArticleRead;
};

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const dateNews = article.published_at.split('T')[0];

  const handlePress = async () => {
    const supported = await Linking.canOpenURL(article.url);
    if (supported) {
      await Linking.openURL(article.url);
    } else {
      console.error(`Don't know how to open this URL: ${article.url}`);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
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
