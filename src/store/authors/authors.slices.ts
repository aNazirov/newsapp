import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IUser} from "../../interfaces";

interface IState {
  authors: IUser[];
  author: IUser | null;
  hasMore: boolean;
}

const initialState: IState = {
  authors: [],
  author: null,
  hasMore: false,
};

export const { actions: authorsAction, reducer: authorsReducer } = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    setAuthors: (state: IState, action: PayloadAction<{ authors: IUser[], hasMore: boolean }>) => ({
      ...state,
      ...action.payload,
    }),
    setAuthor: (state: IState, action: PayloadAction<{ author: IUser | null }>) => ({
      ...state,
      ...action.payload,
    }),
  }
});