import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const OfflineBanner: React.FC = () => {
  // NOTE: Баннер об ошибке загрузки
  // TODO: Тут надо подумать, причины ошибки могут быть разные. Должно ли отличаться сообщение? Нужен отдельный компонент для банера
  return (
    <View style={styles.offlineBanner}>
      <Text style={styles.offlineText}>Космос временно недоступен</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
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
});
