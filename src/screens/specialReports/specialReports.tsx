import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, View } from 'react-native';
import { Filter, Posts } from '../../components/shared';
import { getSpecialPosts, postsNull } from '../../store/posts/posts.thunks';
import { clearStore } from '../../helpers/helpers';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { defaultImage, errorObject } from '../../_data/helpers';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';
import { toastShow } from '../../services/notifications.service';
import { AppText } from '../../components/shared';
import { Loader } from '../../components/shared/loader';
import NetInfo from '@react-native-community/netinfo';
import { AxiosError } from 'axios';

interface IFilter {
  fresh?: boolean;
  popular?: boolean;
}

interface Props {
  navigation: NavigationProp<any>;
}

export const SpecialReports: React.FC<Props> = ({}) => {
  const { t } = useTranslation();
  const page = useRef(2);
  const [filter, setFilter] = useState<IFilter>({ fresh: true });
  const dispatch = useAppDispatch();
  const [firstLoading, setFirstLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const { lang } = useAppSelector(state => state.global);
  const { pageCount, posts } = useAppSelector(state => state.posts);

  useEffect(() => {
    clearStore(dispatch);
    dispatch(getSpecialPosts({ page: 1, ...filter }, lang))
      .finally(() => setFirstLoading(false));
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && !posts.length) {
        clearStore(dispatch);
        dispatch(getSpecialPosts({ page: 1, ...filter }, lang))
          .finally(() => setFirstLoading(false));
      }
      if (!state.isConnected) {
        toastShow({ type: 'error', title: 'Соединение не установлено', message: 'Проверте соединение с интернетом' });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [lang]);

  const getMore = () => {
    if (!pageCount) return null;
    setLoading(true);
    return dispatch(getSpecialPosts({ page: page.current, ...filter }, lang))
      .then(() => page.current++)
      .catch((err: AxiosError) => toastShow({ ...errorObject, message: err.response?.data?.result?.message }))
      .finally(() => setLoading(false));
  };
  const getFilter = (filters: IFilter) => {
    dispatch(postsNull());
    page.current = 1;
    setLoading(true);
    dispatch(getSpecialPosts({ page: 1, ...filters }, lang))
      .then(() => page.current++)
      .catch((err: AxiosError) => toastShow({ ...errorObject, message: err.response?.data?.result?.message }))
      .finally(() => setLoading(false));
  };
  return (
    <Loader loading={firstLoading}>
      <FlatList
        data={[1]}
        renderItem={() => {
          return (
            <Fragment key={'special-list'}>
              <View style={style.chapter}>
                <Image source={{
                  uri: defaultImage,
                }} style={style.image} />
                <AppText style={style.title}>{t('Спецрепортажи')}</AppText>
                <AppText style={style.description}>Описание категории</AppText>
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
        keyExtractor={(item, index) => index.toString() + 'special-list'}
        onEndReached={getMore}
      />
    </Loader>
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
    fontFamily: 'roboto-bold',
    lineHeight: 31,
  },
  description: {
    fontSize: 14,

    lineHeight: 21,
  },
});