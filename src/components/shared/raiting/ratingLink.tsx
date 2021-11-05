import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { green, red } from '../../../styles/layout.styles';
import { AppText } from '../appText';
import { headerStyles } from '../../../styles/header.styles';
import { useNavigation } from '@react-navigation/native';

interface Props {
  rating?: number;
  slug: string
}

export const RatingLink: React.FC<Props> = ({ rating = 0, slug }) => {
  const navigation = useNavigation<any>()
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Posts', {
            slug
          });
        }}
      >
        <Image source={require('../../../../assets/images/icons/chevronDown.png')} style={headerStyles.icons} />
      </TouchableOpacity>
      <AppText style={{ ...style.rating, color: rating < 0 ? red : green}}>{rating}</AppText>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Posts', {
            slug
          });
        }}
      >
        <Image source={require('../../../../assets/images/icons/chevronUp.png')} style={headerStyles.icons} />
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
  rating: {
    fontSize: 13,
    fontFamily: 'roboto-medium',
    marginHorizontal: 7,
    paddingHorizontal: 5,
  },
});