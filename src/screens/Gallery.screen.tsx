import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../constants/theme';

export const GalleryScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.screen}>
      <View style={styles.container}>
        <Text>Gallery screen</Text>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text>Go back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: theme.spacing.s,
    paddingHorizontal: theme.spacing.s,
    backgroundColor: theme.UI_COLOR_CONFIG.screenBackground,
  },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
});
