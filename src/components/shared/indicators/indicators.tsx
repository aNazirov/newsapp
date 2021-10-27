import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
  comments: number,
  views: number,
  color: string,
  light: boolean
  size: number,
  fontSize: number
}

export const Indicators: React.FC<Props> = ({ color, comments = 0, light,views = 0, size, fontSize }) => {
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
        <Text style={{color, fontSize, marginLeft: 7, marginRight: 13}}>{comments}</Text>
        {
          light
            ? <Image source={require('../../../../assets/images/icons/messageL.png')} style={sizing} resizeMode='contain'/>
            : <Image source={require('../../../../assets/images/icons/message.png')} style={sizing} resizeMode='contain'/>
        }
        <Text style={{color, fontSize, marginLeft: 7}}>{comments}</Text>
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