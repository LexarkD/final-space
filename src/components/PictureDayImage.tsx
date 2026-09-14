import React from 'react';
import { View, StyleSheet, Image, StyleProp, ViewStyle } from 'react-native';
import FastImage, { ResizeMode } from '@d11/react-native-fast-image';
import { useAppSelector } from '../hooks/redux.hooks';
import { selectLastAPODUrl } from '../store/slices/apodSlice';
import { theme } from '../constants/theme';

type PictureDayImageProps = {
  style?: StyleProp<ViewStyle>;
  resizeMode?: ResizeMode;
};

export const PictureDayImage: React.FC<PictureDayImageProps> = ({
  style,
  resizeMode = FastImage.resizeMode.cover,
}) => {
  // NOTE: Получаю контент из apodSlice. При успешном запросе (GetApodQuery), extraReducers автоматически обновит в apodSlice старые данные на новые.
  // Имеется единый источник правды apodSlice. У меня отсутствует необходимость прописывать кейсы, когда брать контент из useGetApodQuery, а когда из - useAppSelector.
  // Так же я получаю паттерн поведения Stale-While-Revalidate - показываю кешированные данные, пока ожидаю ответ с новыми.
  const lastAPODUrl = useAppSelector(selectLastAPODUrl);

  // NOTE: Показ заглушки. Отработка крайнего случая - первый запуск + нет соединения
  if (!lastAPODUrl) {
    return (
      <View style={[styles.stubContainer, style]}>
        <Image
          source={require('../../assets/images/stub-space.jpg')}
          style={styles.image}
        />
      </View>
    );
  }
  return (
    <View style={[styles.container, style]}>
      <FastImage
        style={styles.image}
        source={{
          uri: lastAPODUrl,
          priority: FastImage.priority.high,
          //NOTE: web означает, доверять заголовкам сервера, но кэшировать на диск
          cache: FastImage.cacheControl.web,
        }}
        resizeMode={resizeMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
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
