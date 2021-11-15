import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { AppText } from '../shared';
import { INotification } from '../../interfaces';

interface Props {
  notifications: INotification[];
}

export const Notifications: React.FC<Props> = ({ notifications }) => {
  return (
    <>
      {
        !!notifications.length
          ? notifications.map((notification, i) => {
            return (
              <View key={notification.id} style={{
                ...style.container,
                flexDirection: 'row',
                borderBottomWidth: i === notifications.length - 1 ? 0 : 1,
              }}>
                {
                  notification.foreign_user &&
                  <Image source={{ uri: notification?.foreign_user?.avatar }}
                         style={{ width: 36, height: 36, borderRadius: 7, marginRight: 12 }} />
                }
                <AppText
                  ellipsizeMode='tail'
                  numberOfLines={2}
                  style={{ maxWidth: '90%' }}
                >
                  <AppText style={{ fontFamily: 'roboto-bold' }}>{notification?.foreign_user?.name} </AppText>
                  {notification.notification}
                  <AppText style={{ fontFamily: 'roboto-bold' }}> {notification?.post?.title} </AppText>
                  <AppText style={{ color: 'rgba(0, 0, 0, .7)', fontSize: 12 }}>{notification?.created_at}</AppText>
                </AppText>
              </View>
            );
          })
          : (
            <View style={{ ...style.container, alignItems: 'center' }}>
              <Image source={require('../../../assets/images/icons/notFound.png')} style={style.notFoundImage} />
              <AppText style={{ ...style.notFoundText, fontFamily: 'roboto-medium', marginBottom: 4 }}>
                Уведомлений нет
              </AppText>
              <AppText style={style.notFoundText}>
                Начните писать и комментировать, и здесь станет не так пусто
              </AppText>
            </View>
          )
      }

    </>

  );
};

const style = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 7,
    height: 'auto',
    borderBottomColor: 'rgba(0, 0, 0, .1)',
  },
  notFoundImage: {
    width: 52,
    height: 52,
  },
  notFoundText: {
    fontSize: 16,
    textAlign: 'center',
  },
});