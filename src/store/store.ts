import { combineReducers, configureStore } from '@reduxjs/toolkit';
import apodSliceReducer from './slices/apodSlice.ts';
import newsPreviewSliceReducer from './slices/newsPreviewSlice.ts';

import { nasaApi } from '../api/nasaApi.ts';
import {
  PersistConfig,
  persistReducer,
  PAUSE,
  FLUSH,
  REHYDRATE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';
import { STORAGE_KEY } from '../constants/storageKey.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseNewsApi } from '../api/baseNewsApi.ts';

// NOTE: Redux имеет один глобальный стор, combineReducers объеденяет вместе редюсеры моих слайс-состояний(хранимые данные от Redux Slice) и редюсеры Api запросов (временные мета-данные RTKQuery)
// Здесь Redux store служит единой шиной памяти для хранения временных данных, метаданных и статусов от всех редюсеров. Плюс является посредником в работе с AsyncStorage
const combinedReducer = combineReducers({
  apod: apodSliceReducer,
  newsPreview: newsPreviewSliceReducer,
  [nasaApi.reducerPath]: nasaApi.reducer,
  [baseNewsApi.reducerPath]: baseNewsApi.reducer,
});

type CombinedReducerState = ReturnType<typeof combinedReducer>;

const persistConfig: PersistConfig<CombinedReducerState> = {
  key: STORAGE_KEY,
  storage: AsyncStorage,
  // NOTE: вношу в черный список кэш RTK Query. Мне не требуется сохранять метаданные и статусы запросов в AsyncStorage
  blacklist: [nasaApi.reducerPath, baseNewsApi.reducerPath],
};

// NOTE: persistReducer() Управляет автоматическим сохранением данных и восстановлением данных в/из AsyncStorage
const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // NOTE:отключаю проверку сериализуемости данных для экшенов redux-persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // NOTE: подключаю middleware от RTK Query
    }).concat(nasaApi.middleware, baseNewsApi.middleware),
});

// NOTE: экспортирую persistor для компонента PersistGate (в App.tsx) - обеспечит синхронизацию UI с прогрузкой AsyncStorage
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
