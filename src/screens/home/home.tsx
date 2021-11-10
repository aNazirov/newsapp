import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, LogBox, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getHotPosts, getMainPosts } from '../../store/posts/posts.thunks';
import { HotPost, Posts } from '../../components/shared';
import { clearStore } from '../../helpers/helpers';
import { NavigationProp } from '@react-navigation/native';
import { toastShow } from '../../services/notifications.service';
import { errorObject } from '../../_data/helpers';
import { Loader } from '../../components/shared/loader';

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);

interface Props {
  navigation: NavigationProp<any>;
}

export const Home: React.FC<Props> = ({}) => {
  const page = useRef(2);
  const dispatch = useAppDispatch();
  const [firstLoading, setFirstLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const { lang } = useAppSelector(state => state.global);
  useEffect(() => {
    clearStore(dispatch);
    dispatch(getMainPosts({ page: 1 }, lang))
      .finally(() => setFirstLoading(false))
    dispatch(getHotPosts({ page: 1 }, lang))
      .finally(() => setFirstLoading(false))
  }, [lang]);
  const { hotPosts, pageCount } = useAppSelector(state => state.posts);
  const getMore = () => {
    if (!pageCount) return;
    setLoading(true);
    return dispatch(getMainPosts({ page: page.current }, lang))
      .then(() => page.current++)
      .catch(() => toastShow(errorObject))
      .finally(() => setLoading(false));
  };
  return (
    <Loader loading={firstLoading}>
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
              {
                loading &&
                <ActivityIndicator size='large' color='#0000ff' />
              }
            </Fragment>
          );
        }}
        keyExtractor={(item, index) => index.toString() + 'home-list'}
        onEndReached={getMore}
        style={style.container}
      />
    </Loader>
  );
};

const style = StyleSheet.create({
  container: {},
});