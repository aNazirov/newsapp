import {api} from "../api";

export const googleAuthenticate = (token: string) => {
  return api.post('/auth/google', {}, {
    headers: {
      'ACCESS-TOKEN': token,
    },
  })
    .then(res => res.data.result);
};
export const facebookAuthenticate = (token: string) => {
  return api.post('/auth/facebook', {}, {
    headers: {
      'ACCESS-TOKEN': token,
    },
  })
    .then(res => res.data.result);
};
export const telegramAuthenticate = (user: any) => {
  return api.post('/auth/telegram', { ...user })
    .then(res => res.data.result);
};
export const staticAuthenticate = (user: any, isLogin: boolean) => {
  return api.post(`/auth/${isLogin ? 'login' : 'register'}`, { ...user })
    .then(res => res.data.result);
};
export const getMe = (token: string) => {
  return api.get('/auth/me', {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(res => res.data.result.user);
};