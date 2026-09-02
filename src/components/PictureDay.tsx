import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { useAppSelector } from '../hooks/redux.hooks';
import { selectLastAPODUrl } from '../store/slices/apodSlice';

export const PictureDay: React.FC = () => {
  // NOTE: Получаю контент из apodSlice. При успешном запросе (GetApodQuery), extraReducers автоматически обновит в apodSlice старые данные на новые.
  // Имеется единый источник правды apodSlice. У меня отсутствует необходимость прописывать кейсы, когда брать контент из useGetApodQuery, а когда из - useAppSelector.
  // Так же я получаю паттерн поведения Stale-While-Revalidate - показываю кешированные данные, пока ожидаю ответ с новыми.
  // TODO: думаю, нужен ли мне ActivityIndicator?
  const lastAPODUrl = useAppSelector(selectLastAPODUrl);

  // NOTE: Отработка крайнего случая. Первый запуск + нет соединения - показ заглушки
  if (!lastAPODUrl) {
    return (
      <View style={styles.centerContainer}>
        <Image
          source={require('../assets/images/stub-space.jpg')}
          style={styles.image}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={{
          uri: lastAPODUrl,
          priority: FastImage.priority.high,
          //NOTE: web означает, доверять заголовкам сервера, но кэшировать на диск
          cache: FastImage.cacheControl.web,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 350,
    backgroundColor: '#0B0F19',
  },
  centerContainer: {
    width: '100%',
    height: 350,
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
});

// NOTE: Индикатор загрузки
// if (isLoading && !displayData) {
//   return (
//     <View style={styles.centerContainer}>
//       <ActivityIndicator size="large" color="#FFFFFF" />
//     </View>
//   );
// }
