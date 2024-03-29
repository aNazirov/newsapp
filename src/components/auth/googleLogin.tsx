import React, { useEffect } from 'react';
import { AppText } from '../shared';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { useAppDispatch } from '../../store/hooks';
import { loginFormOpenSet, loginViaGoogle } from '../../store/global/global.thunks';
import { headerStyles } from '../../styles/header.styles';
import { toastShow } from '../../services/notifications.service';
import * as WebBrowser from 'expo-web-browser';
import { errorObject } from '../../_data/helpers';
import { AxiosError } from 'axios';

WebBrowser.maybeCompleteAuthSession();

export const GoogleLogin: React.FC = () => {
  const dispatch = useAppDispatch();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '866558658392-bmdicbi6n5a42vo6jban13ckd8mu6sv5.apps.googleusercontent.com',
    iosClientId: '866558658392-uetcis6avp4qt9768s8bfk6hpge942ut.apps.googleusercontent.com',
    androidClientId: '866558658392-fc9q33hl5o5upcnpu2o2ngbkmts1d0rm.apps.googleusercontent.com',
    webClientId: '866558658392-bmdicbi6n5a42vo6jban13ckd8mu6sv5.apps.googleusercontent.com',
  });
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      return dispatch(loginViaGoogle(authentication!.accessToken))
        .then(() => {
          dispatch(loginFormOpenSet(false));
        })
        .catch((err: AxiosError) => toastShow({ ...errorObject, message: err.response?.data?.message }));
    }
    if (response?.type === 'error') {
      return toastShow(errorObject);
    }
  }, [response]);
  return (
    <TouchableOpacity
      style={style.button}
      disabled={!request}
      onPress={() => promptAsync()}
    >
      <Image
        source={require('../../../assets/images/icons/google.png')}
        style={{ ...headerStyles.icons, marginRight: 10, marginBottom: 5 }}
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