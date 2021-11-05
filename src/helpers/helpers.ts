import { postSet, postsNull } from '../store/posts/posts.thunks';
import { commentsNull } from '../store/comments/comments.thunks';
import { notificationsNull } from '../store/notifications/notifications.thunks';

export const clearStore = (dispatch: any) => {
  dispatch(commentsNull());
  dispatch(notificationsNull());
  dispatch(postsNull())
  dispatch(postSet(null))
}