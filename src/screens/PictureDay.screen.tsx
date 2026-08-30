import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGetApodQuery } from '../api/nasaApi';
import { useAppSelector } from '../hooks/redux.hooks';
import { selectLastPhoto } from '../store/slices/apodSlice';
import FastImage from '@d11/react-native-fast-image';

// TODO: реализлвать паттерн "Graceful Degradation" - окно будет кликабельно и показывать вчерашние данные, если нет свежих. Просто передавать сюда данные для показа пропсом, а экран будет просто отрисовывать.
// Не забыть - убрать повторную возможность лайка одних данных несколько раз

export const PictureDayScreen: React.FC = () => {
  const displayData = useAppSelector(selectLastPhoto);
  // TODO: Все данные должны прийти сюда через пропсы
  const { isError } = useGetApodQuery();

  //NOTE: сейчас условие нужно, чтоб не ругался TS.
  //Позже добавится условие первый запуск без связи - if ( !displayData ) {return хард заглушка + описание, того что будет в этом окне в будущем }
  // NOTE: Показываю данные из apodSlice
  if (displayData) {
    //NOTE: подготовка URL.
    // TODO: Нужно отдавать url данные из слайса уже подготовленными, либо в редюсере, либо в хуке.
    const imageUrl =
      displayData.media_type === 'video'
        ? displayData.thumbnail_url
        : displayData.url;

    return (
      <View style={styles.container}>
        {
          // TODO: isError- буду передавать сюда пропсом
          isError && (
            <View style={styles.offlineBanner}>
              <Text style={styles.offlineText}>Космос временно недоступен</Text>
            </View>
          )
        }
        {/* TODO: imageUrl и contentData передать сюда пропсом */}
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
        <View style={styles.textContainer}>
          <Text style={styles.title}>{displayData.title}</Text>
          <Text style={styles.date}>{displayData.date}</Text>
          <Text style={styles.description} numberOfLines={4}>
            {displayData.explanation}
          </Text>
        </View>
      </View>
    );
  }
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
    height: 350,
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
