import React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/Home.screen';
import { GalleryScreen } from './screens/Gallery.screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './store/store.ts';
import { persistor } from './store/store.ts';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerTitleStyle: { color: '#FFFFFF' },
    headerStyle: {
      backgroundColor: '#303133',
    },
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: 'Home',
      },
    },
    Gallery: GalleryScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

// import { useNavigation } from '@react-navigation/native';
// const navigation = useNavigation();
// <Button onPress={() => navigation.navigate('Details')}>Go to Details</Button>
// NOTE: объект navigation — это набор инструкций (методов) для управления историей переходов
// navigation.navigate добавляет в стек экарн, если мы не на этом экране
// navigation.push добавляет в стек экран , дваже если мы уже на этом экране
// navigation.goBack() кастомный вариант возврата на предыдущий экран в стеке
// navigation.popTo('Home') - вернутся к конкретному указанному экрану в стеке

// <Link screen="Details">Go to Details</Link>
// <Button screen="Details">Go to Details</Button>
