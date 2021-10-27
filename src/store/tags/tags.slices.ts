import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ITag} from "../../interfaces";

interface IState {
  tag: ITag | null;
}

const initialState: IState = {
  tag: null,
};

export const { actions: tagsAction, reducer: tagsReducer } = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTag: (state: IState, action: PayloadAction<{ tag: ITag | null }>) => ({
      ...state,
      ...action.payload
    }),
  },
});