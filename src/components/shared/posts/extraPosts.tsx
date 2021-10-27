import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IPost } from '../../../interfaces';
import { ExtraPost } from './extraPost';

interface Props {
  title: string,
  posts: IPost[]
}

export const ExtraPosts: React.FC<Props> = ({ posts, title }) => {
  return (
    <View style={style.container}>
      <Text style={style.title}>{title}</Text>
      {
        posts.map((post, i) => {

          return (
            <React.Fragment key={post.id}>
              {
                i > 0 &&
                <View style={style.hr} />
              }
              <ExtraPost post={post} />
            </React.Fragment>
          );
        })
      }
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: '#ECF6FF',
    paddingHorizontal: 15,
    paddingVertical: 18,
    marginBottom: 25,
  },
  title: {
    color: '#0A84FF',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '400',
  },
  hr: {
    flex: 1,
    height: 1,
    opacity: .05,
    backgroundColor: '#252525',
  },
});