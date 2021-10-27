import {AppThunk} from "../index";
import {tagsAction} from "./tags.slices";
import {getTagService} from "../../services/tags.service";
import {postsSet} from "../posts/posts.thunks";

export const tagSet = (tag: any): AppThunk => (dispatch: any) => {
  dispatch(tagsAction.setTag({ tag }));
};
export const getTag = (params: any = {}, slug: any, lang: string, ): AppThunk => async (dispatch: any) => {
  return getTagService(params, slug, lang)
    .then(({tag, posts}) => {
      dispatch(tagSet(tag));
      dispatch(postsSet(posts));
    })
};