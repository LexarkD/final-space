import { createSlice } from '@reduxjs/toolkit';
import { extendedNewsPreviewApi } from '../../api/extendedNewsPreviewApi';
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
      extendedNewsPreviewApi.endpoints.getNewsPreview.matchFulfilled,
      (state, action) => {
        state.article = action.payload;
      },
    );
  },
});

export const selectNewsPreview = (state: RootState) =>
  state.newsPreview.article;
export default newsPreviewSlice.reducer;
