import {AppThunk} from "../index";
import {commentsAction} from "./comments.slices";
import {IComment} from "../../interfaces";
import {getPostCommentsService, getUserCommentsService} from "../../services/comments.service";

export const commentsSet = (res: any): AppThunk => (dispatch: any) => {
  dispatch(commentsAction.setComments({
    comments: res.data,
    hasMore: res.has_more,
  }));
};

export const commentRatingSet = (resRating: string | undefined, rating: number, id: any): AppThunk => (dispatch: any) => {
  dispatch(commentsAction.setCommentRating({ resRating, rating, id }));
};
export const commentSet = (comment: IComment): AppThunk => (dispatch: any) => {
  dispatch(commentsAction.setComment({ comment }));
};
export const commentDeleteAction = (id: number): AppThunk => (dispatch: any) => {
  dispatch(commentsAction.deleteComment({ id }));
};
export const commentsNull = (): AppThunk => (dispatch: any) => {
  dispatch(commentsAction.nullComments());
};
export const getPostComments = (slug: any, lang: string, params: any = {}): AppThunk => async (dispatch: any) => {
  return getPostCommentsService(slug, lang, params)
    .then(res => dispatch(commentsSet(res)));
};
export const getUserComments = (params: any = {}, token: string = ''): AppThunk => async (dispatch: any) => {
  return getUserCommentsService(params, token)
    .then(comments => dispatch(commentsSet(comments)))
};