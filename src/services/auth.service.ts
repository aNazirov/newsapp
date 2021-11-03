import {api} from "../api";

export const googleAuthenticate = (token: string) => {
  return api.post('/auth/google', {}, {
    headers: {
      'ID-TOKEN': token,
    },
  })
    .then(res => res.data.result);
};
export const facebookAuthenticate = (user: any) => {
  return api.post('/auth/facebook', {
    email: user._profile.email,
    name: user._profile.name,
    profilePicURL: user._profile.profilePicURL,
  }, {
    headers: {
      'ID-TOKEN': user._profile.id,
      'ACCESS-TOKEN': user._token.accessToken,
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