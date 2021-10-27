import {AppThunk} from "../index";
import {notificationsAction} from "./notifications.slices";
import {INotificationState} from "../../interfaces";
import {
  getAlertNotificationsService,
  getNotificationsCountService,
  getNotificationsService
} from "../../services/notifications.service";

export const notificationsSet = (res: any): AppThunk => (dispatch: any) => {
  dispatch(notificationsAction.setNotifications({
    notifications: res.data,
    hasMore: res.has_more,
  }));
};
export const alertNotificationsSet = (alertNotifications: INotificationState[]): AppThunk => (dispatch: any) => {
    dispatch(notificationsAction.setAlertNotifications({ alertNotifications }));
  }
;

export const notificationsCountSet = (notificationsCount: number): AppThunk => (dispatch: any) => {
  dispatch(notificationsAction.setNotificationsCount({ notificationsCount }));
};
export const notificationsNull = (): AppThunk => (dispatch: any) => {
  dispatch(notificationsAction.nullNotifications());
};
export const getNotifications = (params: any = {}, token: string = ''): AppThunk => async (dispatch: any) => {
  return getNotificationsService(params, token)
    .then(res => dispatch(notificationsSet(res)));
};
export const getAlertNotifications = (): AppThunk => async (dispatch: any) => {
  return getAlertNotificationsService()
    .then(notifications => dispatch(alertNotificationsSet(notifications)));
};
export const getNotificationsCount = (token: string = ''): AppThunk => async (dispatch: any) => {
  return getNotificationsCountService(token)
    .then(count => dispatch(notificationsCountSet(count)));
};
