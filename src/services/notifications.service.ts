import {api} from "../api";

export const getNotificationsService = (params: any, token: string) => {
  return api.get(`/user/notifications`, {
    params,
    headers: {
      // 'Authorization': `Bearer ${token ? token : getCookie('token', document.cookie)}`,
    },
  })
    .then(res => res.data.result.notifications)
};
export const getAlertNotificationsService = () => {
  return api.get(`/user/alert/notifications`, {
    headers: {
      // 'Authorization': `Bearer ${getCookie('token', document.cookie)}`,
    },
  })
    .then(res => res.data.result.notifications.data)
};
export const getNotificationsCountService = (token: string) => {
  return api.get(`/user/alert/notifications/count`, {
    headers: {
      // 'Authorization': `Bearer ${token ? token : getCookie('token', document.cookie)}`,
    },
  })
    .then(res => res.data.result.notifications.data)
};
