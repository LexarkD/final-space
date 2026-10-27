import { Linking } from 'react-native';

// NOTE: Без Linking.canOpenURL: на Android 11+ он возвращает false для https-ссылок,
// если в AndroidManifest не объявлены соответствующие intent-запросы. Вместо проверки ловим ошибку openURL
// TODO(Фаза 6): показывать пользователю сообщение, если ссылку открыть не удалось
export const openExternalUrl = async (url: string): Promise<void> => {
  try {
    await Linking.openURL(url);
  } catch (error) {
    console.error(`Не удалось открыть ссылку: ${url}`, error);
  }
};
