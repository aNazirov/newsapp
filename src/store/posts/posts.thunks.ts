import {AppThunk} from "../index";
import {postsAction} from "./posts.slices";
import {
  getAuthorsPostsService,
  getFeedPostsService, getHotPostsService,
  getMainPostsService, getMorePostsService, getPostService,
  getSearchPostsService, getSpecialPostsService
} from "../../services/posts.service";
import {authorsSet} from "../authors/authors.thunks";

export const postsSet = (res: any): AppThunk => (dispatch: any) => {
  dispatch(postsAction.setPosts({
    posts: res.posts,
    pageCount: res.pages_count,
    postsCount: res.posts_count || 0,
  }));
};
export const postSet = (post: any): AppThunk => (dispatch: any) => {
  dispatch(postsAction.setPost({ post }));
};
export const postRatingSet = (resRating: string | undefined, rating: number): AppThunk => (dispatch: any) => {
  dispatch(postsAction.setPostRating({ resRating ,rating }));
};
export const postsNull = (): AppThunk => (dispatch: any) => {
  dispatch(postsAction.nullPosts());
};
export const hotPostsSet = (hotPosts: any): AppThunk => (dispatch: any) => {
  dispatch(postsAction.setHotPosts({ hotPosts }));
};
export const getMainPosts = (params: any, lang: string): AppThunk => async (dispatch: any) => {
  return getMainPostsService(params, lang)
    .then(res => dispatch(postsSet(res)))
};
export const getFeedPosts = (params: any, lang: string): AppThunk => async (dispatch: any) => {
  return getFeedPostsService(params, lang)
    .then(res => dispatch(postsSet(res)))
};
export const getSearchPosts = (params: any, lang: string): AppThunk => async (dispatch: any) => {
  return getSearchPostsService(params, lang)
    .then((posts) => {
      dispatch(postsSet(posts));
    })
};
export const getAuthorsPosts = (params: any, lang: string): AppThunk => async (dispatch: any) => {
  return getAuthorsPostsService(params, lang)
    .then(({posts, authors}) => {
      dispatch(postsSet(posts))
      dispatch(authorsSet({ authors: authors.data, has_more: authors.has_more }))
    })
};
export const getSpecialPosts = (params: any, lang: string): AppThunk => async (dispatch: any) => {
  return getSpecialPostsService(params, lang)
    .then(posts => dispatch(postsSet(posts)))
};
export const getMorePosts = (page: string, slug: any, params: any = {}, lang: string): AppThunk => async (dispatch: any) => {
  return getMorePostsService(page, slug, lang, params)
    .then(res => dispatch(postsSet(res)))
};
export const getPost = (slug: string, lang: string): AppThunk => async (dispatch: any) => {
  return getPostService(slug, lang)
    .then((post) => {
      dispatch(postSet(post))
    })
};
export const getHotPosts = (params: any, lang: string): AppThunk => async (dispatch: any) => {
  return getHotPostsService(params, lang)
    .then(({ hot_posts, range }) => dispatch(hotPostsSet({hotPosts: hot_posts, range})))
};