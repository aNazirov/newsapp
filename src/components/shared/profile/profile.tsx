import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { toastShow } from '../../../services/notifications.service';
import { errorObject } from '../../../_data/helpers';
import { getAlertNotifications } from '../../../store/notifications/notifications.thunks';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, Modal, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { logout } from '../../../store/global/global.thunks';
import { headerStyles } from '../../../styles/header.styles';
import { AppText } from '../appText';
import { blue } from '../../../styles/layout.styles';
import { Notifications } from '../../profile';

const notificationIcon = require('../../../../assets/images/icons/notification.png');
const notificationsIcon = require('../../../../assets/images/icons/notifications.png');

export const Profile = () => {
  const { path } = useRoute();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const { user, token } = useAppSelector(state => state.global);
  const { notificationsCount, alertNotifications } = useAppSelector(state => state.notifications);
  const getNotifications = () => {
    setLoading(true);
    if (!alertNotifications.length) {
      return dispatch(getAlertNotifications(token!))
        .then(() => setLoading(false))
        .catch(() => toastShow(errorObject));
    }
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
  }, [path]);
  return (
    <View style={style.container}>
      <View
        style={style.notifications}
      >
        <TouchableOpacity
          onPress={() => {
            getNotifications();
            setNotification(true);
            setProfile(false);
          }}
        >
          <Image source={notificationsCount ? notificationsIcon : notificationIcon} style={{ ...headerStyles.icons }} />
        </TouchableOpacity>
        <Modal
          visible={notification}
          animationType='fade'
          transparent={true}
        >
          <View
            style={style.popupContainer}
            onTouchStart={() => {
              setNotification(false);
            }}
          >
            <SafeAreaView>
              <View
                style={style.popup}
                onTouchStart={e => e.stopPropagation()}
              >
                {
                  loading
                    ? <View style={{ height: 100, justifyContent: 'center' }}><ActivityIndicator size='small' color={blue} /></View>
                    : <Notifications />
                }
                <TouchableOpacity
                  onPress={() => {
                    setNotification(false);
                    navigation.navigate('Profile', { notification: true });
                  }}
                >
                  <View style={{
                    borderTopWidth: 1,
                    borderTopColor: 'rgba(0, 0, 0, .1)'
                  }}>
                    <AppText style={style.allNotifications}>{t('Все уведомления')}</AppText>
                  </View>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        </Modal>
      </View>
      <View
        style={style.profile}
      >
        <TouchableOpacity
          onPress={() => {
            setNotification(false);
            setProfile(true);
          }}
        >
          <Image source={{ uri: user?.avatar }} style={{ ...headerStyles.icons, borderRadius: 7 }} />
        </TouchableOpacity>
        <Modal
          visible={profile}
          animationType='fade'
          transparent={true}
        >
          <View
            style={{ ...style.popupContainer, alignItems: 'flex-end' }}
            onTouchStart={() => {
              setProfile(false);
            }}
          >
            <SafeAreaView>
              <View
                style={{ ...style.popup, width: 200, marginRight: 15 }}
                onTouchStart={e => e.stopPropagation()}
              >
                <AppText style={{ ...style.profileTab, fontSize: 10, paddingBottom: 0 }}>{t('Профиль')}</AppText>
                <TouchableOpacity
                  onPress={() => {
                    setProfile(false);
                    navigation.navigate('Profile');
                  }}
                >
                  <AppText style={{ ...style.profileTab }}>{user?.name}</AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setProfile(false);
                    navigation.navigate('Settings');
                  }}
                >
                  <AppText style={{ ...style.profileTab }}>{t('Настройки')}</AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => dispatch(logout())}
                >
                  <AppText style={{ ...style.profileTab }}>{t('Выйти')}</AppText>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        </Modal>

      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  notifications: {
    marginRight: 22,
  },
  popupContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    zIndex: 10,
  },
  popup: {
    marginTop: 40,
    backgroundColor: '#fff',
    borderRadius: 7,
    width: 300,
  },
  allNotifications: {
    paddingVertical: 8,
    textAlign: 'center',
    color: blue,
    fontFamily: 'roboto-medium',
    fontSize: 14,
  },
  profile: {
    position: 'relative',
  },
  profileTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    color: 'rgba(0, 0, 0, .7)',
  },
});