import React from 'react';
import { ICategory } from '../../../interfaces';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '../appText';

interface Props {
  category: ICategory;
}

export const CategoryTitle: React.FC<Props> = ({ category }) => {
  const { navigate } = useNavigation<any>();
  return (
    <TouchableOpacity
      style={style.container}
      onPress={() => {
        navigate('Categories', {
          slug: category.slug,
        });
      }}
    >
      <Image source={{ uri: category.image }} style={style.image} resizeMode='cover' />
      <AppText style={style.title}>{category.name}</AppText>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 7,
  },
  title: {
    fontSize: 13,

    marginLeft: 10,
  },
});