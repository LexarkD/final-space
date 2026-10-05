import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { AppText } from './AppText';
import { theme } from '../constants/theme';
import type { ArticleRead } from '../api/newsOpenApi';

type NewsCardProps = {
  article: ArticleRead;
};

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
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
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator
              size="large"
              color={theme.UI_COLOR_CONFIG.icon}
            />
          </View>
        )}

        {hasError ? (
          // NOTE: Тут исользуется тернанрный оператор, чоб размонтировать <Image/> при наличии ошибки
          <View style={styles.errorContainer}>
            <Text>Картинка недоступна</Text>
          </View>
        ) : (
          <Image
            style={styles.image}
            source={{ uri: article.image_url }}
            onError={() => setHasError(true)}
            onLoadEnd={() => setIsLoading(false)}
          />
        )}
      </View>
      <AppText variant="body" numberOfLines={2}>
        {article.title}
      </AppText>
      <AppText variant="caption">{`${dateNews}`}</AppText>
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
  image: {
    width: '100%',
    height: '100%',
  },
});
