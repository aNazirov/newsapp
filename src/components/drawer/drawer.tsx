import React, { useEffect, useRef } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawer } from './customDrawer';
import { Home } from '../../screens/home';
import { Opinions } from '../../screens/opinions';
import { SpecialReports } from '../../screens/specialReports';
import { Header } from '../header';
import { LayoutStyles } from '../../styles/layout.styles';
import { Feed } from '../../screens/feed';
import { Categories } from '../../screens/categories';
import { Authors } from '../../screens/authors';
import { Tags } from '../../screens/tags';
import { Search } from '../../screens/search';
import { Profile, Settings } from '../../screens/profile';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Post } from '../../screens/post';
import { autoLogin, getGlobalData, langSet } from '../../store/global/global.thunks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { toastShow } from '../../services/notifications.service';
import {
  registerForPushNotificationsAsync,
  schedulePushNotification,
  sendPushNotification,
} from '../../helpers/helpers';
import * as Notifications from 'expo-notifications';

const Drawer = createDrawerNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const DrawerNavigation: React.FC = () => {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const dispatch = useAppDispatch()
  const { token, lang } = useAppSelector(state => state.global);

  useEffect(() => {
    dispatch(autoLogin());
    AsyncStorage.getItem('lang')
      .then((result: any) => dispatch(langSet(result || 'ru')));
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      toastShow({type: 'info', title: '', message: `${token}`})
      sendPushNotification(token);
    })
    notificationListener.current = Notifications.addNotificationReceivedListener(({ request: { content: { title, body, data} } }) => {
      (title || body || data) &&
      schedulePushNotification({title: title || '', body: body || '', data: JSON.stringify(data || '')})
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('response', response)
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [])
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if(state.isConnected) {
        dispatch(getGlobalData(lang));
      }
      if (!state.isConnected) {
        toastShow({type: 'error', title: 'Соединение не установлено', message: 'Проверте соединение с интернетом'})
      }
    });
    return () => {
      unsubscribe()
    }
  }, [lang])

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#f1f1f1',
        },
        unmountOnBlur: true,
      }}
      initialRouteName='Home'
    >
      <Drawer.Screen
        name='Home'
        component={Home}
        options={{
          header: (props) => <Header style={LayoutStyles.header} {...props} />,
        }}
      />
      <Drawer.Screen
        name='Opinions'
        component={Opinions}
        options={{
          header: (props) => <Header style={LayoutStyles.header} {...props} />,
        }}
      />
      <Drawer.Screen
        name='SpecialReports'
        component={SpecialReports}
        options={{
          header: (props) => <Header style={LayoutStyles.header} {...props} />,
        }}
      />
      <Drawer.Screen
        name='Feed'
        component={Feed}
        options={{
          header: (props) => <Header style={LayoutStyles.header} {...props} />,
        }}
      />
      <Drawer.Screen
        name='Search'
        component={Search}
        options={{
          header: (props) => <Header style={LayoutStyles.header} {...props} />,
        }}
      />
      <Drawer.Screen
        name='Categories'
        component={Categories}
        options={{
          header: (props) => <Header style={LayoutStyles.header} {...props} />,
        }}
      />
      <Drawer.Screen
        name='Posts'
        component={Post}
        options={{
          header: (props) => <Header style={LayoutStyles.header} {...props} />,
        }}
      />
      <Drawer.Screen
        name='Authors'
        component={Authors}
        options={{
          header: (props) => <Header style={LayoutStyles.header} {...props} />,
        }}
      />
      <Drawer.Screen
        name='Tags'
        component={Tags}
        options={{
          header: (props) => <Header style={LayoutStyles.header} {...props} />,
        }}
      />
      {
        !!token &&
        <Drawer.Screen
          name='Profile'
          component={Profile}
          options={{
            header: (props) => <Header style={LayoutStyles.header} {...props} />,
          }}
        />
      }
      {
        !!token &&
        <Drawer.Screen
          name='Settings'
          component={Settings}
          options={{
            header: (props) => <Header style={LayoutStyles.header} {...props} />,
          }}
        />
      }
    </Drawer.Navigator>
  );
};