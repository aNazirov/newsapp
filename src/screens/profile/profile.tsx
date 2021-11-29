import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { blue } from '../../styles/layout.styles';
import { errorObject } from '../../_data/helpers';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toastShow } from '../../services/notifications.service';
import { getMorePosts } from '../../store/posts/posts.thunks';
import { getUserComments } from '../../store/comments/comments.thunks';
import { Comments, Notifications } from '../../components/profile';
import { AppText, Posts } from '../../components/shared';
import { headerStyles } from '../../styles/header.styles';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { getNotifications } from '../../store/notifications/notifications.thunks';
import { clearStore } from '../../helpers/helpers';
import { AxiosError } from 'axios';

interface ITab {
  id: number;
  name: string;
  type: string;
}

const Tabs = [
  { id: 0, name: 'Статьи', type: 'articles' },
  { id: 1, name: 'Комментарии', type: 'comments' },
  { id: 2, name: 'Уведомления', type: 'notifications' },
];

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export const Profile: React.FC<Props> = ({ route, navigation }) => {
  const { t } = useTranslation();
  const page = useRef(2);
  const pageComments = useRef(2);
  const pageNotifications = useRef(2);
  const dispatch = useAppDispatch();
  const { user, lang, token } = useAppSelector(state => state.global);
  const { posts, pageCount } = useAppSelector(state => state.posts);
  const { hasMore: hasMoreComments } = useAppSelector(state => state.comments);
  const { notifications, hasMore: hasMoreNotification } = useAppSelector(state => state.notifications);
  const [loading, setLoading] = useState(false);
  const [currentType, setCurrentType] = useState(route.params?.notification ? 'notifications' : user?.role.name === 'Автор' ? 'articles' : 'comments');
  const [tabs, setTabs] = useState<ITab[]>(Tabs);

  const handleChangeActiveTab = (tab: ITab) => {
    setTabs(tabs.map((item) => {
      if (item.id === tab.id) {
        setCurrentType(tab.type);
        return item;
      }
      return item;
    }));
  };

  const getMore = () => {
    if (!pageCount) return;
    setLoading(true);
    dispatch(getMorePosts('authors', user?.id, { page: page.current }, lang))
      .then(() => {
        page.current++;
      })
      .catch((err: AxiosError) => toastShow({ ...errorObject, message: err.response?.data?.result?.message }))
      .finally(() => setLoading(false));
  };
  const getMoreComments = () => {
    if (!hasMoreComments) return;
    setLoading(true);
    dispatch(getUserComments({ page: pageComments.current }))
      .then(() => {
        pageComments.current++;
      })
      .catch((err: AxiosError) => toastShow({ ...errorObject, message: err.response?.data?.result?.message }))
      .finally(() => setLoading(false));
  };
  const getMoreNotifications = () => {
    if (!hasMoreNotification) return;
    setLoading(true);
    dispatch(getNotifications({ page: pageNotifications.current }, token!))
      .then(() => {
        pageNotifications.current++;
      })
      .catch((err: AxiosError) => toastShow({ ...errorObject, message: err.response?.data?.result?.message }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    clearStore(dispatch)
    dispatch(getUserComments({ page: 1 }, token!))
      .catch((err: AxiosError) => toastShow({ ...errorObject, message: err.response?.data?.result?.message }))
    dispatch(getNotifications({ page: 1 }, token!))
      .catch((err: AxiosError) => toastShow({ ...errorObject, message: err.response?.data?.result?.message }))
    if (user?.role.name === 'Автор') {
      dispatch(getMorePosts('authors', user.id, { page: 1 }, lang))
        .catch((err: AxiosError) => toastShow({ ...errorObject, message: err.response?.data?.result?.message }))
    }
  }, []);
  return (
    <FlatList
      data={[1]}
      renderItem={() => {
        return (
          <React.Fragment key='profile-list'>
            <View style={style.container}>
              <Image source={{ uri: user?.avatar }} style={style.avatar} />
              <AppText style={style.name}>{user?.name}</AppText>
              <AppText style={{ ...style.aboutMe, marginBottom: user?.about_me ? 10 : 0}}>{user?.about_me}</AppText>
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <AppText style={{ ...style.edit, color: blue }}>{t('Изменить имя или описание')}</AppText>
              </TouchableOpacity>
              <AppText style={{ ...style.edit, marginBottom: 15 }}>{t('На проекте с')} {user?.created_at}</AppText>
              <TouchableOpacity
                style={style.settings}
                onPress={() => navigation.navigate('Settings')}
              >
                <Image source={require('../../../assets/images/icons/settings.png')} />
              </TouchableOpacity>

              <View style={style.tabs}>
                {tabs.map((tab) => {
                  if (tab.name === 'Статьи' && user?.role.name !== 'Автор') return null;
                  return (
                    <TouchableOpacity
                      key={tab.id + tab.type}
                      onPress={() => handleChangeActiveTab(tab)}
                    >
                      <View style={{
                        borderBottomColor: currentType === tab.type ? blue : 'rgba(0, 0, 0, 0)',
                        borderBottomWidth: 2,
                        marginRight: 32,
                      }}>
                        <AppText
                          style={{
                            ...style.tab,
                            color: currentType === tab.type ? '#000' : 'rgba(0, 0, 0, .7)',
                          }}
                        >
                          {t(tab.name)}
                        </AppText>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            {
              currentType === 'articles' && (
                !!posts.length
                  ? <Posts />
                  : (
                    <View style={style.notFoundContainer}>
                      <AppText style={style.notFoundText}>
                        Если у вас есть интересная идея для статьи, не стесняйтесь и скорее начинайте писать
                      </AppText>
                      <TouchableOpacity style={style.event}>
                        <Image
                          source={require('../../../assets/images/icons/plus.png')}
                          style={{ ...headerStyles.icons, ...style.eventIcon }}
                        />
                        <AppText style={style.eventTitle}>{t('Событие')}</AppText>
                      </TouchableOpacity>
                    </View>
                  )
              )
            }
            {
              currentType === 'notifications' && (
                <Notifications notifications={notifications}/>
              )
            }
            {
              currentType === 'comments' && (
                <Comments />
              )
            }
            {
              loading &&
              <ActivityIndicator size='large' color='#0000ff' />
            }
          </React.Fragment>
        );
      }}
      keyExtractor={(item, index) => index.toString() + `profile-list`}
      onEndReached={() => {
        if (currentType === 'articles') return getMore();
        if (currentType === 'comments') return getMoreComments();
        if (currentType === 'notifications') return getMoreNotifications();
      }}
    />
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'relative',
    paddingHorizontal: 15,
    paddingTop: 15,
    marginBottom: 25,
    borderRadius: 7,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 7,
  },
  name: {
    fontSize: 30,
    fontFamily: 'roboto-bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutMe: {
    fontSize: 14,
  },
  edit: {
    fontSize: 16,
    marginBottom: 10,
  },
  settings: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'roboto-medium',
    paddingHorizontal: 4,
    paddingBottom: 10,
  },
  notFoundContainer: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  notFoundText: {
    fontSize: 16,
    fontFamily: 'roboto-medium',
    textAlign: 'center',
    marginVertical: 20,
  },
  event: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: blue,
    borderRadius: 7,
  },
  eventTitle: {
    fontSize: 14,

    color: '#fff',
  },
  eventIcon: {
    marginRight: 20,
  },
});