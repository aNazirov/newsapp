import React from 'react';
import { AppText } from '../shared';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { useAppDispatch } from '../../store/hooks';
import { loginFormOpenSet, loginViaGoogle } from '../../store/global/global.thunks';
import { headerStyles } from '../../styles/header.styles';
import { toastShow } from '../../services/notifications.service';
import * as WebBrowser from 'expo-web-browser';
import { errorObject } from '../../_data/helpers';


WebBrowser.maybeCompleteAuthSession();
// const useProxy = Platform.select({ default: false });

export const GoogleLogin2: React.FC = () => {
  const dispatch = useAppDispatch();
  const login = async () => {
    const result = await Google.logInAsync({
      iosClientId: '866558658392-uetcis6avp4qt9768s8bfk6hpge942ut.apps.googleusercontent.com',
      androidClientId: '866558658392-fc9q33hl5o5upcnpu2o2ngbkmts1d0rm.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
    if (result.type === 'success') {
      console.log(result.accessToken);
      dispatch(loginViaGoogle(result!.accessToken || ''))
        .then(() => dispatch(loginFormOpenSet(false)))
        .catch(() => toastShow(errorObject));
    } else {
      console.log({ cancelled: true });
    }
  }
  return (
    <TouchableOpacity
      style={style.button}
      onPress={() => login()}
    >
      <Image
        source={require('../../../assets/images/icons/google.png')}
        style={{ ...headerStyles.icons, marginRight: 10 }}
      />
      <AppText style={style.buttonText}>Google</AppText>
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
    backgroundColor: '#DD4B39',
    borderRadius: 7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});