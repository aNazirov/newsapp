import React from 'react';
import { IPost } from '../../../interfaces';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Indicators } from '../indicators';
import { CategoryTitle } from '../utils';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '../appText';

interface Props {
  post: IPost;
}

export const ExtraPost: React.FC<Props> = ({ post }) => {
  const { navigate } = useNavigation<any>();
  return (
    <View style={style.container}>
      <View style={style.content}>
        <View style={style.head}>
          {
            post.category &&
            <View style={style.category}><CategoryTitle category={post.category} /></View>
          }
          {
            post.user  &&
            <TouchableOpacity
              onPress={() => {
                navigate('Authors', {
                  id: post.user.id,
                });
              }}
            >
            <AppText style={style.author}>{post.user.name}</AppText>
            </TouchableOpacity>
          }
          <AppText style={style.date}>{post.created_at}</AppText>
        </View>
        <AppText style={style.title} ellipsizeMode='tail' numberOfLines={2}>{post.title}</AppText>
        <AppText style={style.description} ellipsizeMode='tail' numberOfLines={4}>{post.meta_description}</AppText>
        <Indicators
          comments={post.comments_count}
          views={post.views_count}
          color='rgba(0, 0, 0, .7)'
          light={false}
          size={24}
          fontSize={13}
        />
      </View>
      <Image source={{ uri: post.image }} style={style.image} />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 15,
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    flex: 1,
  },
  image: {
    width: 65,
    height: 45,
    marginLeft: 10,
    borderRadius: 7,
  },
  date: {
    fontSize: 13,

    lineHeight: 15,
    color: 'rgba(0, 0, 0, .7)',
  },
  category: {
    marginRight: 14,
  },
  author: {
    fontSize: 13,

    lineHeight: 15,
    marginRight: 14,
    color: 'rgba(0, 0, 0, .7)',
  },
  title: {
    color: '#000',
    fontFamily: 'roboto-bold',
    fontSize: 16,
    lineHeight: 23,
    marginTop: 10,
  },
  description: {
    color: '#000',

    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
    marginBottom: 10,
  },
});