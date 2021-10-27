import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ICategory} from "../../interfaces";

interface IState {
  categories: ICategory[];
  category: ICategory | null;
  hasMore: boolean;
}

const initialState: IState = {
  categories: [],
  category: null,
  hasMore: false,
};

export const { actions: categoriesAction, reducer: categoriesReducer } = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state: IState, action: PayloadAction<{ categories: ICategory[], hasMore: boolean }>) => ({
      ...state,
      ...action.payload,
    }),
    setCategory: (state: IState, action: PayloadAction<{ category: ICategory }>) => ({
      ...state,
      ...action.payload,
    }),
  },
});