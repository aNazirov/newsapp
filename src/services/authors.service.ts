import {api} from "../api";

export const getAuthorService = (params: any, id: number, lang: string = 'ru') => {
  return api.get(`/authors/${id}`, {
    params,
    headers: {
      'Accept-Language': lang
    }
  })
    .then(res => res.data.result);
};