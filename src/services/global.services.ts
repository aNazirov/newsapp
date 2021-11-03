import {api} from "../api";

export const getCurrenciesService = () => {
  return api.get('/main/currencies')
    .then(res => res.data.result.currencies);
};
export const getWeatherService = () => {
  return api.get('/main/weather')
    .then(res => res.data.result.weather);
};

export const getFirstData = (lang: string = 'ru') => {
  return api.get(
    '/',
    {
      headers: {
        'Accept-Language': lang,
      },
    },
  )
    .then(res => res.data);
};
export const setRating = (type: string, rating: number, id: string | number, token: string) => {
  return api.post('/add/rating', {}, {
    params: {
      type,
      rating,
      id,
    },
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.data.result.rating);
};
export const createEvent = (data: any) => {
  return api.post('/user/events', data)
    .then(res => res.data.result);
};
export const userSettings = (data: any, token: string) => {
  return api.post('/user/profile', data, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.data.result.user);
};
export const deleteComment = (id: number, token: string) => {
  return api.post(`/posts/comments/${id}/delete`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.data.result);
};
export const reportComment = (id: any, token: string) => {
  return api.post(`/posts/comments/${id}/report`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.data.result);
};
export const followToCategoryService = (id: number, token: string) => {
  return api.post(`/user/category/${id}/connect`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.data.result);
};