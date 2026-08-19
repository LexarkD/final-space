import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const GalleryScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Gallery screen</Text>
      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text>Go back</Text>
      </Pressable>
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
