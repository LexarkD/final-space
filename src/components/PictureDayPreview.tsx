import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigateLink } from './NavigateLink';
import { AppText } from './AppText';
import { theme } from '../constants/theme';
import { useGetApodQuery } from '../api/nasaApi';
import { QueryStateView } from './QueryStateView';
import { ApodMediaView } from './ApodMediaView';

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
            renderData={apod => (
              <ApodMediaView
                apod={apod}
                actionText="Нажмите, чтобы узнать подробнее"
              />
            )}
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
});
