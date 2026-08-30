import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { useGetApodQuery } from '../api/nasaApi';
import { useAppSelector } from '../hooks/redux.hooks';
import { selectLastPhoto } from '../store/slices/apodSlice';
import { NavigateLink } from '../components/navigateLink';

//TODO: Финальная иерархия:
//  экран HomeScreen - на своем уровне имеет право знать о стостоянии запроса(isError ?). Но не обязан знать -данные с кеша или сервера
//  компонент Apod- глупый, просто показывает превью и является ссылкой на экран ежедневных фото. Перенести существующий набросок верстки из HomeScreen в Apod
//  экран PictureDayScreen - глупый, показывает данные которые были переданы

// TODO: реализовать
// refetchOnFocus - повторный запрос после скрытия и открытия приложения
// refetchOnReconnect - повторный запрос после потери и восстановления сети
// refetch - реализация "Pull to Refresh"

export const HomeScreen: React.FC = () => {
  // NOTE: хук apod запроса. Пинаю запрос, получаю метаданные
  const { isLoading, isError } = useGetApodQuery();

  // NOTE: Получаю контент из apodSlice. При успешном запросе (GetApodQuery), extraReducers автоматически обновит в apodSlice старые данные на новые.
  // Имеется единый источник правды apodSlice. У меня отсутствует необходимость прописывать кейсы, когда брать контент из useGetApodQuery, а когда из - useAppSelector.
  // Так же я получаю паттерн поведения Stale-While-Revalidate - показываю кешированные данные, пока ожидаю ответ с новыми.
  const displayData = useAppSelector(selectLastPhoto);

  // NOTE: Индикатор загрузки
  if (isLoading && !displayData) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  // NOTE: Отработка крайнего случая. Первый запуск + нет соединения - показ заглушки с сообщением
  if (!displayData) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Космос временно недоступен</Text>
        <Image
          source={require('../assets/images/stub-space.jpg')}
          style={styles.image}
        />
      </View>
    );
  }

  //NOTE: подготовка URL.
  // TODO: Нужно отдавать url данные из слайса уже подготовленными, либо в редюсере, либо в хуке.
  const imageUrl =
    displayData.media_type === 'video'
      ? displayData.thumbnail_url
      : displayData.url;

  return (
    <ScrollView style={styles.container}>
      {
        // NOTE: Баннер об ошибке загрузки
        // TODO: Тут надо подумать, причины ошибки могут быть разные. Должно ли отличаться сообщение? Нужен отдельный компонент для банера

        isError && (
          <View style={styles.offlineBanner}>
            <Text style={styles.offlineText}>Космос временно недоступен</Text>
          </View>
        )
      }

      <NavigateLink screen="PictureDay" style={styles.button}>
        <FastImage
          style={styles.image}
          source={{
            uri: imageUrl,
            priority: FastImage.priority.high,
            //NOTE: web означает: доверять заголовкам сервера, но кэшировать на диск
            cache: FastImage.cacheControl.web,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </NavigateLink>
      <NavigateLink screen="Setting" style={styles.button}>
        <Text style={styles.description}>SETTING</Text>
      </NavigateLink>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#0B0F19',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 350, // можно использовать aspectRatio
    backgroundColor: '#1A2235',
  },
  offlineBanner: {
    backgroundColor: '#F59E0B',
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offlineText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  textContainer: {
    padding: 16,
    flex: 1,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    lineHeight: 32,
  },
  date: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 16,
  },
  description: {
    color: '#CBD5E1',
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
});
