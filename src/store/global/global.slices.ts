import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ICurrency, INotification, IUser, IWeather} from "../../interfaces";

interface IState {
  token: string | null;
  currencies: ICurrency[];
  weather: IWeather[];
  user: IUser | null;
  loginFormOpen: boolean;
  notification: { message: string; success: boolean | null }
}

const initialState: IState = {
  token: null,
  currencies: [],
  weather: [],
  user: null,
  loginFormOpen: false,
  notification: {
    message: '',
    success: null
  }
};

export const { actions: globalAction, reducer: globalReducer } = createSlice({
  name: 'global',
  initialState,
  reducers: {
    logIn: (state: IState, action: PayloadAction<{ token: string | null, user: IUser | null}>) => ({
      ...state,
      token: action.payload.token,
      user: action.payload.user,
    }),
    logOut: (state: IState) => ({
      ...state,
      token: null,
      expired_at: null,
      user: null
    }),
    setUser: (state, action: PayloadAction<{ user: IUser | null }>) => ({
      ...state,
      user: action.payload.user,
    }),
    setLoginFormOpen: (state: IState, action: PayloadAction<{ loginFormOpen: boolean }>) => ({
      ...state,
      loginFormOpen: action.payload.loginFormOpen,
    }),
    setCurrencies: (state: IState, action: PayloadAction<{ currencies: ICurrency[] }>) => ({
      ...state,
      currencies: action.payload.currencies,
    }),
    setWeather: (state: IState, action: PayloadAction<{ weather: IWeather[] }>) => ({
      ...state,
      weather: action.payload.weather,
    }),
    setNotification: (state, action: PayloadAction<INotification>) => ({
      ...state,
      notification: action.payload,
    }),
  },
});