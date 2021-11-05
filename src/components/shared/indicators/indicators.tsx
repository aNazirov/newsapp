import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { AppText } from '../appText';

interface Props {
  comments?: number,
  views?: number,
  color: string,
  light?: boolean
  size: number,
  fontSize: number
}

export const Indicators: React.FC<Props> = ({ color, comments = 0, light = false, views = 0, size, fontSize }) => {
  const sizing = {
    width: size,
    height: size
  }
  return (
    <>
      <View style={style.container}>
        {
          light
            ? <Image source={require('../../../../assets/images/icons/eyeL.png')} style={sizing} resizeMode='contain'/>
            : <Image source={require('../../../../assets/images/icons/eye.png')} style={sizing} resizeMode='contain'/>
        }
        <AppText style={{color, fontSize, marginLeft: 7, marginRight: 13}}>{views}</AppText>
        {
          light
            ? <Image source={require('../../../../assets/images/icons/messageL.png')} style={sizing} resizeMode='contain'/>
            : <Image source={require('../../../../assets/images/icons/message.png')} style={sizing} resizeMode='contain'/>
        }
        <AppText style={{color, fontSize, marginLeft: 7}}>{comments}</AppText>
      </View>
    </>
  );
};
const style = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});