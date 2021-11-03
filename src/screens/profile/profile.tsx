import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { blue } from '../../styles/layout.styles';
import { errorObject } from '../../_data/helpers';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toastShow } from '../../services/notifications.service';
import { getMorePosts } from '../../store/posts/posts.thunks';
import { commentsNull, getUserComments } from '../../store/comments/comments.thunks';
import { Comments, Notifications } from '../../components/profile';
import { AppText } from '../../components/shared';
import { headerStyles } from '../../styles/header.styles';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { getNotifications, notificationsNull } from '../../store/notifications/notifications.thunks';

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

export const Profile: React.FC<Props> = ({ route }) => {
  const { t } = useTranslation();
  const page = useRef(2);
  const pageComments = useRef(2);
  const pageNotifications = useRef(2);
  const dispatch = useAppDispatch();
  const { user, lang, token } = useAppSelector(state => state.global);
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
    dispatch(getMorePosts('authors', user?.id, { page: page.current }, lang))
      .then(() => {
        page.current++;
      })
      .catch(() => toastShow(errorObject));

  };
  const getMoreComments = () => {
    dispatch(getUserComments({ page: pageComments.current }))
      .then(() => {
        pageComments.current++;
      })
      .catch(() => toastShow(errorObject));

  };
  const getMoreNotifications = () => {
    dispatch(getNotifications({ page: pageNotifications.current }, token!))
      .then(() => {
        pageNotifications.current++;
      })
      .catch(() => toastShow(errorObject));
  };
  useEffect(() => {
    dispatch(commentsNull());
    dispatch(notificationsNull());
    dispatch(getUserComments({ page: 1 }, token!))
      .catch(() => toastShow(errorObject));
    dispatch(getNotifications({ page: 1 }, token!))
      .catch(() => toastShow(errorObject));
    if (user?.role.name === 'Автор') {
      dispatch(getMorePosts('authors', user.id, { page: 1 }, lang));
    }
  }, []);
  return (
    <ScrollView
    >
      <View style={style.container}>
        <Image source={{ uri: user?.avatar }} style={style.avatar} />
        <AppText style={style.name}>{user?.name}</AppText>
        <AppText style={style.aboutMe}>{user?.about_me}</AppText>
        <AppText style={{ ...style.edit, color: blue }}>{t('Изменить имя или описание')}</AppText>
        <AppText style={{ ...style.edit, marginBottom: 15 }}>{t('На проекте с')} {user?.created_at}</AppText>
        <TouchableOpacity style={style.settings}>
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
      }
      {
        currentType === 'notifications' && (
          <Notifications />
        )
      }
      {
        currentType === 'comments' && (
          <Comments />
        )
      }
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'relative',
    paddingHorizontal: 15,
    paddingTop: 15,
    marginBottom: 25,
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

    marginBottom: 10,
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