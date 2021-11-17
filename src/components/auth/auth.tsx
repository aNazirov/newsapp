import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText, AppInput, ModalContainer } from '../shared';
import { blue } from '../../styles/layout.styles';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginFormOpenSet, loginStatic } from '../../store/global/global.thunks';
import { FacebookLogin } from './facebookLogin';
import { GoogleLogin } from './googleLogin';
import { GoogleLogin2 } from './google';
import { toastShow } from '../../services/notifications.service';
import { errorObject } from '../../_data/helpers';
import { website, handleOpenWithWebBrowser } from '../../helpers/helpers';

interface ITab {
  id: number;
  name: string;
  type: string;
}

const Tabs = [
  { id: 0, name: 'Войти', type: 'Войти' },
  { id: 1, name: 'Регистрация', type: 'Зарегистрироваться' },
];

interface IField {
  name: string,
  placeholder: string
}

const Fields: IField[] = [
  {
    name: 'name',
    placeholder: 'Имя',
  },
  {
    name: 'login',
    placeholder: 'Почта или номер телефона',
  },
  {
    name: 'password',
    placeholder: 'Пароль',
  },
];

export const Auth: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { control, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
  const [currentType, setCurrentType] = useState('Войти');
  const [tabs, setTabs] = useState<ITab[]>(Tabs);
  const { loginFormOpen } = useAppSelector(state => state.global);
  const handleChangeActiveTab = (tab: ITab) => {
    setTabs(tabs.map((item) => {
      if (item.id === tab.id) {
        setType(tab.type);
        return item;
      }
      return item;
    }));
  };
  const setType = (type: string) => {
    clearErrors();
    setCurrentType(type);
  };
  const onSubmit = (data: any) => {
    dispatch(loginStatic(data, currentType === 'Войти'))
      .then(() => {
        if (currentType === 'Войти') {
          return dispatch(loginFormOpenSet(false));
        }
        setType('Войти');
      })
      .catch((err: any) => {
        if (err.response?.data?.errors) {
          return Object.keys(err.response.data.errors).forEach(key => {
            setError(key, {
              type: 'required',
              message: err.response.data.errors[key][0],
            });
          });
        }
        toastShow(errorObject);
      });
  };
  return (
    <ModalContainer
      visible={loginFormOpen}
      hide={() => dispatch(loginFormOpenSet(false))}
      styleContainer={style.container}
    >
      <View style={style.tabs}>
        {
          tabs.map(tab => (
            <TouchableOpacity
              key={tab.id + tab.type}
              onPress={() => handleChangeActiveTab(tab)}
              style={{
                flex: 1,
                borderBottomWidth: 2,
                borderBottomColor: currentType === tab.type ? blue : 'transparent',
              }}
            >
              <AppText
                style={{
                  ...style.tab,
                  color: currentType === tab.type ? '#000' : 'rgba(0, 0, 0, .7)',
                }}
              >
                {t(tab.name)}
              </AppText>
            </TouchableOpacity>
          ))
        }
      </View>
      {
        Fields.map(field => {
          if (currentType === 'Войти' && field.name === 'name') return null;
          return (
            <AppInput
              key={field.name}
              control={control}
              name={field.name}
              placeholder={t(field.placeholder)}
              style={style.textInput}
              error={errors[field.name]}
            />
          );
        })
      }
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
      >
        <AppText style={style.submit}>{t(currentType)}</AppText>
      </TouchableOpacity>
      <AppText style={{ ...style.text, color: blue }}>{t('Забыли пароль')}?</AppText>
      <AppText style={{ ...style.text, color: 'rgba(0, 0, 0, .7)' }}>{t('Войти через соц-сети')}</AppText>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <FacebookLogin />
        <View style={{ width: 15 }} />
        <GoogleLogin />
      </View>
      <GoogleLogin2 />
      <AppText style={{ ...style.text, color: 'rgba(0, 0, 0, .7)', marginBottom: 0, textAlign: 'left' }}>
        {t('Нажимая “Войти” вы соглашаетесь с ')}
        <TouchableOpacity onPress={handleOpenWithWebBrowser(`${website}/privacy`)}><AppText style={{ textDecorationLine: 'underline' }}>политикой конфиденциальности</AppText></TouchableOpacity>
      </AppText>
    </ModalContainer>
  );
};

const style = StyleSheet.create({
  container: {
    width: '90%',
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderRadius: 7,
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'roboto-medium',
    paddingBottom: 10,
  },
  textInput: {
    backgroundColor: '#f3f3f3',
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 9,
    fontFamily: 'roboto-regular',
    fontSize: 14,
    marginBottom: 15,
  },
  submit: {
    backgroundColor: blue,
    color: '#fff',
    textAlign: 'center',
    borderRadius: 7,
    paddingVertical: 12,
    fontFamily: 'roboto-bold',
    fontSize: 14,
    lineHeight: 16,
    marginBottom: 15,
  },
  text: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 15,
  },
});