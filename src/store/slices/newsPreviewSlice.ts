import { createSlice } from '@reduxjs/toolkit';
import { newsPreviewApi } from '../../api/newsPreviewApi';
import { ArticleRead } from '../../types/newsApiType';
import type { RootState } from '../store';

interface NewsPreviewState {
  article: ArticleRead | null;
}

const initialState: NewsPreviewState = {
  article: null,
};

export const newsPreviewSlice = createSlice({
  name: 'newsPreview',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      // NOTE: Тут используется семантически отделенный запрос newsPreviewApi, чтоб таргетно повесить слушатель именно для него
      newsPreviewApi.endpoints.getNewsPreview.matchFulfilled,
      (state, action) => {
        state.article = action.payload;
      },
    );
  },
});

//NOTE: Хук useAppSelector(selectNewsPreview) - вернет персистентные данные из store для UI. В отличии от useGetNewsPreviewQuery - он является тригером сетевого запроса и возвращает временные служебные данные из служебной ветки Redux Store
export const selectNewsPreview = (state: RootState) =>
  state.newsPreview.article;

//NOTE: newsPreviewSlice.reducer хранит логику обновления данных в слайсе. Ловит экшен для обновления персистентных данных в store -> state.newsPreview
export default newsPreviewSlice.reducer;
