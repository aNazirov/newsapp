import React from 'react';
import { AppText } from '../shared';
import * as Facebook from 'expo-facebook';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

export const FacebookLogin: React.FC = () => {
  const handleSocialLoginViaFacebook = async () => {
      try {
        await Facebook.initializeAsync({
          appId: '1031789204286441',
        });
        const {
          type,
          token,
          expirationDate,
          permissions,
          declinedPermissions,
        }: any = await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile'],
        });
        if (type === 'success') {
          console.log(token)
          console.log(permissions)
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          console.log('Logged in!', `Hi ${(await response.json()).name}!`);
        } else {
          // type === 'cancel'
          console.log('cancel')
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
  }
  return (
    <TouchableOpacity
      style={style.button}
      onPress={handleSocialLoginViaFacebook}
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