import React, { useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { blue } from '../../styles/layout.styles';
import { defaultImage, errorObject } from '../../_data/helpers';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toastShow } from '../../services/notifications.service';
import { getMorePosts } from '../../store/posts/posts.thunks';
import { getUserComments } from '../../store/comments/comments.thunks';
import { Comments, Notifications } from '../../components/profile';
import { AppText } from '../../components/shared';

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

export const Profile: React.FC = () => {
  const page = useRef(2);
  const pageComments = useRef(2);
  const dispatch = useAppDispatch();
  const { user, lang } = useAppSelector(state => state.global);
  const [currentType, setCurrentType] = useState(user?.role.name === 'Автор' ? 'articles' : 'comments');
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

  const { t } = useTranslation();
  return (
    <ScrollView>
      <View style={style.container}>
        <Image source={{ uri: defaultImage }} style={style.avatar} />
        <AppText style={style.name}>Тит</AppText>
        <AppText style={style.aboutMe}>
          Et maxime porro qui sit suscipit est. Fugiat iure ipsa voluptatum aliquid eaque animi.
          Autem tenetur error et vero.
        </AppText>
        <AppText style={{ ...style.edit, color: blue }}>{t('Изменить имя или описание')}</AppText>
        <AppText style={{ ...style.edit, marginBottom: 15 }}>{t('На проекте с')}</AppText>
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
                <AppText
                  style={{
                    ...style.tab,
                    marginRight: 32,
                    color: currentType === tab.type ? '#000' : 'rgba(0, 0, 0, .7)',
                    borderBottomColor: currentType === tab.type ? blue : 'transparent',
                  }}
                >
                  {t(tab.name)}
                </AppText>
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
              <Image source={require('../../../assets/images/icons/plus.png')} style={style.eventIcon} />
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
    borderBottomWidth: 2,
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
    width: 24,
    height: 24,
    marginRight: 20,
  },
});