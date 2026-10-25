import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigateLink } from './NavigateLink';
import { AppText } from './AppText';
import { theme } from '../constants/theme';
import { useGetApodQuery } from '../api/nasaApi';
import { RemoteImageWithLoader } from './RemoteImageWithLoader';
import { QueryStateView } from './QueryStateView';

export const PictureDayPreview: React.FC = () => {
  const { isError, data } = useGetApodQuery();

  return (
    <NavigateLink screen="PictureDay">
      <View style={styles.card}>
        <Text style={theme.typography.h1}>Picture of the day</Text>
        <View style={styles.previewImage}>
          <QueryStateView
            data={data}
            isError={isError}
            renderData={apod =>
              apod.imageUrl ? (
                <RemoteImageWithLoader imageUrl={apod.imageUrl} />
              ) : (
                <View style={styles.errorContainer}>
                  <Text>Упс! Что-то пошло не так</Text>
                </View>
              )
            }
          />
        </View>
        <AppText variant="body">See More</AppText>
      </View>
    </NavigateLink>
  );
};

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.m,
    padding: theme.spacing.m,
    borderRadius: 12,
    backgroundColor: theme.UI_COLOR_CONFIG.cardBackground,
  },
  previewImage: {
    width: '100%',
    height: 192,
    overflow: 'hidden',
    borderRadius: 12,
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
