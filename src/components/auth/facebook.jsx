import React from 'react';
import { AppText } from '../shared';
import { TouchableOpacity } from 'react-native';
import { facebook } from 'react-native-simple-auth';

export const Facebook = () => {
  const handleSocialLoginViaFacebook = () => {
    facebook({})
  };
  return (
    <TouchableOpacity
      onPress={handleSocialLoginViaFacebook}
    >
      <AppText>FaceBook</AppText>
    </TouchableOpacity>
  );
};