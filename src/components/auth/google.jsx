import React from 'react';
import { AppText } from '../shared';
import { TouchableOpacity } from 'react-native';
import { google } from 'react-native-simple-auth';

export const Google = () => {
  const handleSocialLoginViaGoogle = () => {
    google({
      appId : '866558658392-3hvj2r9m1bk93nm825jbuk8eqkd2r5sh.apps.googleusercontent.com',
      callback: 'com.uznews:/oauth2redirect'
  })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  };
  return (
    <TouchableOpacity
      onPress={handleSocialLoginViaGoogle}
    >
      <AppText>Google</AppText>
    </TouchableOpacity>
  )
}