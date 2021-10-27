import React, { useEffect, useRef } from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getHotPosts, getMainPosts } from '../../store/posts/posts.thunks';
import { HotPost, Posts } from '../../components/shared';
import { clearStore } from '../../helpers/helpers';
import { AxiosError } from 'axios';

export const Home: React.FC = () => {
  const page = useRef(1)
  const dispatch = useAppDispatch();
  const getMore = () => {
    dispatch(getMainPosts({ page: page.current }, 'ru'))
      .then(() => page.current++)
      .catch((err: AxiosError) => console.log(err))
  }
  useEffect(() => {
    dispatch(getMainPosts({ page: 1 }, 'ru'));
    dispatch(getHotPosts({ page: 1 }, 'ru'));
    return () => {
      clearStore(dispatch);
    };
  }, []);
  const { hotPosts, pageCount } = useAppSelector(state => state.posts);
  return (
    <ScrollView style={styles.container}>
      {
        hotPosts?.hotPosts.map((item, i) => {
          if (i > 2) return null;
          return <HotPost key={item.id} post={item} />;
        })
      }
      <Posts />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});