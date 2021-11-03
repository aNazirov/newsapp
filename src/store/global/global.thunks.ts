import { globalAction } from './global.slices';
import { ICurrency, IUser } from '../../interfaces';
import {
  facebookAuthenticate,
  getMe,
  googleAuthenticate,
  staticAuthenticate,
  telegramAuthenticate,
} from '../../services/auth.service';
import { getNotificationsCount } from '../notifications/notifications.thunks';
import { followToCategoryService, getFirstData } from '../../services/global.services';
import { categoriesSet } from '../categories/categories.thunks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { toastShow } from '../../services/notifications.service';
import { errorObject } from '../../_data/helpers';

export const loginFormOpenSet = (open: boolean) => (dispatch: any) => {
  dispatch(globalAction.setLoginFormOpen({ loginFormOpen: open }));
};
export const userSet = (user: IUser) => (dispatch: any) => {
  dispatch(globalAction.setUser({ user }));
};
export const langSet = (lang: 'ru' | 'uz') => async (dispatch: any) => {
  AsyncStorage.setItem('lang', lang)
    .catch(() => toastShow(errorObject));
  dispatch(globalAction.setLang({ lang }));
  i18n.changeLanguage(lang);
};
export const currenciesSet = (currencies: ICurrency[]) => (dispatch: any) => {
  dispatch(globalAction.setCurrencies({ currencies }));
};
export const weatherSet = (weather: any) => (dispatch: any) => {
  dispatch(globalAction.setWeather({ weather }));
};
export const login = (res: any) => (dispatch: any) => {
  AsyncStorage.setItem('token', res.token)
    .catch(() => toastShow(errorObject));
  dispatch(globalAction.logIn({ ...res }));
};
export const autoLogin = () => async (dispatch: any) => {
  return AsyncStorage.getItem('token')
    .then(token => {
      if (token) {
        return getMe(token)
          .then(user => dispatch(globalAction.logIn({ token, user })))
          .then(() => dispatch(getNotificationsCount(token)))
          .catch(() => {
            toastShow({ ...errorObject, message: 'Ваш токен истек, войдите заного' })
            dispatch(logout());
          });
      }
      dispatch(logout());
    });
};
export const logout = () => (dispatch: any) => {
  AsyncStorage.removeItem('token')
    .catch(() => toastShow(errorObject));
  dispatch(globalAction.logOut());
};

export const followToCategory = (id: number, token: string) => (dispatch: any) => {
  return followToCategoryService(id, token)
    .then(() => dispatch(autoLogin()));
};
export const loginViaGoogle = (token: string) => (dispatch: any) => {
  return googleAuthenticate(token)
    .then((res: any) => dispatch(login(res)));
};
export const loginViaFacebook = (user: any) => (dispatch: any) => {
  return facebookAuthenticate(user)
    .then((res: any) => dispatch(login(res)));
};
export const loginViaTelegram = (user: any) => (dispatch: any) => {
  return telegramAuthenticate(user)
    .then((res: any) => dispatch(login(res)));
};
export const loginStatic = (user: any, isLogin: boolean) => (dispatch: any) => {
  return staticAuthenticate(user, isLogin)
    .then((res: any) => dispatch(login(res)));
};
export const getGlobalData = (lang?: string) => (dispatch: any) => {
  return getFirstData(lang || 'ru')
    .then(res => {
      dispatch(categoriesSet(res.categories));
      dispatch(weatherSet(res.weather));
      dispatch(currenciesSet(res.currencies));
    });
};