import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotification } from '../../interfaces';

interface IState {
  notifications: INotification[];
  alertNotifications: INotification[];
  notificationsCount: number;
  hasMore: boolean;
}

const initialState: IState = {
  notifications: [],
  alertNotifications: [],
  notificationsCount: 0,
  hasMore: false,
};

export const { actions: notificationsAction, reducer: notificationsReducer } = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    nullNotifications: (state: IState) => ({
      ...state,
      notifications: [],
      hasMore: false,
    }),
    setNotifications: (state: IState, action: PayloadAction<{ notifications: INotification[], hasMore: boolean }>) => ({
      ...state,
      notifications: [...state.notifications, ...action.payload.notifications],
      hasMore: action.payload.hasMore,
    }),
    setAlertNotifications: (state: IState, action: PayloadAction<{ alertNotifications: INotification[] }>) => ({
      ...state,
      alertNotifications: action.payload.alertNotifications,
    }),
    setNotificationsCount: (state: IState, action: PayloadAction<{ notificationsCount: number }>) => ({
      ...state,
      ...action.payload,
    }),
  },
});