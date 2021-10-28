import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ExtraPosts } from './extraPosts';
import { BasePost } from './basePost';
import { useAppSelector } from '../../../store/hooks';

interface Props {
}

export const Posts: React.FC<Props> = ({}) => {
  const { posts } = useAppSelector(state => state.posts);
  return (
    <View style={style.container}>
      {
        posts.reduce((total: any[], post, i) => {
          if (post.type === 'posts') {
            return [...total, ...post.data.map((item) => <BasePost post={item} key={item.slug + item?.id + i} />)];
          }
          // if (post.type === 'categories' || post.type === 'authors') {
          //   return [...total, ...post.data.map((item) => <ExtraItems items={post.data} title={post.type}
          //                                                            key={item.slug + item?.id + i} />)];
          // }
          if (post.data.length) return [...total,
            <ExtraPosts posts={post.data} title={post.type} key={post.type + i} />];

          return total;
        }, [])
      }
    </View>
  );
};
// export const Posts: React.FC<Props> = ({ post }) => {
//   return (
//     <View style={style.container}>
//       {
//         post.type === 'categories' || post.type === 'authors' && null
//       }
//       {
//         post.type === 'posts'
//           ? post.data.map((item: IPost) => <BasePost post={item} key={item.slug + item?.id} />)
//           : post.data.length && <ExtraPosts posts={post.data} title={post.type} key={post.type} />
//       }
//     </View>
//   );
// };

const style = StyleSheet.create({
  container: {
    marginTop: 25,
  },
});
