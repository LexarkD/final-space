import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { theme } from '../constants/theme';
import { AppText } from './AppText';

type QueryStateViewProps<T> = {
  data: T | undefined;
  isError: boolean;
  /** Текст заглушки, если данных нет и запрос упал */
  errorMessage?: string;
  /** render-функция вызывается только когда data !== undefined, поэтому внутри неё data имеет тип T (без undefined) */
  renderData: (data: T) => React.ReactNode;
};

// NOTE: Порядок проверок: данные -> ошибка -> загрузка (паттерн stale-while-revalidate). Если данные уже есть, показываю их даже во время перезапроса или после его ошибки.
// NOTE: Использую дженерик функцию, как альтернативу дженерик компоненту с костылем
/**
 * Показывает состояние запроса: спиннер при первой загрузке, заглушку при ошибке без данных,
 * данные (и плашку «Не удалось обновить», если последний запрос упал).
 */
export function QueryStateView<T>({
  data,
  isError,
  errorMessage = 'Космос временно недоступен',
  renderData,
}: QueryStateViewProps<T>) {
  if (data !== undefined) {
    return (
      <>
        {renderData(data)}
        {/* NOTE: data — последний успешный результат (может быть устаревшим), а последняя попытка упала (isError).
    Показываю старые данные и сообщаю, что обновить не удалось  */}
        {isError && (
          <View style={styles.staleBanner}>
            <AppText variant="caption" style={styles.staleBannerText}>
              Не удалось обновить
            </AppText>
          </View>
        )}
      </>
    );
  }
  // NOTE: Данных в кеше нет и последний запрос упал(isError=true): показываю errorMessage
  if (isError) {
    return (
      <View style={[styles.fallback, styles.error]}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }

  // TODO: индикатор загрузки ничего не знает про состояние загрузки. Он срабатывает от data === undefined && isError === false.
  // Семантически мне это не очень нравится, но пока что это рабочий вариант. Фаза 4 - удобный момент вернуться к логике QueryStateView.
  return (
    <View style={styles.fallback}>
      <ActivityIndicator size="large" color={theme.UI_COLOR_CONFIG.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    paddingHorizontal: theme.spacing.m,
  },
  error: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  staleBanner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    paddingVertical: theme.spacing.xs,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  staleBannerText: {
    color: theme.UI_COLOR_CONFIG.icon,
  },
});
