import {AppThunk} from "../index";
import {categoriesAction} from "./categories.slices";
import {getCategoriesService, getMainCategoriesService} from "../../services/categories.service";
import {postsSet} from "../posts/posts.thunks";

export const categoriesSet = (res: any): AppThunk => (dispatch: any) => {
  dispatch(categoriesAction.setCategories({
    categories: res.categories,
    hasMore: res.has_more,
  }));
};
export const categorySet = (category: any): AppThunk => (dispatch: any) => {
  dispatch(categoriesAction.setCategory({ category }));
};
export const getMainCategories = (params: any, lang: string): AppThunk => async (dispatch: any) => {
  return getMainCategoriesService(params, lang)
    .then(res => dispatch(categoriesSet(res)))
};
export const getCategory = (params: any = {}, slug: string, lang: string): AppThunk => async (dispatch: any) => {
  return getCategoriesService(params, slug, lang)
    .then(({category, posts}) => {
      dispatch(categorySet(category));
      dispatch(postsSet(posts));
    })
};