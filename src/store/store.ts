import { configureStore } from '@reduxjs/toolkit';
import { nasaApi } from '../api/nasaApi';
import { baseNewsApi } from '../api/baseNewsApi';

export const store = configureStore({
  reducer: {
    [nasaApi.reducerPath]: nasaApi.reducer,
    [baseNewsApi.reducerPath]: baseNewsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(nasaApi.middleware, baseNewsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
