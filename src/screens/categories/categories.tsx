import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Filter, Posts } from '../../components/shared';
import { postsNull } from '../../store/posts/posts.thunks';
import { clearStore } from '../../helpers/helpers';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { getCategory } from '../../store/categories/categories.thunks';
import { toastShow } from '../../services/notifications.service';
import { errorObject } from '../../_data/helpers';

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
    dispatch(getCategory({ page: 1, ...filter }, route.params?.slug, lang));
    return () => {}
  }, [lang, route.params?.slug]);
  const { pageCount } = useAppSelector(state => state.posts);
  const { category } = useAppSelector(state => state.categories);
  const getMore = () => {
    if (page.current > pageCount) return;
    setLoading(true);
    return dispatch(getCategory({ page: page.current, ...filter }, route.params?.slug, lang))
      .then(() => page.current++)
      .catch(() => toastShow(errorObject))
      .finally(() => setLoading(false));
  };
  const getFilter = (filters: IFilter) => {
    dispatch(postsNull());
    page.current = 1;
    setLoading(true);
    dispatch(getCategory({ page: 1, ...filters }, route.params?.slug, lang))
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
                <Text style={style.title}>{category?.name}</Text>
                <Text style={style.description}>{category?.description}</Text>
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
    fontWeight: '700',
    lineHeight: 31,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
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