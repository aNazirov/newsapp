import {api} from "../api";
import Toast from 'react-native-toast-message';

export const getNotificationsService = (params: any, token: string) => {
  return api.get(`/user/notifications`, {
    params,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.data.result.notifications)
};
export const getAlertNotificationsService = (token: string) => {
  return api.get(`/user/alert/notifications`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.data.result.notifications.data)
};
export const getNotificationsCountService = (token: string) => {
  return api.get(`/user/alert/notifications/count`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.data.result.notifications.data)
};

interface IToast {
  type: 'success' | 'error' | 'info',
  title: string,
  message: string,
}

export const toastShow = ({type, title ,message}: IToast) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    topOffset: 35,
    bottomOffset: 40,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
  });
}