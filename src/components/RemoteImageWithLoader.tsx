import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { theme } from '../constants/theme';

type RemoteImageProps = {
  imageUrl: string;
};

// NOTE: Ациклический конечный автомат: loading -> loaded | error.
// Поскольку новый URL - это новый key, всегда создается новый экземпляр с начальным состоянием loading
type ImageState = 'loading' | 'loaded' | 'error';

const RemoteImageContent = ({ imageUrl }: RemoteImageProps) => {
  const [imageState, setImageState] = useState<ImageState>('loading');

  //NOTE: Ранний возврат. Заглушка заменяет картинку.
  if (imageState === 'error') {
    return (
      <View style={styles.errorContainer}>
        <Text>Картинка недоступна</Text>
      </View>
    );
  }
  return (
    <>
      {/* NOTE: Image рендерится и в состоянии loading, иначе загрузка не начнётся */}
      <Image
        style={styles.image}
        source={{ uri: imageUrl }}
        onLoad={() => setImageState('loaded')}
        onError={() => setImageState('error')}
      />
      {/* NOTE: Спиннер идет после Image, поэтому лежит поверх */}
      {imageState === 'loading' && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.UI_COLOR_CONFIG.icon} />
        </View>
      )}
    </>
  );
};

/**
 * Загружает картинку по URL, показывает спиннер во время загрузки и заглушку - при ошибке.
 * При смене URL создает новый экземпляр компонента с начальным состоянием.
 */
// NOTE: RemoteImageContent обертка, которая необходима, чтоб поставить key
export const RemoteImageWithLoader: React.FC<RemoteImageProps> = ({
  imageUrl,
}) => <RemoteImageContent key={imageUrl} imageUrl={imageUrl} />;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },

  loaderContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe6e6',
  },
});
