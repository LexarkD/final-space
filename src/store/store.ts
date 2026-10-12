import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { nasaApi } from '../api/nasaApi.ts';
import { baseNewsApi } from '../api/baseNewsApi.ts';

const combinedReducer = combineReducers({
  [nasaApi.reducerPath]: nasaApi.reducer,
  [baseNewsApi.reducerPath]: baseNewsApi.reducer,
});
export const store = configureStore({
  reducer: combinedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(nasaApi.middleware, baseNewsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
