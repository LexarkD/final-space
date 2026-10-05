import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useGetApodQuery } from '../api/nasaApi';
import { useAppSelector } from '../hooks/redux.hooks';
import FastImage from '@d11/react-native-fast-image';
import { selectLastAPOD } from '../store/slices/apodSlice';
import { OfflineBanner } from '../components/OfflineBanner';
import { PictureDayImage } from '../components/PictureDayImage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../constants/theme';
import { AppText } from '../components/AppText';

export const PictureDayScreen: React.FC = () => {
  const lastAPOD = useAppSelector(selectLastAPOD);
  const { isError } = useGetApodQuery();

  const renderAPODDescription = () => {
    // NOTE: early return. Отработка крайнего случая. Первый запуск + нет соединения - показ дескрипшена, с объяснением что тут будет
    if (!lastAPOD) {
      return (
        <View style={styles.textContainer}>
          <AppText variant="body">
            После загрузки данных, тут будет описание астрономического фото дня
          </AppText>
        </View>
      );
    }
    return (
      <View style={styles.textContainer}>
        <AppText variant="h1">{lastAPOD.title}</AppText>
        <AppText variant="caption">{lastAPOD.date}</AppText>
        <AppText variant="body">{lastAPOD.explanation}</AppText>
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {isError && <OfflineBanner />}
        <PictureDayImage
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.textContainer}>{renderAPODDescription()}</View>
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
    // Размеры (Паттерн 3: Кратность 8)
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
});
