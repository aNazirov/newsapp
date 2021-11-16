import { postSet, postsNull } from '../store/posts/posts.thunks';
import { commentsNull } from '../store/comments/comments.thunks';
import { notificationsNull } from '../store/notifications/notifications.thunks';
import * as WebBrowser from 'expo-web-browser';

export const clearStore = (dispatch: any) => {
  dispatch(commentsNull());
  dispatch(notificationsNull());
  dispatch(postsNull())
  dispatch(postSet(null))
}
export const website = 'https://uznews.uz'

export const handleOpenWithWebBrowser = (url: string) => () => {
  WebBrowser.openBrowserAsync(url);
};