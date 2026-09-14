import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigateLink } from './NavigateLink';
import { SettingIcon } from './AppIcon';
import { MenuIcon } from './AppIcon';
import { theme } from '../constants/theme';

export const HomeScreenHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftBlock}>
        <MenuIcon />
      </View>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.png')}
      />
      <NavigateLink
        screen="Setting"
        style={styles.rightBlock}
        hitSlop={theme.ICON_CONFIG.hitSlop.forMedium}
      >
        <SettingIcon size={theme.ICON_CONFIG.size.medium} />
      </NavigateLink>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    minHeight: 100,
  },
  leftBlock: {
    flex: 1,
    alignItems: 'flex-start',
    width: 40,
  },
  rightBlock: {
    flex: 1,
    alignItems: 'flex-end',
    width: 40,
  },
  logo: {
    width: 140,
    height: 102,
    resizeMode: 'contain',
    alignItems: 'center',
  },
});
