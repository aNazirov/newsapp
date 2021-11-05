import React from 'react';
import { AppText } from '../shared';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

export const FacebookLogin: React.FC = () => {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '1031789204286441',
    responseType: ResponseType.Code,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log(code)
    }
  }, [response]);
  return (
    <TouchableOpacity
      disabled={!request}
      style={style.button}
      onPress={() => promptAsync()}
    >
      <Image source={require('../../../assets/images/icons/facebook.png')}/>
      <AppText style={style.buttonText}>Facebook</AppText>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {

  },
  buttonText: {

  },
  buttonIcon: {

  }
})