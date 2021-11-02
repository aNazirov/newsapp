import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Filter, Posts } from '../../components/shared';
import { getMorePosts, postsNull } from '../../store/posts/posts.thunks';
import { clearStore } from '../../helpers/helpers';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { getCategory } from '../../store/categories/categories.thunks';
import { toastShow } from '../../services/notifications.service';
import { errorObject } from '../../_data/helpers';
import { AppText } from '../../components/shared';

interface IFilter {
  fresh?: boolean;
  popular?: boolean;
}

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

const follow = require('../../../assets/images/icons/follow.png')
const followCheck = require('../../../assets/images/icons/followCheck.png')

export const Categories: React.FC<Props> = ({ route }) => {
  const page = useRef(2);
  const [filter, setFilter] = useState<IFilter>({ fresh: true });
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { lang } = useAppSelector(state => state.global);
  useEffect(() => {
    clearStore(dispatch);
    dispatch(getCategory({ page: 1, ...filter }, route.params?.slug, lang))
      .then(() => page.current = 2)
      .catch(() => toastShow(errorObject))
    return () => {}
  }, [lang, route.params?.slug]);
  const { pageCount } = useAppSelector(state => state.posts);
  const { category } = useAppSelector(state => state.categories);
  const getMore = () => {
    if (page.current > pageCount) return;
    setLoading(true);
    return dispatch(getMorePosts('categories', route.params?.slug, { page: page.current, ...filter }, lang))
      .then(() => page.current++)
      .catch(() => toastShow(errorObject))
      .finally(() => setLoading(false));
  };
  const getFilter = (filters: IFilter) => {
    dispatch(postsNull());
    page.current = 1;
    setLoading(true);
    dispatch(getMorePosts('categories', category?.slug, { page: 1, ...filters }, lang))
      .then(() => page.current++)
      .catch(() => toastShow(errorObject))
      .finally(() => setLoading(false));
  };
  return (
    <>
      <FlatList
        data={[1]}
        renderItem={() => {
          return (
            <Fragment key={`${route.params?.slug}-list`}>
              <View style={style.chapter}>
                <Image source={{uri: category?.image}} style={style.image} />
                <AppText style={style.title}>{category?.name}</AppText>
                <AppText style={style.description}>{category?.description}</AppText>
              </View>
              <Filter filter={filter} setFilter={setFilter} getFilter={getFilter} first='fresh' />
              <Posts />
              <TouchableOpacity style={style.follow}>
                <Image source={follow} resizeMode='contain'/>
              </TouchableOpacity>
            </Fragment>
          );
        }}
        keyExtractor={(item, index) => index.toString() + `${route.params?.slug}-list`}
        onEndReached={getMore}
      />
      {
        loading &&
        <ActivityIndicator size='large' color='#0000ff' />
      }
    </>
  );
};
const style = StyleSheet.create({
  chapter: {
    padding: 15,
    backgroundColor: '#fff',
    position: 'relative'
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
  follow: {
    width: 36,
    height: 36,
    position: 'absolute',
    top: 15,
    right: 15
  }
});