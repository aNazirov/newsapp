import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { headerStyles } from '../../styles/header.styles';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { langSet } from '../../store/global/global.thunks';
import { getActiveRouteState } from '../../_data/helpers';
import { blue } from '../../styles/layout.styles';

const navigationTitles = [
  {
    image: require('../../../assets/images/icons/home.png'),
    title: 'Главная',
    name: 'Home',
  },
  {
    image: require('../../../assets/images/icons/feed.png'),
    title: 'Лента',
    name: 'Feed',
  },
  {
    image: require('../../../assets/images/icons/opinions.png'),
    title: 'Мнения',
    name: 'Opinions',
  },
  {
    image: require('../../../assets/images/icons/special.png'),
    title: 'Спецрепортажи',
    name: 'SpecialReports',
  },
];


export const CustomDrawer: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const activeRoute = getActiveRouteState(navigation.getState());
  const { lang } = useAppSelector(state => state.global);
  const changeLang = (lang: 'ru' | 'uz') => () => {
    dispatch(langSet(lang));
    i18n.changeLanguage(lang);
  };
  return (
    <SafeAreaView>
      <ScrollView style={style.container}>
        <View style={style.drawerContainer}>
          <TouchableOpacity
            onPress={() => navigation.closeDrawer()}
          >
            <Image source={require('../../../assets/images/icons/close.png')} style={style.close} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image style={headerStyles.logo} source={require('../../../assets/images/logo.png')} />
          </TouchableOpacity>
        </View>
        <View style={style.lang}>
          <Text style={style.title}>{t('Язык')}:</Text>
          <TouchableOpacity
            onPress={changeLang('ru')}
          >
            <Text style={{ ...style.langs, opacity: lang === 'ru' ? 1 : .5 }}>РУ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={changeLang('uz')}
          >
            <Text style={{ ...style.langs, opacity: lang === 'uz' ? 1 : .5 }}>УЗ</Text>
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
                  <Image source={nav.image} style={style.navigationImage} resizeMode='cover' />
                  <Text style={style.navigationTitle}>{t(nav.title)}</Text>
                </TouchableOpacity>
              );
            })
          }
        </View>
        <TouchableOpacity style={style.event}>
          <Image source={require('../../../assets/images/icons/plus.png')} style={style.close} />
          <Text style={style.eventTitle}>Cобытие</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  drawerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  close: {
    width: 24,
    height: 24,
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
    fontWeight: '400',
  },
  langs: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 13,
    color: '#000',
  },
  navigation: {
    marginBottom: 10,
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
    width: 24,
    height: 24,
    borderRadius: 7,
  },
  navigationTitle: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 10,
  },
  event: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: blue,
    borderRadius: 7,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
  },
});