import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { RemoteImageWithLoader } from './RemoteImageWithLoader';
import { theme } from '../constants/theme';
import type { Apod } from '../types/apodApiType';

// NOTE: логика обработки ответа APOD строится не на контракте, а на реально пришедших данных.
// ApodMediaView создан на случай, если я получаю media, который не могу отобразить или пустое поле imageUrl

// NOTE: Record требует текст для каждого значения media_type
// Проверка полноты на случай появления новых media_type
const PLACEHOLDER_TEXT: Record<Apod['media_type'], string> = {
  image: 'Картинка недоступна',
  video: 'Сегодня видео от NASA',
  other: 'Сегодняшний материал NASA нельзя показать в приложении',
};

type ApodMediaViewProps = {
  apod: Apod;
  /** Дополнительная подсказка под текстом заглушки, например что делать дальше */
  actionText?: string;
};

/**
 * Показывает медиа APOD: картинку, если её можно загрузить, иначе - заглушку с текстом по типу медиа.
 */
export const ApodMediaView: React.FC<ApodMediaViewProps> = ({
  apod,
  actionText,
}) => {
  // NOTE: Решение по реально существующему imageUrl, а не по типу media_type
  if (apod.imageUrl) {
    return <RemoteImageWithLoader imageUrl={apod.imageUrl} />;
  }

  return (
    <View style={styles.placeholder}>
      <AppText variant="body" style={styles.text}>
        {PLACEHOLDER_TEXT[apod.media_type]}
      </AppText>
      {actionText ? (
        <AppText variant="caption" style={styles.text}>
          {actionText}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  text: {
    textAlign: 'center',
  },
});
