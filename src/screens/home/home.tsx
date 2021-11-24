import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, LogBox, StyleSheet, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getHotPosts, getMainPosts, postsNull } from '../../store/posts/posts.thunks';
import { AppText, Filter, HotPost, Posts } from '../../components/shared';
import { clearStore } from '../../helpers/helpers';
import { NavigationProp } from '@react-navigation/native';
import { toastShow } from '../../services/notifications.service';
import { errorObject } from '../../_data/helpers';
import { Loader } from '../../components/shared/loader';
import { useTranslation } from 'react-i18next';
import NetInfo from '@react-native-community/netinfo';

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);

interface IFilter {
  fresh?: boolean;
  popular?: boolean;
}

interface Props {
  navigation: NavigationProp<any>;
}

export const Home: React.FC<Props> = ({}) => {
  const { t } = useTranslation();
  const page = useRef(2);
  const dispatch = useAppDispatch();
  const [firstLoading, setFirstLoading] = useState(true);
  const [filter, setFilter] = useState<IFilter>({ fresh: true });
  const [loading, setLoading] = useState(false);

  const { lang } = useAppSelector(state => state.global);
  const { hotPosts, pageCount, posts } = useAppSelector(state => state.posts);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && !posts.length) {
        clearStore(dispatch);
        dispatch(getMainPosts({ page: 1 }, lang))
          .finally(() => setFirstLoading(false));
        dispatch(getHotPosts({ page: 1 }, lang))
          .finally(() => setFirstLoading(false));
      }
      if (!state.isConnected) {
        toastShow({ type: 'error', title: 'Соединение не установлено', message: 'Проверте соединение с интернетом' });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [])

  useEffect(() => {
    clearStore(dispatch);
    dispatch(getMainPosts({ page: 1 }, lang))
      .finally(() => setFirstLoading(false));
    dispatch(getHotPosts({ page: 1 }, lang))
      .finally(() => setFirstLoading(false));
  }, [lang]);

  const getMore = () => {
    if (!pageCount) return;
    setLoading(true);
    return dispatch(getMainPosts({ page: page.current, ...filter }, lang))
      .then(() => page.current++)
      .catch(() => toastShow(errorObject))
      .finally(() => setLoading(false));
  };
  const getFilter = () => {
    dispatch(postsNull());
    setLoading(true);
    page.current = 1;
    return dispatch(getMainPosts({ page: 1, ...filter }, lang))
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
              <View style={style.containerFilter}>
                <AppText style={{ ...style.title }}>{t('Лента новостей')}</AppText>
                <Filter filter={filter} setFilter={setFilter} getFilter={getFilter} first='fresh' />
              </View>
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
  containerFilter: {
    marginHorizontal: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginTop: 25,
    fontFamily: 'roboto-bold',
  },
});