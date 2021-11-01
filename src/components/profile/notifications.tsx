import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { Image, StyleSheet, View } from 'react-native';
import { AppText } from '../shared';

export const Notifications: React.FC = () => {
  const { user } = useAppSelector(state => state.global);

  return (
    <View style={style.container}>
      <Image source={require('../../../assets/images/icons/notFound.png')} style={style.notFoundImage}/>
      <AppText style={{ ...style.notFoundText, fontFamily: 'roboto-medium', marginBottom: 4 }}>Уведомлений нет</AppText>
      <AppText style={style.notFoundText}>Начните писать и комментировать, и здесь станет не так пусто</AppText>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 7,
    alignItems: 'center'
  },
  notFoundImage: {
    width: 52,
    height: 52,
  },
  notFoundText: {
    fontSize: 16,

    textAlign: 'center',
  }
})