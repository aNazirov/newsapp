import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IComment} from "../../interfaces";

interface IState {
  comments: IComment[];
  comment: IComment | null;
  hasMore: boolean;
}

const initialState: IState = {
  comments: [],
  comment: null,
  hasMore: false,
};

export const { actions: commentsAction, reducer: commentsReducer } = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    nullComments: (state: IState) => ({
      ...state,
      comments: [],
      hasMore: false,
    }),
    setComment: (state: IState, action: PayloadAction<{ comment: IComment | null }>) => ({
      ...state,
      ...action.payload
    }),
    setComments: (state: IState, action: PayloadAction<{ comments: IComment[], hasMore: boolean }>) => ({
      ...state,
      comments: [...state.comments, ...action.payload.comments],
      hasMore: action.payload.hasMore,
    }),
    setCommentRating: (state: IState, action: PayloadAction<{ resRating?: string, rating: number, id: number }>) => {
      const comments = state.comments.map(comment => {
        if (action.payload.id === comment.id) {
          return {
            ...comment,
            rating: action.payload.resRating ? +action.payload.resRating : comment.rating + action.payload.rating,
          };
        }
        if (comment.children?.find(com => com.id === action.payload.id)){
          return {
            ...comment,
            children: comment.children.reduce((total: IComment[], com: IComment) => {
              if (com.id === action.payload.id) return [...total, Object.assign({}, com, { rating: action.payload.resRating ? +action.payload.resRating : comment.rating + action.payload.rating })];
              return [...total, com];
            }, []),
          }
        }
        return comment
      })
      return {
        ...state,
        comments
      };
    },
    setCommentToComments: (state: IState, action: PayloadAction<{ comment: IComment }>) => {
      const comments = state.comments.reduce((total: any[], comment, i) => {
        if (action.payload.comment.parent_id === comment.id) {
          if (!comment.children) {
            return [...total, Object.assign({}, comment, {children: [action.payload.comment]})];
          }
          return [...total, Object.assign({}, comment, {children: [...comment.children, action.payload.comment]})];
        }
        if (!i && !action.payload.comment.parent_id) {
          return [action.payload.comment, comment];
        }
        return [...total, comment]
      }, [])
      return {
        ...state,
        comments: !!comments.length ? [...comments] : [action.payload.comment]
      }
    },
    deleteComment: (state: IState, action: PayloadAction<{ id: number }>) => {
      const comments = state.comments.filter(comment => comment.id !== action.payload.id)
      if (comments.length === state.comments.length) {
        return {
          ...state,
          comments: comments.map(comment => {
            if (comment.id === action.payload.id) {
              return Object.assign({}, comment, {children: comment.children.filter(comment => comment.id !== action.payload.id)})
            }
            return comment
          })
        }
      }
      return {
        ...state,
        comments
      }
    },
  },
});