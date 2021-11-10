import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, TextInput, View } from 'react-native';
import { Filter, Posts } from '../../components/shared';
import { getSearchPosts, postsNull } from '../../store/posts/posts.thunks';
import { clearStore } from '../../helpers/helpers';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { toastShow } from '../../services/notifications.service';
import { errorObject } from '../../_data/helpers';
import { useTranslation } from 'react-i18next';
import { AppText } from '../../components/shared';
import { headerStyles } from '../../styles/header.styles';
import { Loader } from '../../components/shared/loader';

interface IFilter {
  fresh?: boolean;
  popular?: boolean;
}

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export const Search: React.FC<Props> = ({ route, navigation }) => {
  const page = useRef(2);
  const { t } = useTranslation();
  const [text, setText] = useState(route.params?.text);
  const [filter, setFilter] = useState<IFilter>({ fresh: true });
  const [firstLoading, setFirstLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { lang } = useAppSelector(state => state.global);
  useEffect(() => {
    setFirstLoading(true);
    clearStore(dispatch);
    dispatch(getSearchPosts({ page: 1, ...filter, text }, lang))
      .finally(() => setFirstLoading(false));
  }, [lang, route.params?.text]);
  const { pageCount, postsCount } = useAppSelector(state => state.posts);
  const getMore = () => {
    if (!pageCount) return;
    setLoading(true);
    return dispatch(getSearchPosts({ page: page.current, ...filter, text }, lang))
      .then(() => page.current++)
      .catch(() => toastShow(errorObject))
      .finally(() => setLoading(false));
  };
  const getFilter = (filters: IFilter) => {
    dispatch(postsNull());
    page.current = 1;
    setLoading(true);
    dispatch(getSearchPosts({ page: 1, ...filters, text }, lang))
      .then(() => page.current++)
      .catch(() => toastShow(errorObject))
      .finally(() => setLoading(false));
  };
  return (
    <FlatList
      data={[1]}
      renderItem={() => {
        return (
          <Fragment key={`${route.params?.text}-list`}>
            <View style={style.chapter}>
              <AppText style={style.title}>{t('Поиск')}</AppText>
              <View>
                <Image source={require('../../../assets/images/icons/searchL.png')}
                       style={{ ...headerStyles.icons, ...style.inputIcon }} />
                <TextInput
                  style={style.input} defaultValue={route.params?.text}
                  onChangeText={val => setText(val)}
                  onSubmitEditing={() => navigation.setParams({ text })}
                  value={text}
                />
              </View>
              <AppText style={style.description}>Результатов: примерно {postsCount}</AppText>
            </View>
            <Filter filter={filter} setFilter={setFilter} getFilter={getFilter} first='fresh' />
            <Loader loading={firstLoading}>
              <Posts />
              {
                loading &&
                <ActivityIndicator size='large' color='#0000ff' />
              }
            </Loader>
          </Fragment>
        );
      }}
      keyExtractor={(item, index) => index.toString() + `${route.params?.text}-list`}
      onEndReached={getMore}
    />
  );
};
const style = StyleSheet.create({
  chapter: {
    padding: 15,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 7,
    fontSize: 12,
    paddingVertical: 4,
    paddingLeft: 40,
    paddingRight: 12,
  },
  inputIcon: {
    position: 'absolute',
    zIndex: 10,
    top: 4,
    left: 6,
  },
  title: {
    fontSize: 24,
    fontFamily: 'roboto-bold',
    lineHeight: 32,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,

    lineHeight: 21,
    marginTop: 10,
  },
});