import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,

  TouchableOpacity,
  View,
} from 'react-native';
import { headerStyles } from '../../styles/header.styles';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { eventFormOpenSet, langSet } from '../../store/global/global.thunks';
import { errorObject, getActiveRouteState } from '../../_data/helpers';
import { blue } from '../../styles/layout.styles';
import { getMainCategories } from '../../store/categories/categories.thunks';
import { AppText } from '../shared';
import { toastShow } from '../../services/notifications.service';
import { handleOpenWithWebBrowser, website } from '../../helpers/helpers';

const navigationTitles = [
  {
    image: require('../../../assets/images/icons/home.png'),
    title: 'Главная',
    name: 'Home',
  },
  {
    image: require('../../../assets/images/icons/special.png'),
    title: 'Популярное',
    name: 'Feed',
  },
  {
    image: require('../../../assets/images/icons/opinions.png'),
    title: 'Мнения',
    name: 'Opinions',
  },
  {
    image: require('../../../assets/images/icons/feed.png'),
    title: 'Спецрепортажи',
    name: 'SpecialReports',
  },
];


export const CustomDrawer: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { lang } = useAppSelector(state => state.global);
  const { categories, hasMore } = useAppSelector(state => state.categories);

  const dispatch = useAppDispatch();
  const activeRoute = getActiveRouteState(navigation.getState());
  const changeLang = (lang: 'ru' | 'uz') => () => {
    dispatch(langSet(lang));
  };
  const getMore = () => {
    dispatch(getMainCategories({ page: 2 }, lang))
      .catch(() => toastShow(errorObject));
  };


  return (
    <SafeAreaView>
      <ScrollView style={style.container}>
        <View style={style.drawerContainer}>
          <TouchableOpacity
            onPress={() => navigation.closeDrawer()}
          >
            <Image source={require('../../../assets/images/icons/close.png')}
                   style={{ ...headerStyles.icons, ...style.close }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image style={headerStyles.logo} source={require('../../../assets/images/logo.png')} />
          </TouchableOpacity>
        </View>
        <View style={style.lang}>
          <AppText style={style.title}>{t('Язык')}:</AppText>
          <TouchableOpacity
            onPress={changeLang('ru')}
          >
            <AppText style={{ ...style.langs, opacity: lang === 'ru' ? 1 : .5 }}>РУ</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={changeLang('uz')}
          >
            <AppText style={{ ...style.langs, opacity: lang === 'uz' ? 1 : .5 }}>УЗ</AppText>
          </TouchableOpacity>
        </View>
        <View style={style.navigation}>
          {
            navigationTitles.map(nav => {
              return (
                <TouchableOpacity
                  style={{
                    ...style.navigationContainer,
                    backgroundColor: activeRoute.name === nav.name ? '#fff' : 'transparent',
                  }}
                  key={nav.title}
                  onPress={() => navigation.navigate(nav.name)}
                >
                  <Image source={nav.image} style={{ ...headerStyles.icons, ...style.navigationImage }}
                         resizeMode='cover' />
                  <AppText style={style.navigationTitle}>{t(nav.title)}</AppText>
                </TouchableOpacity>
              );
            })
          }
        </View>
        <TouchableOpacity
          style={style.event}
          onPress={() => dispatch(eventFormOpenSet(true))}
        >
          <Image source={require('../../../assets/images/icons/plus.png')}
                 style={{ ...headerStyles.icons, ...style.close }} />
          <AppText style={style.eventTitle}>{t('Событие')}</AppText>
        </TouchableOpacity>
        <View style={style.categories}>
          {
            categories.map(category => {
              return (
                <TouchableOpacity
                  style={{
                    ...style.navigationContainer,
                    backgroundColor: activeRoute.name === category.name ? '#fff' : 'transparent',
                  }}
                  key={category.slug}
                  onPress={() => {
                    navigation.navigate('Categories', {
                      slug: category.slug,
                    });
                  }}
                >
                  <Image source={{ uri: category.image }}
                         style={{ ...headerStyles.icons, ...style.navigationImage, display: 'none' }}
                         resizeMode='cover' />
                  <AppText style={style.navigationTitle}>{t(category.name)}</AppText>
                </TouchableOpacity>
              );
            })
          }
          <TouchableOpacity
            style={{ ...style.more, display: hasMore ? 'flex' : 'none' }}
            onPress={getMore}
          >
            <Image source={require('../../../assets/images/icons/chevronDown.png')}
                   style={{ ...headerStyles.icons, ...style.close }} />
            <AppText style={{ ...style.title, color: '#000' }}>{t('Еще')}</AppText>
          </TouchableOpacity>
        </View>
        <View style={style.addInformation}>
          <TouchableOpacity onPress={handleOpenWithWebBrowser(`${website}/ads`)}>
            <AppText style={style.information}>{t('Реклама')}</AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenWithWebBrowser(`${website}/contacts`)}>
            <AppText style={{ ...style.information, marginLeft: 25 }}>{t('Контакты')}</AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenWithWebBrowser(`${website}/resources`)}>
            <AppText style={{ ...style.information, marginTop: 15 }}>{t('Использование материалов')}</AppText>
          </TouchableOpacity>
        </View>

        <AppText style={{ ...style.information, fontWeight: '400' }}>{t('Присоединяйтесь')}:</AppText>
        <View style={style.specialIcons}>
          <TouchableOpacity onPress={handleOpenWithWebBrowser(`https://instagram.com/uznews/`)}>
            <Image source={require('../../../assets/images/icons/intsta.png')}
                   style={{ ...headerStyles.icons, marginRight: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenWithWebBrowser(`https://t.me/uznews`)}>
            <Image source={require('../../../assets/images/icons/telega.png')}
                   style={{ ...headerStyles.icons, marginRight: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenWithWebBrowser(`https://www.facebook.com/uznews.uz`)}>
            <Image source={require('../../../assets/images/icons/faceb.png')} style={{ ...headerStyles.icons }} />
          </TouchableOpacity>
        </View>
        <AppText
          style={{ ...style.information, marginTop: 25, fontWeight: '400' }}>{t('© 2015-2020 «UzNews.uz»')}:</AppText>
        <AppText style={{ ...style.information, marginTop: 10, fontWeight: '400' }}>{t('Сделано в')}:</AppText>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginVertical: 15
  },
  drawerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  close: {
    marginRight: 20,
  },
  lang: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 14,

  },
  langs: {
    fontSize: 14,
    fontFamily: 'roboto-bold',
    marginLeft: 13,
    color: '#000',
  },
  navigation: {
    marginBottom: 10,
  },
  categories: {
    marginVertical: 25,
  },
  navigationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 1,
  },
  navigationImage: {
    marginRight: 10,
    borderRadius: 7,
  },
  navigationTitle: {
    fontSize: 14,
  },
  event: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: blue,
    borderRadius: 7,
  },
  eventTitle: {
    fontSize: 14,

    color: '#fff',
  },
  more: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  addInformation: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
  },
  information: {
    fontSize: 14,
    fontFamily: 'roboto-medium',
    color: 'rgba(0, 0, 0, .7)',
  },
  specialIcons: {
    flexDirection: 'row',
    marginTop: 15,
  },
});