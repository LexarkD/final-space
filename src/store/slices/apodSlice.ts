import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store.ts';
import type { APODResponse } from '../../types/apod.ts';
import { nasaApi } from '../../api/nasaApi.ts';

type APODState = {
  lastSavedAPOD: APODResponse | null;
};

const initialState: APODState = {
  lastSavedAPOD: null,
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
        state.lastSavedAPOD = action.payload;
      },
    );
  },
});

export const selectLastAPOD = (state: RootState): APODState['lastSavedAPOD'] =>
  state.apod.lastSavedAPOD;

export const selectLastAPODUrl = (state: RootState): string | undefined => {
  const apod = state.apod.lastSavedAPOD;
  if (!apod) {
    return undefined;
  }
  return apod.media_type === 'video' ? apod.thumbnail_url : apod.url;
};

export default apodSlice.reducer;
