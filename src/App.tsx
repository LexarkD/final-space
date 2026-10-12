import React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/Home.screen';

import { SettingScreen } from './screens/Setting.screen';
import { PictureDayScreen } from './screens/PictureDay.screen';
import { NewsScreen } from './screens/News.screen';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Home: {
      screen: HomeScreen,
    },
    PictureDay: PictureDayScreen,
    News: NewsScreen,
    Setting: SettingScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
