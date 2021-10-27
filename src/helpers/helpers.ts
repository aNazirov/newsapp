import { postsNull } from '../store/posts/posts.thunks';

export const clearStore = (dispatch: any) => {
  dispatch(postsNull())
}