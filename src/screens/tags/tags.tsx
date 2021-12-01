import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Filter, Posts } from '../../components/shared';
import { getMorePosts, postsNull } from '../../store/posts/posts.thunks';
import { clearStore } from '../../helpers/helpers';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { toastShow } from '../../services/notifications.service';
import { errorObject } from '../../_data/helpers';
import { getTag } from '../../store/tags/tags.thunks';
import { AppText } from '../../components/shared';
import { Loader } from '../../components/shared/loader';
import { AxiosError } from 'axios';

interface IFilter {
  fresh?: boolean;
  popular?: boolean;
}

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export const Tags: React.FC<Props> = ({ route }) => {
  const page = useRef(2);
  const [filter, setFilter] = useState<IFilter>({ fresh: true });
  const dispatch = useAppDispatch();
  const [firstLoading, setFirstLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const { lang } = useAppSelector(state => state.global);
  useEffect(() => {
    setFirstLoading(true);
    clearStore(dispatch);
    dispatch(getTag({ page: 1, ...filter }, route.params?.slug, lang))
      .finally(() => setFirstLoading(false));
  }, [lang, route.params?.slug]);
  const { pageCount } = useAppSelector(state => state.posts);
  const { tag } = useAppSelector(state => state.tags);
  const getMore = () => {
    if (!pageCount) return;
    setLoading(true);
    return dispatch(getMorePosts('tags', route.params?.slug, { page: page.current, ...filter }, lang))
      .then(() => page.current++)
      .catch((err: AxiosError) => toastShow({ ...errorObject, message: err.response?.data?.message }))
      .finally(() => setLoading(false));
  };
  const getFilter = (filters: IFilter) => {
    dispatch(postsNull());
    page.current = 1;
    setLoading(true);
    dispatch(getMorePosts('tags', route.params?.slug, { page: 1, ...filters }, lang))
      .then(() => page.current++)
      .catch((err: AxiosError) => toastShow({ ...errorObject, message: err.response?.data?.message }))
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
                <AppText style={style.title}>{tag?.name}</AppText>
                <AppText style={style.description}>{tag?.meta_description}</AppText>
              </View>
              <Filter filter={filter} setFilter={setFilter} getFilter={getFilter} first='fresh' />
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
    marginTop: 25,
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
  },
  description: {
    fontSize: 14,

    lineHeight: 21,
  },
});