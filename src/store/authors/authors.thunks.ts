import {AppThunk} from "../index";
import {authorsAction} from "./authors.slices";
import {getMainCategoriesService} from "../../services/categories.service";
import {getAuthorService} from "../../services/authors.service";
import {postsSet} from "../posts/posts.thunks";

export const authorsSet = (res: any): AppThunk => (dispatch: any) => {
  dispatch(authorsAction.setAuthors({
    authors: res.authors,
    hasMore: res.has_more || false,
  }));
};
export const authorSet = (author: any): AppThunk => (dispatch: any) => {
  dispatch(authorsAction.setAuthor({ author }));
};
export const getAuthors = (params: any, lang: string): AppThunk => async (dispatch: any) => {
  return getMainCategoriesService(params, lang)
    .then(res => dispatch(authorsSet(res)))
};
export const getAuthor = (params: any = {}, id: number, lang: string): AppThunk => async (dispatch: any) => {
  return getAuthorService(params, id, lang)
    .then(({author, posts}) => {
      dispatch(authorSet(author));
      dispatch(postsSet(posts));
    })
};