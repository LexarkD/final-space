import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store.ts';
import type { APODResponse } from '../../types/apod.ts';
import { nasaApi } from '../../api/nasaApi.ts';

type ApodState = {
  lastSavedPhoto: APODResponse | null;
};

const initialState: ApodState = {
  lastSavedPhoto: null,
};

export const apodSlice = createSlice({
  name: 'apod',
  initialState,
  reducers: {},
  // NOTE: Поле extraReducers позволяет createSlice реагировать и обновлять свое собственное состояние в ответ на другие типы действий, помимо тех, которые он сгенерировал.
  extraReducers: builder => {
    // NOTE: addMatcher принимает 2 аргумента : 1)экшен функция предикат 2) reducer. addMatcher автоматически отлавливает экшен matchFulfilled и выполняет reducer
    builder.addMatcher(
      // NOTE: fulfilled - экшен жизненного цикла запроса(запрос успешно завершен, данные получены).
      // NOTE: matchFulfilled экшен функция предикат возвращает boolean значение и автоматически подтягивает тип APODResponse.
      nasaApi.endpoints.getApod.matchFulfilled,
      // NOTE: reducer
      (state, action) => {
        state.lastSavedPhoto = action.payload;
      },
    );
  },
});

export const selectLastPhoto = (
  state: RootState,
): ApodState['lastSavedPhoto'] => state.apod.lastSavedPhoto;

export default apodSlice.reducer;
