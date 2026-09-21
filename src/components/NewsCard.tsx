import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../hooks/redux.hooks';
import { selectLastAPOD } from '../store/slices/apodSlice';
import { PictureDayImage } from './PictureDayImage';
import { NavigateLink } from '../components/NavigateLink';
import { AppText } from '../components/AppText';
import { theme } from '../constants/theme';

export const NewsCard: React.FC = () => {
  const lastAPOD = useAppSelector(selectLastAPOD);
  return (
    <NavigateLink screen="PictureDay">
      <View style={styles.card}>
        <Text style={theme.typography.h1}>Picture of the Day</Text>
        <View style={styles.previewImage}>
          <PictureDayImage />
        </View>
        {lastAPOD && (
          <>
            <AppText variant="body" numberOfLines={2}>
              {lastAPOD.title}
            </AppText>
            <AppText variant="caption">{lastAPOD.date}</AppText>
          </>
        )}
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
