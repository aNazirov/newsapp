import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Filter, Posts } from '../../components/shared';
import { getFeedPosts, postsNull } from '../../store/posts/posts.thunks';
import { clearStore } from '../../helpers/helpers';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';
import { Indicators } from '../../components/shared/indicators';
import { toastShow } from '../../services/notifications.service';
import { errorObject } from '../../_data/helpers';

interface IFilter {
  fresh?: boolean;
  popular?: boolean;
}

interface Props {
  navigation: NavigationProp<any>;
}

const hide = require('../../../assets/images/icons/hide.png');
const show = require('../../../assets/images/icons/show.png');

export const Feed: React.FC<Props> = ({}) => {
  const { t } = useTranslation();
  const page = useRef(2);
  const [open, setOpen] = useState(true);
  const [filter, setFilter] = useState<IFilter>({ popular: true });
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { lang } = useAppSelector(state => state.global);
  useEffect(() => {
    clearStore(dispatch);
    dispatch(getFeedPosts({ page: 1, ...filter }, lang));
  }, [lang]);
  const { hotPosts, pageCount } = useAppSelector(state => state.posts);
  const getMore = () => {
    if (page.current > pageCount) return;
    setLoading(true);
    return dispatch(getFeedPosts({ page: page.current, ...filter }, lang))
      .then(() => page.current++)
      .catch(() => toastShow(errorObject))
      .finally(() => setLoading(false));
  };
  const getFilter = (filters: IFilter) => {
    dispatch(postsNull());
    page.current = 1;
    setLoading(true);
    dispatch(getFeedPosts({ page: 1, ...filters }, lang))
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
            <Fragment key={'feed-list'}>
              <View style={style.container}>
                <View style={style.chapter}>
                  <Text style={style.title}>{hotPosts?.range}</Text>
                  <TouchableOpacity
                    style={{ ...style.more }}
                    onPress={() => setOpen(prev => !prev)}
                  >
                    <Image
                      source={open ? hide : show}
                      style={style.icon}
                      resizeMode='contain'
                    />
                    <Text style={{ ...style.moreTitle }}>{t(open ? 'свернуть' : 'показать')}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ display: open ? 'flex' : 'none' }}>
                  {
                    hotPosts?.hotPosts.map(post => {
                      return (
                        <Fragment key={post.slug}>
                          <View style={style.hotPosts}>
                            <Text style={style.time}>{post.created_at.split(', ')[1]}</Text>
                            <Text style={style.description}>
                              {post.title}
                              {
                                Platform.OS === 'ios' &&
                                <Indicators
                                  comments={post.comments_count}
                                  views={post.views_count}
                                  color='rgba(0, 0, 0, .7)'
                                  light={false}
                                  size={14}
                                  fontSize={12}
                                />
                              }
                            </Text>
                          </View>
                          {
                            Platform.OS === 'android' &&
                            <View style={style.androidIndicators}>
                              <Indicators
                                comments={post.comments_count}
                                views={post.views_count}
                                color='rgba(0, 0, 0, .7)'
                                light={false}
                                size={14}
                                fontSize={12}
                              />
                            </View>
                          }
                        </Fragment>
                      );
                    })
                  }
                </View>
              </View>
              <Filter filter={filter} setFilter={setFilter} getFilter={getFilter} first='popular' />
              <Posts />
            </Fragment>
          );
        }}
        keyExtractor={(item, index) => index.toString() + 'feed-list'}
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
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  chapter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 7,
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 31,
  },
  more: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  moreTitle: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    color: 'rgba(0, 0, 0, .9)',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  hotPosts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 13,
    fontWeight: '400',
    width: '12%',
    lineHeight: 21,
    color: 'rgba(0, 0, 0, .7)',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    color: '#000',
    width: '85%',
  },
  androidIndicators: {
    width: '85%',
    marginLeft: 'auto',
  },
});