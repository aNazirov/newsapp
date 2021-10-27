import {api} from "../api";

export const getTagService = (params: any, slug: number, lang: string = 'ru') => {
  return api.get(`/tags/${slug}`, {
    params,
    headers: {
      'Accept-Language': lang
    }
  })
    .then(res => res.data.result);
};