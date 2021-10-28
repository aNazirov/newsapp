import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Filter, Posts } from '../../components/shared';
import { getAuthorsPosts, postsNull } from '../../store/posts/posts.thunks';
import { AxiosError } from 'axios';
import { clearStore } from '../../helpers/helpers';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';

interface IFilter {
  fresh?: boolean;
  popular?: boolean;
}

interface Props {
  navigation: NavigationProp<any>;
}

export const Opinions: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const page = useRef(2);
  const [filter, setFilter] = useState<IFilter>({ fresh: true });
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { lang } = useAppSelector(state => state.global);
  useEffect(() => {
    clearStore(dispatch);
    dispatch(getAuthorsPosts({ page: 1, ...filter }, lang));
  }, []);
  const { pageCount } = useAppSelector(state => state.posts);
  const getMore = () => {
    if (page.current > pageCount) return;
    setLoading(true);
    return dispatch(getAuthorsPosts({ page: page.current, ...filter }, lang))
      .then(() => page.current++)
      .catch((err: AxiosError) => console.log(err))
      .finally(() => setLoading(false));
  };
  const getFilter = (filters: IFilter) => {
    dispatch(postsNull());
    page.current = 1;
    setLoading(true);
    dispatch(getAuthorsPosts({ page: 1, ...filters }, lang))
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
            <Fragment key={'opinions-list'}>
              <View style={style.chapter}>
                <Image source={require('../../../assets/images/opinions.png')} style={style.image} />
                <Text style={style.title}>{t('Авторское мнение')}</Text>
                <Text style={style.description}>Описание категории</Text>
              </View>
              <Filter filter={filter} setFilter={setFilter} getFilter={getFilter} first='fresh' />
              <Posts />
            </Fragment>
          );
        }}
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