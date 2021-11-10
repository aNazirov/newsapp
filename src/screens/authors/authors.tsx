import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, View } from 'react-native';
import { Filter, Posts } from '../../components/shared';
import { getMorePosts, postsNull } from '../../store/posts/posts.thunks';
import { clearStore } from '../../helpers/helpers';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { toastShow } from '../../services/notifications.service';
import { errorObject } from '../../_data/helpers';
import { getAuthor } from '../../store/authors/authors.thunks';
import { AppText } from '../../components/shared';
import { Loader } from '../../components/shared/loader';

interface IFilter {
  fresh?: boolean;
  popular?: boolean;
}

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export const Authors: React.FC<Props> = ({ route }) => {
  const page = useRef(2);
  const [filter, setFilter] = useState<IFilter>({ popular: true });
  const dispatch = useAppDispatch();
  const [firstLoading, setFirstLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const { lang } = useAppSelector(state => state.global);
  useEffect(() => {
    setFirstLoading(true);
    clearStore(dispatch);
    dispatch(getAuthor({ page: 1, ...filter }, route.params?.id, lang))
      .then(() => page.current = 2)
      .catch(() => toastShow(errorObject))
      .finally(() => setFirstLoading(false));
  }, [lang, route.params?.id]);
  const { pageCount } = useAppSelector(state => state.posts);
  const { author } = useAppSelector(state => state.authors);
  const getMore = () => {
    if (!pageCount) return null;
    setLoading(true);
    return dispatch(getMorePosts('authors', route.params?.id, { page: page.current, ...filter }, lang))
      .then(() => page.current++)
      .catch(() => toastShow(errorObject))
      .finally(() => setLoading(false));
  };
  const getFilter = (filters: IFilter) => {
    dispatch(postsNull());
    page.current = 1;
    setLoading(true);
    dispatch(getMorePosts('authors', route.params?.id, { page: 1, ...filters }, lang))
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
            <Fragment key={`${route.params?.slug}-list`}>
              <View style={style.chapter}>
                <Image source={{ uri: author?.avatar }} style={style.image} />
                <AppText style={style.title}>{author?.name}</AppText>
                <AppText style={style.date}>{author?.created_at}</AppText>
                <AppText style={style.description}>{author?.about_me}</AppText>
              </View>
              <Filter filter={filter} setFilter={setFilter} getFilter={getFilter} first='popular' />
              <Posts />
              {
                loading &&
                <ActivityIndicator size='large' color='#0000ff' />
              }
            </Fragment>
          );
        }}
        keyExtractor={(item, index) => index.toString() + `${route.params?.slug}-list`}
        onEndReached={getMore}
      />
    </Loader>
  );
};
const style = StyleSheet.create({
  chapter: {
    padding: 15,
    backgroundColor: '#fff',
    position: 'relative',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 7,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: 'roboto-bold',
    lineHeight: 31,
    marginBottom: 5,
  },
  date: {
    fontSize: 13,
    lineHeight: 15,
    color: 'rgba(0, 0, 0, .7)',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,

    lineHeight: 21,
  },
});