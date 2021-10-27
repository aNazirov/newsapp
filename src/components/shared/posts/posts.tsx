import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppSelector } from '../../../store/hooks';
import { BasePost } from './basePost';
import { ExtraPosts } from './extraPosts';

export const Posts: React.FC = () => {
  const { posts } = useAppSelector(state => state.posts);
  return (
    <View style={style.container}>
      {
        posts.reduce((total: any[], post, i) => {
          if (post.type === 'posts') {
            return [...total, ...post.data.map((item) => <BasePost post={item} key={item.slug + item?.id + i} />)];
          }
          // if (post.type === 'categories' || post.type === 'authors') {
          //   return [...total, ...post.data.map((item) => <ExtraItems items={post.data} title={post.type} key={item.slug + item?.id + i} />)];
          // }
          if (post.data.length) return [...total, <ExtraPosts posts={post.data} title={post.type} key={post.type + i} />];
          return total;
        }, [])
      }
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 25
  }
})