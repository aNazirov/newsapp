import React from 'react';
import { AppText } from '../shared';
import { Image, TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { useAppDispatch } from '../../store/hooks';

export const GoogleLogin: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSocialLoginViaGoogle = async () => {
    const { type, accessToken, user, idToken }: any = await Google.logInAsync({
      iosClientId: '866558658392-uetcis6avp4qt9768s8bfk6hpge942ut.apps.googleusercontent.com',
      androidClientId: '866558658392-fc9q33hl5o5upcnpu2o2ngbkmts1d0rm.apps.googleusercontent.com',
      iosStandaloneAppClientId: '',
      androidStandaloneAppClientId: '',
    });
    if (type === 'success') {
      console.log('accessToken', accessToken)
      console.log('user', user )
      console.log('idToken', idToken)
    }
  }

  return (
    <TouchableOpacity
      onPress={handleSocialLoginViaGoogle}
    >
      <Image source={require('../../../assets/images/icons/google.png')}/>
      <AppText>Google</AppText>
    </TouchableOpacity>
  )
}