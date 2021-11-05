import React from 'react';
import { AppText } from '../shared';
import { Image, TouchableOpacity } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { useAppDispatch } from '../../store/hooks';
import { loginFormOpenSet, loginViaGoogle } from '../../store/global/global.thunks';

export const GoogleLogin: React.FC = () => {
  const dispatch = useAppDispatch();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '866558658392-bmdicbi6n5a42vo6jban13ckd8mu6sv5.apps.googleusercontent.com',
    iosClientId: '866558658392-uetcis6avp4qt9768s8bfk6hpge942ut.apps.googleusercontent.com',
    androidClientId: '866558658392-fc9q33hl5o5upcnpu2o2ngbkmts1d0rm.apps.googleusercontent.com',
    webClientId: '866558658392-bmdicbi6n5a42vo6jban13ckd8mu6sv5.apps.googleusercontent.com'
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      dispatch(loginViaGoogle(authentication!.accessToken))
        .then(() => dispatch(loginFormOpenSet(false)))
    }
    if (response?.type === 'error') {
    }
  }, [response]);
  return (
    <TouchableOpacity
      disabled={!request}
      onPress={() => promptAsync()}
    >
      <Image source={require('../../../assets/images/icons/google.png')}/>
      <AppText>Google</AppText>
    </TouchableOpacity>
  )
}