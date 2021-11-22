import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICurrency, INotification, IUser, IWeather } from '../../interfaces';

interface IState {
  token: string | null;
  currencies: ICurrency[];
  weather: IWeather[];
  user: IUser | null;
  loginFormOpen: boolean;
  eventFormOpen: boolean;
  commentFormOpen: boolean;
  reportFormOpen: boolean;
  lang: 'ru' | 'uz';
}

const initialState: IState = {
  token: null,
  currencies: [],
  weather: [],
  user: null,
  loginFormOpen: false,
  eventFormOpen: false,
  commentFormOpen: false,
  reportFormOpen: false,
  lang: 'ru',
};

export const { actions: globalAction, reducer: globalReducer } = createSlice({
  name: 'global',
  initialState,
  reducers: {
    logIn: (state: IState, action: PayloadAction<{ token: string | null, user: IUser | null }>) => ({
      ...state,
      token: action.payload.token,
      user: action.payload.user,
    }),
    logOut: (state: IState) => ({
      ...state,
      token: null,
      expired_at: null,
      user: null,
    }),
    setReportFormOpen: (state: IState, action: PayloadAction<{ reportFormOpen: boolean }>) => ({
      ...state,
      reportFormOpen: action.payload.reportFormOpen,
    }),
    setUser: (state, action: PayloadAction<{ user: IUser | null }>) => ({
      ...state,
      ...action.payload,
    }),
    setLoginFormOpen: (state: IState, action: PayloadAction<{ loginFormOpen: boolean }>) => ({
      ...state,
      ...action.payload,
    }),
    setEventFormOpen: (state: IState, action: PayloadAction<{ eventFormOpen: boolean }>) => ({
      ...state,
      ...action.payload,
    }),
    setCommentFormOpen: (state: IState, action: PayloadAction<{ commentFormOpen: boolean }>) => ({
      ...state,
      ...action.payload,
    }),
    setCurrencies: (state: IState, action: PayloadAction<{ currencies: ICurrency[] }>) => ({
      ...state,
      ...action.payload,
    }),
    setWeather: (state: IState, action: PayloadAction<{ weather: IWeather[] }>) => ({
      ...state,
      ...action.payload,
    }),
    setNotification: (state, action: PayloadAction<INotification>) => ({
      ...state,
      ...action.payload,
    }),
    setLang: (state, action: PayloadAction<{ lang: 'ru' | 'uz' }>) => ({
      ...state,
      ...action.payload,
    }),
  },
});