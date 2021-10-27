import React from 'react';
import { IPost } from '../../../interfaces';
import { View, StyleSheet, Text, Image } from 'react-native';
import { CategoryTitle } from '../utils';
import { Indicators } from '../indicators';
import { RatingLink } from '../raiting';

interface Props {
  post: IPost;
}

export const BasePost: React.FC<Props> = ({ post }) => {
  return (
    <View style={style.container}>
      <Image source={{uri: post.image}} style={style.image}/>
      <View style={style.head}>
        <CategoryTitle category={post.category}/>
        <Text style={style.date}>{post.created_at}</Text>
      </View>
      <Text style={style.title} ellipsizeMode='tail' numberOfLines={2}>{post.title}</Text>
      <Text style={style.description} ellipsizeMode='tail' numberOfLines={4}>{post.meta_description}</Text>
      <View style={style.indicators}>
        <Indicators
          comments={post.comments_count}
          views={post.views_count}
          color='#000'
          light={false}
          size={24}
          fontSize={13}
        />
        <RatingLink rating={post.rating}/>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 25
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
    alignItems: 'center'
  },
  date: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 15,
    marginLeft: 10,
    color: 'rgba(0, 0, 0, .7)',
  },
  indicators: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 23,
    marginTop: 10
  },
  description: {
    color: '#000',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    marginVertical: 10,
  }
})