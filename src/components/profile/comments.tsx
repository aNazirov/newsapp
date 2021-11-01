import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../shared';

export const Comments: React.FC = () => {
  const { user } = useAppSelector(state => state.global);
  const { comments } = useAppSelector(state => state.comments);

  return (
    <View style={style.container}>
      <AppText style={style.notFoundText}>Вы еще не оставили ни одного комментария</AppText>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 7
  },
  notFoundText: {
    fontSize: 16,
    fontFamily: 'roboto-medium',
    textAlign: 'center',
    marginVertical: 25,
  }
})