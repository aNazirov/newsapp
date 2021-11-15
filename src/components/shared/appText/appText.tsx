import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

export const AppText: React.FC<TextProps> = ({ style, children, ...props }: any) => (
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