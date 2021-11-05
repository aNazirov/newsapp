import React from 'react';
import { IPost } from '../../../interfaces';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CategoryTitle } from '../utils';
import { Indicators } from '../indicators';
import { RatingLink } from '../raiting';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '../appText';

interface Props {
  post: IPost;
}

export const BasePost: React.FC<Props> = ({ post }) => {
  const navigation = useNavigation<any>();
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Posts', { slug: post.slug });
        }}
      >
        <Image source={{ uri: post.image }} style={style.image} />
      </TouchableOpacity>
      <View style={style.head}>
        <View style={style.category}><CategoryTitle category={post.category} /></View>
        {
          post.user &&
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Authors', {
                id: post.user.id,
              });
            }}
          >
            <AppText style={style.author}>{post.user.name}</AppText>
          </TouchableOpacity>
        }
        <AppText style={style.date}>{post.created_at}</AppText>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Posts', { slug: post.slug });
        }}
      >
        <AppText style={style.title} ellipsizeMode='tail' numberOfLines={2}>{post.title}</AppText>
      </TouchableOpacity>
      <AppText style={style.description} ellipsizeMode='tail' numberOfLines={4}>{post.meta_description}</AppText>
      <View style={style.indicators}>
        <Indicators
          comments={post.comments_count}
          views={post.views_count}
          color='#000'
          light={false}
          size={24}
          fontSize={13}
        />
        <RatingLink rating={post.rating} slug={post.slug}/>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 25,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 7,
    marginBottom: 10,
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  category: {
    marginRight: 10,
  },
  author: {
    fontSize: 13,

    marginRight: 10,
    color: 'rgba(0, 0, 0, .7)',
  },
  date: {
    fontSize: 13,

    color: 'rgba(0, 0, 0, .7)',
  },
  indicators: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginVertical: 10,
  },
});