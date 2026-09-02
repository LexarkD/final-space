import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGetApodQuery } from '../api/nasaApi';
import { useAppSelector } from '../hooks/redux.hooks';
import { selectLastAPOD } from '../store/slices/apodSlice';
import { OfflineBanner } from '../components/OfflineBanner';
import { PictureDay } from '../components/PictureDay';

//TODO: Не допустить повторную возможность лайка старых данных

export const PictureDayScreen: React.FC = () => {
  const lastAPOD = useAppSelector(selectLastAPOD);
  const { isError } = useGetApodQuery();

  const renderAPODDescription = () => {
    // NOTE: early return. Отработка крайнего случая. Первый запуск + нет соединения - показ дескрипшена, с объяснением что тут будет
    if (!lastAPOD) {
      return (
        <View>
          <Text style={styles.title}>
            После загрузки данных, тут будет описание астрономического фото дня
          </Text>
        </View>
      );
    }
    return (
      <View>
        <Text style={styles.title}>{lastAPOD.title}</Text>
        <Text style={styles.date}>{lastAPOD.date}</Text>
        <Text style={styles.description} numberOfLines={4}>
          {lastAPOD.explanation}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isError && <OfflineBanner />}
      <PictureDay />
      <View style={styles.textContainer}>{renderAPODDescription()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
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
});
