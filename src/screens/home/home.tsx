import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, LogBox, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getHotPosts, getMainPosts } from '../../store/posts/posts.thunks';
import { HotPost, Posts } from '../../components/shared';
import { clearStore } from '../../helpers/helpers';
import { AxiosError } from 'axios';
import { NavigationProp } from '@react-navigation/native';

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);

interface Props {
  navigation: NavigationProp<any>;
}

export const Home: React.FC<Props> = ({ navigation }) => {
  const page = useRef(2);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { lang } = useAppSelector(state => state.global);
  useEffect(() => {
    clearStore(dispatch);
    dispatch(getMainPosts({ page: 1 }, lang));
    dispatch(getHotPosts({ page: 1 }, lang));
  }, []);
  const { hotPosts, pageCount } = useAppSelector(state => state.posts);
  const getMore = () => {
    if (page.current > pageCount) return;
    setLoading(true);
    return dispatch(getMainPosts({ page: page.current }, lang))
      .then(() => page.current++)
      .catch((err: AxiosError) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <>
      <FlatList
        data={[1]}
        renderItem={() => {
          return (
            <Fragment key={'home-list'}>
              {
                hotPosts?.hotPosts.map((post, i) => {
                  if (i > 2) return null;
                  return <HotPost key={post.id} post={post} />;
                })
              }
              <Posts />
            </Fragment>
          );
        }}
        onEndReached={getMore}
        style={style.container}
      />
      {
        loading &&
        <ActivityIndicator size='large' color='#0000ff' />
      }
    </>
  );
};

const style = StyleSheet.create({
  container: {},
});