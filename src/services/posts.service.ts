import {api} from "../api";

export const getMainPostsService = (params: any, lang: string = 'ru') => {
  return api.get('/main/posts', {
    params,
    headers: {
      'Accept-Language': lang,
    },
  })
    .then(res => res.data.result);
};
export const getFeedPostsService = (params: any, lang: string = 'ru') => {
  return api.get('/feed/posts', {
    params,
    headers: {
      'Accept-Language': lang,
    },
  })
    .then(res => res.data.result);
};
export const getSearchPostsService = (params: any, lang: string = 'ru') => {
  return api.post('/search', {}, {
    params,
    headers: {
      'Accept-Language': lang,
    },
  })
    .then(res => res.data.result.posts);
};
export const getAuthorsPostsService = (params: any, lang: string) => {
  return api.get('/authors/posts', {
    params,
    headers: {
      'Accept-Language': lang,
    },
  })
    .then(res => res.data.result);
};
export const getSpecialPostsService = (params: any, lang: string) => {
  return api.get('/special/posts', {
    params,
    headers: {
      'Accept-Language': lang,
    },
  })
    .then(res => res.data.result.posts);
};
export const getPostService = (slug: any, lang: string) => {
  return api.get(`/posts/${slug}`, {
    headers: {
      'Accept-Language': lang,
    },
  })
    .then(res => res.data.result);
};
export const getMorePostsService = (page: string, slug: any, lang: string, params: any) => {
  return api.get(`/${page}/${slug}/more`, {
    params,
    headers: {
      'Accept-Language': lang,
    },
  })
    .then(res => res.data.result);
};
export const getPostsSlugs = () => {
  return api.get('/posts/slugs')
    .then(res => res.data);
};
export const getHotPostsService = (params: any, lang: string) => {
  return api.get('/hot-posts', {
    ...params,
    headers: {
      'Accept-Language': lang,
    },
  })
    .then(res => res.data.result);
};