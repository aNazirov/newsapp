import { postSet, postsNull } from '../store/posts/posts.thunks';
import { commentsNull } from '../store/comments/comments.thunks';
import { notificationsNull } from '../store/notifications/notifications.thunks';
import * as WebBrowser from 'expo-web-browser';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../api';

export const clearStore = (dispatch: any) => {
  dispatch(commentsNull());
  dispatch(notificationsNull());
  dispatch(postsNull());
  dispatch(postSet(null));
};
export const website = 'https://front.djomi.uz';

export const handleOpenWithWebBrowser = (url: string) => () => {
  WebBrowser.openBrowserAsync(url);
};

export async function sendPushNotification(expoPushToken: string | undefined) {
  if (!expoPushToken) return;
  await api.post('/mobile/notification/create', { token: expoPushToken });
}

interface IContent {
  title: string,
  body: string,
  data: any,
}

export async function schedulePushNotification(content: IContent) {
  await Notifications.scheduleNotificationAsync({
    content,
    trigger: { },
  });
}

export async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  if (token) AsyncStorage.setItem('expoPushToken', token);
  return token;
}
