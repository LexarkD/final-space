import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useGetApodQuery } from '../api/nasaApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../constants/theme';
import { AppText } from '../components/AppText';
import { RemoteImageWithLoader } from '../components/RemoteImageWithLoader';
import { QueryStateView } from '../components/QueryStateView';

export const PictureDayScreen: React.FC = () => {
  const { isError, data } = useGetApodQuery();

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.image}>
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
        {data && (
          <View style={styles.textContainer}>
            <AppText variant="h1">{data.title}</AppText>
            <AppText variant="caption">{data.date}</AppText>
            <AppText variant="body">{data.explanation}</AppText>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.UI_COLOR_CONFIG.screenBackground,
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.UI_COLOR_CONFIG.screenBackground,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  textContainer: {
    gap: theme.spacing.m,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.m,
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
