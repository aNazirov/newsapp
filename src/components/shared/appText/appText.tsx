import React from 'react';
import {Text, StyleSheet} from 'react-native';

export const AppText = ({ style, children, ...props }: any) => (
  <Text
    style={{...styles.default, ...style}}
    {...props}
  >
    {children}
  </Text>
)

const styles = StyleSheet.create({
  default: {
    fontFamily: 'roboto-regular',
  }
})