import {api} from "../api";

export const getMainCategoriesService = (params: any, lang: string = 'ru') => {
  return api.get('/main/categories', {
    params,
    headers: {
      'Accept-Language': lang
    }
  })
    .then(res => res.data.result);
};
export const getCategoriesService = (params: any, slug: string, lang: string = 'ru') => {
  return api.get(`/categories/${slug}`, {
    params,
    headers: {
      'Accept-Language': lang
    }
  })
    .then(res => res.data.result);
};