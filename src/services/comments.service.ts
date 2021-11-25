import { api } from '../api';

export const getPostCommentsService = (slug: string, lang: string = 'ru', params: any) => {
  return api.get(`/posts/${slug}/comments`, {
    params,
    headers: {
      'Accept-Language': lang,
    },
  })
    .then(res => res.data.result.comments);
};
export const getUserCommentsService = (params: any, token: string) => {
  return api.get(`/user/comments`, {
    params,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.data.result.comments);
};

export const createCommentService = (data: any, token: string) => {
  return api.post(`/mobile/comments`, data, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.data.result.comment);
};