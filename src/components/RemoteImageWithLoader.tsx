import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { theme } from '../constants/theme';

type RemoteImageProps = {
  imageUrl: string;
};

export const RemoteImageWithLoader: React.FC<RemoteImageProps> = ({
  imageUrl,
}) => {
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [hasErrorImage, setHasErrorImage] = useState(false);

  return (
    <>
      {isLoadingImage && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.UI_COLOR_CONFIG.icon} />
        </View>
      )}
      {hasErrorImage ? (
        <View style={styles.errorContainer}>
          <Text>Картинка недоступна</Text>
        </View>
      ) : (
        <Image
          style={styles.image}
          source={{ uri: imageUrl }}
          onError={() => {
            setHasErrorImage(true);
            setIsLoadingImage(false);
          }}
          onLoadEnd={() => setIsLoadingImage(false)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  loaderContainer: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 0,
    top: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe6e6',
  },
});
