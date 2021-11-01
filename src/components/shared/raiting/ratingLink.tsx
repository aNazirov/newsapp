import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { green, red } from '../../../styles/layout.styles';
import { AppText } from '../appText';

interface Props {
  rating: number;
}

export const RatingLink: React.FC<Props> = ({ rating }) => {
  return (
    <View style={style.container}>
      <TouchableOpacity>
        <Image source={require('../../../../assets/images/icons/chevronDown.png')} style={style.icons} />
      </TouchableOpacity>
      <AppText style={{ ...style.rating, color: rating < 0 ? red : green}}>{rating}</AppText>
      <TouchableOpacity>
        <Image source={require('../../../../assets/images/icons/chevronUp.png')} style={style.icons} />
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons: {
    width: 24,
    height: 24,
  },
  rating: {
    fontSize: 13,
    fontFamily: 'roboto-medium',
    marginHorizontal: 7,
    paddingHorizontal: 5,
  },
});