import React from 'react';
import { View, Text, Pressable, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';
import { persistor } from '../store/store';

export const SettingScreen = () => {
  const navigation = useNavigation();

  const clearAppCache = async () => {
    try {
      // 1. Удаляем JSON из AsyncStorage (сбрасываем redux-persist)
      await persistor.purge();

      // 2. Удаляем физические файлы картинок с жесткого диска
      await FastImage.clearDiskCache();
      await FastImage.clearMemoryCache();

      Alert.alert(
        'Успешно',
        'Кэш очищен! Теперь выключи интернет и перезапусти приложение.',
      );
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text>Go back</Text>
      </Pressable>
      <Button
        title="[DEV] Очистить кэш"
        onPress={clearAppCache}
        color="#EF4444"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
});
