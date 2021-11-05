import React from 'react';
import { AppText } from '../shared';
import * as Facebook from 'expo-facebook';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { headerStyles } from '../../styles/header.styles';
import { useAppDispatch } from '../../store/hooks';
import { loginFormOpenSet, loginViaFacebook } from '../../store/global/global.thunks';
import { toastShow } from '../../services/notifications.service';
import { errorObject } from '../../_data/helpers';

export const FacebookLogin: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleSocialLoginViaFacebook = async () => {
    try {
      await Facebook.initializeAsync({
        appId: '1031789204286441',
        appName: 'Uznews-2'
      });
      const {
        type,
        token,
      }: any = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        dispatch(loginViaFacebook(token))
          .then(() => dispatch(loginFormOpenSet(false)))
      } else {
        toastShow(errorObject);
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
  return (
    <TouchableOpacity
      style={style.button}
      onPress={handleSocialLoginViaFacebook}
    >
      <Image
        source={require('../../../assets/images/icons/facebook.png')}
        style={{ ...headerStyles.icons, marginRight: 10 }}
      />
      <AppText style={style.buttonText}>Facebook</AppText>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#3B5998',
    borderRadius: 7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14
  },
});