import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { loginFormOpenSet } from '../../../store/global/global.thunks';
import { headerStyles } from '../../../styles/header.styles';
import { useAppDispatch } from '../../../store/hooks';

export const Sign = () => {
  const dispatch = useAppDispatch()
  return (
    <TouchableOpacity
      onPress={() => dispatch(loginFormOpenSet(true))}
    >
      <Image
        style={{ ...headerStyles.icons, ...style.sign }}
        source={require('../../../../assets/images/icons/Vector.png')}
      />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  sign: {
    marginLeft: 22
  }
});