import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ExtraPosts } from './extraPosts';
import { BasePost } from './basePost';
import { useAppSelector } from '../../../store/hooks';
import { ExtraItems } from './extraItems';

interface Props {
}

export const Posts: React.FC<Props> = ({}) => {
  const { posts } = useAppSelector(state => state.posts);
  return (
    <View style={style.container}>
      {
        posts.reduce((total: any[], post, i) => {
          if (post.type === 'posts') {
            return [
              ...total,
              ...post.data.map((item) => <BasePost post={item} key={item.slug + i} />)
            ];
          }
          if ((post.type === 'categories' || post.type === 'authors') && post.data.length) {
            return [
              ...total,
              <ExtraItems items={post.data} title={post.type} key={post.type + Date.now() + i} />
            ];
          }
          if (post.data.length) return [
            ...total,
            <ExtraPosts posts={post.data} title={post.type} key={post.type + Date.now() + i} />
          ];

          return total;
        }, [])
      }
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 25,
  },
});
