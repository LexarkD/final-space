import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigateLink } from '../components/navigateLink';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home screen</Text>
      <NavigateLink screen="Gallery" style={styles.button}>
        <Text>Go to Gallery</Text>
      </NavigateLink>
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
