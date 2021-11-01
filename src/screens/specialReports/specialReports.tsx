import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Filter, Posts } from '../../components/shared';
import { getSpecialPosts, postsNull } from '../../store/posts/posts.thunks';
import { clearStore } from '../../helpers/helpers';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { defaultImage, errorObject } from '../../_data/helpers';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';
import { toastShow } from '../../services/notifications.service';

interface IFilter {
  fresh?: boolean;
  popular?: boolean;
}

interface Props {
  navigation: NavigationProp<any>;
}

export const SpecialReports: React.FC<Props> = ({ }) => {
  const { t } = useTranslation()
  const page = useRef(2);
  const [filter, setFilter] = useState<IFilter>({ fresh: true });
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { lang } = useAppSelector(state => state.global);
  useEffect(() => {
    clearStore(dispatch);
    dispatch(getSpecialPosts({ page: 1, ...filter }, lang));
  }, [lang]);
  const { pageCount } = useAppSelector(state => state.posts);
  const getMore = () => {
    if (page.current > pageCount) return;
    setLoading(true);
    return dispatch(getSpecialPosts({ page: page.current, ...filter }, lang))
      .then(() => page.current++)
      .catch(() => toastShow(errorObject))
      .finally(() => setLoading(false));
  };
  const getFilter = (filters: IFilter) => {
    dispatch(postsNull());
    page.current = 1;
    setLoading(true);
    dispatch(getSpecialPosts({ page: 1, ...filters }, lang))
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
            <Fragment key={'special-list'}>
              <View style={style.chapter}>
                <Image source={{
                  uri: defaultImage
                }} style={style.image} />
                <Text style={style.title}>{t('Спецрепортажи')}</Text>
                <Text style={style.description}>Описание категории</Text>
              </View>
              <Filter filter={filter} setFilter={setFilter} getFilter={getFilter} first='fresh'/>
              <Posts />
            </Fragment>
          );
        }}
        keyExtractor={(item, index) => index.toString() + 'special-list'}
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
});