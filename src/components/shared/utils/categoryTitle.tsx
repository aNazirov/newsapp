import React from 'react';
import { ICategory } from '../../../interfaces';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
  category: ICategory;
}

export const CategoryTitle: React.FC<Props> = ({ category }) => {
  return (
    <View style={style.container}>
      <Image source={{uri: category.image}} style={style.image} resizeMode='cover'/>
      <Text style={style.title}>{category.name}</Text>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 7
  },
  title: {
    fontSize: 13,
    fontWeight: '400',
    marginLeft: 10
  }
})