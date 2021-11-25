import React from 'react';
import { ICategory } from '../../../interfaces';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '../appText';
import { headerStyles } from '../../../styles/header.styles';

interface Props {
  category: ICategory;
  color?: string
}

export const CategoryTitle: React.FC<Props> = ({ category , color = '#000'}) => {
  const { navigate } = useNavigation<any>();
  return (
    <TouchableOpacity
      style={style.container}
      onPress={() => {
        navigate('Categories', {
          slug: category?.slug,
        });
      }}
    >
      <Image source={{ uri: category?.image }} style={{ ...headerStyles.icons,...style.image }} resizeMode='cover' />
      <AppText style={{ ...style.title, color }}>{category?.name}</AppText>
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
    display: 'none',
    borderRadius: 7,
    marginRight: 10,
  },
  title: {
    fontSize: 13,
  },
});