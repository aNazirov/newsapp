import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppCheckbox, AppInput, AppText } from '../../components/shared';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { headerStyles } from '../../styles/header.styles';
import { deleteImage, userSettings } from '../../services/global.services';
import { toastShow } from '../../services/notifications.service';
import { errorObject } from '../../_data/helpers';
import { blue, red } from '../../styles/layout.styles';
import { userSet } from '../../store/global/global.thunks';
import * as ImagePicker from 'expo-image-picker';
import { AxiosError } from 'axios';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

interface IField {
  name: 'name' | 'about_me' | 'email' | 'phone' | 'comment_replies_notification' | 'comment_rating_notification' | 'special_report_notification',
  placeholder: string
}

const Fields: IField[] = [
  {
    name: 'name',
    placeholder: 'Имя',
  },
  {
    name: 'about_me',
    placeholder: 'Обо мне',
  },
  {
    name: 'email',
    placeholder: 'Email',
  },
  {
    name: 'phone',
    placeholder: 'Телефон',
  },
];

const Checkboxs: IField[] = [
  {
    name: 'comment_replies_notification',
    placeholder: 'Ответы на мои комментарии',
  },
  {
    name: 'comment_rating_notification',
    placeholder: 'Оценка моего комментария',
  },
  {
    name: 'special_report_notification',
    placeholder: 'Срочные новости',
  },
];

export const Settings: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const { control, handleSubmit, formState: { errors }, setError } = useForm();
  const { user, token } = useAppSelector(state => state.global);

  const dispatch = useAppDispatch()
  if (!user) return <></>;

  const [avatar, setAvatar] = useState<any>({ uri: user.avatar });

  const imageRemove = () => {
    deleteImage(token!)
      .then(() => {
        setAvatar('');
        toastShow({type: 'success', title: '', message: 'Изображение удалено'})
      })
      .catch((err: AxiosError) => toastShow({ ...errorObject, message: err.response?.data?.message }))
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setAvatar(result);
    }
  };

  const editUserSettings = (data: any) => {
    if (avatar['base64']) data = Object.assign({avatar: avatar['base64']}, data)
    userSettings({ ...data, is_mobile: true }, token!)
      .then(user => {
        dispatch(userSet(user))
        navigation.navigate('Profile');
        toastShow({ type: 'success', title: 'Успешно', message: 'Изменения успешно сохранены' });
      })
      .catch(err => {
        if (err.response?.data?.errors) {
          return Object.keys(err.response.data.errors).forEach(key => {
            setError(key, {
              type: 'required',
              message: err.response.data.errors[key][0],
            });
          });
        }
        return toastShow({ ...errorObject, message: err.response?.data?.message });
      });

  };
  return (
    <ScrollView>
      <View style={{ ...style.container, marginBottom: 20 }}>
        <Image source={{ uri: avatar.uri }} style={style.avatar} />
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <TouchableOpacity
            style={{ ...style.button, backgroundColor: 'rgba(0, 0, 0, .1)', marginRight: 15 }}
            onPress={pickImage}
          >
            <AppText style={{ ...style.buttonText }}>{t('Загрузить')}</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...style.button, backgroundColor: red }}
            onPress={imageRemove}
          >
            <AppText style={{ ...style.buttonText, color: '#fff' }}>{t('Удалить')}</AppText>
          </TouchableOpacity>
        </View>
        <AppText style={style.name}>{user?.name}</AppText>
      </View>
      <View style={{ ...style.container, paddingVertical: 0 }}>
        <View style={{ ...style.titleContainer, marginHorizontal: -15, padding: 15 }}>
          <AppText style={style.title}>{t('Настройки пользователя')}</AppText>
        </View>
        <View style={{ ...style.titleContainer, marginHorizontal: -15, padding: 15 }}>
          {
            Fields.map(field => {
              return (
                <View key={field.name} style={{ flexDirection: 'row' }}>
                  <AppText style={{ flex: 1 }}>{t(field.placeholder)}</AppText>
                  <AppInput
                    control={control}
                    name={field.name}
                    placeholder={t(field.placeholder)}
                    defaultValue={user[field.name]}
                    style={style.textInput}
                    error={errors[field.name]}
                  />
                </View>
              );
            })
          }
        </View>
        <View style={{ ...style.titleContainer, marginHorizontal: -15, padding: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <AppText style={{ ...style.title, flex: 1 }}>{t('Уведомления')}</AppText>
            <Image source={require('../../../assets/images/icons/notification.png')}
                   style={{ ...headerStyles.icons }} />
          </View>
          {
            Checkboxs.map((checkbox) => {
              return (
                <View
                  key={checkbox.name}
                  style={{ flexDirection: 'row', marginTop: 15 }}
                >
                  <AppText style={{ ...style.checkboxTitle, flex: 1 }}>{t(checkbox.placeholder)}</AppText>
                  <AppCheckbox
                    name={checkbox.name}
                    error={errors[checkbox.name]}
                    style={headerStyles.icons}
                    control={control}
                    defaultValue={user[checkbox.name]}
                  />
                </View>
              );
            })
          }
        </View>
        <View style={{ marginHorizontal: -15, padding: 15, flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ ...style.button, backgroundColor: 'rgba(0, 0, 0, .1)', marginRight: 15 }}
            onPress={() => navigation.navigate('Profile')}
          >
            <AppText style={{ ...style.buttonText }}>{t('Отменить')}</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...style.button, backgroundColor: blue }}
            onPress={handleSubmit(editUserSettings)}
          >
            <AppText style={{ ...style.buttonText, color: '#fff' }}>{t('Сохранить')}</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 25,
    borderRadius: 7,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 7,
  },
  name: {
    fontSize: 30,
    fontFamily: 'roboto-bold',
    marginTop: 10,
    marginBottom: 10,
  },
  textInput: {
    flex: 2,
    backgroundColor: '#f3f3f3',
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 9,
    fontFamily: 'roboto-regular',
    fontSize: 14,
    marginBottom: 15,
  },
  aboutMe: {
    fontSize: 14,
    marginBottom: 10,
  },
  titleContainer: {
    borderBottomColor: 'rgba(0, 0, 0, .1)',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'roboto-bold',
  },
  checkboxTitle: {
    fontFamily: 'roboto-medium',
    fontSize: 14,
    flex: 1,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
  },
  buttonText: {
    fontFamily: 'roboto-medium',
    fontSize: 14,
  },
});