import {globalAction} from "./global.slices";
import {ICurrency, INotification, IUser} from "../../interfaces";
import {
  facebookAuthenticate,
  getMe,
  googleAuthenticate,
  staticAuthenticate,
  telegramAuthenticate
} from "../../services/auth.service";
import {getNotificationsCount} from "../notifications/notifications.thunks";
import { followToCategoryService, getFirstData } from '../../services/global.services';
import { categoriesSet } from '../categories/categories.thunks';
import { commentsSet } from '../comments/comments.thunks';

export const loginFormOpenSet = (open: boolean) => (dispatch: any) => {
  dispatch(globalAction.setLoginFormOpen({ loginFormOpen: open }));
};
export const userSet = (user: IUser) => (dispatch: any) => {
  dispatch(globalAction.setUser({ user }));
};
export const langSet = (lang: 'ru' | 'uz') => (dispatch: any) => {
  dispatch(globalAction.setLang({ lang }));
};
export const currenciesSet = (currencies: ICurrency[]) => (dispatch: any) => {
  dispatch(globalAction.setCurrencies({ currencies }));
};
export const weatherSet = (weather: any) => (dispatch: any) => {
  dispatch(globalAction.setWeather({ weather }));
};
export const login = (res: any) => (dispatch: any) => {
  // setCookie('token', res.token);
  dispatch(globalAction.logIn({ ...res }));
};
export const autoLogin = (token?: string) => async (dispatch: any) => {
  if (token) {
    return getMe(token)
      .then(user => dispatch(globalAction.logIn({ token, user })))
      .then(() => dispatch(getNotificationsCount(token)));
  }
};
export const logout = (res?: any) => (dispatch: any) => {
  if (res) {
    res.setHeader('Set-Cookie', 'token=deleted; path=/; Max-Age=-1');
  } else {
    // deleteCookie('token');
  }
  dispatch(globalAction.logOut());
};

export const followToCategory = (id: number) => (dispatch: any) => {
  return followToCategoryService(id)
    .then(() => dispatch(autoLogin('token')));
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
export const setNotification = (notification: INotification) => (dispatch: any) => {
  dispatch(globalAction.setNotification(notification));
};
export const getGlobalData = (lang?: string) => (dispatch: any) =>  {
  return getFirstData(lang || 'ru')
    .then(res => {
      dispatch(categoriesSet(res.categories));
      dispatch(commentsSet(res.comments));
      dispatch(weatherSet(res.weather));
      dispatch(currenciesSet(res.currencies));
    });
}