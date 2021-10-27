import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IPost} from "../../interfaces";

interface Post {
  type: string;
  data: IPost[];
}
interface HotPosts {
  hotPosts: IPost[];
  range: string
}

interface IState {
  posts: Post[];
  post: IPost | null;
  hotPosts: HotPosts | null;
  pageCount: number;
  postsCount: number;
}

const initialState: IState = {
  posts: [],
  post: null,
  hotPosts: null,
  pageCount: 0,
  postsCount: 0,
};

export const { actions: postsAction, reducer: postsReducer } = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    nullPosts: (state: IState) => ({
      ...state,
      posts: [],
      pageCount: 0,
      postsCount: 0,
    }),
    setPosts: (state: IState, action: PayloadAction<{ posts: Post[], pageCount: number, postsCount: number }>) => ({
      ...state,
      posts: [...state.posts, ...action.payload.posts],
      pageCount: action.payload.pageCount,
      postsCount: action.payload.postsCount,
    }),
    setPost: (state: IState, action: PayloadAction<{ post: IPost | null }>) => ({
      ...state,
      ...action.payload,
    }),
    setHotPosts: (state: IState, action: PayloadAction<{ hotPosts: HotPosts | null }>) => ({
      ...state,
      ...action.payload,
    }),
    setPostRating: (state: IState, action: PayloadAction<{ resRating?: string, rating: number }>) => {
      if (state.post) {
        return {
          ...state,
          post: {...state.post, rating: action.payload.resRating ? +action.payload.resRating : +state.post.rating + action.payload.rating}
        };
      }
      return {
        ...state
      }
    }
  },
});