import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from '../shared';
import { headerStyles } from '../../styles/header.styles';
import { Options } from '../shared/options';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export const Comments: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector(state => state.global);
  const { comments } = useAppSelector(state => state.comments);
  const navigation = useNavigation<any>();
  return (
    <>
      {
        !!comments.length
          ? comments.map(comment => {
            return (
              <View style={{ ...style.container, marginBottom: 15 }} key={comment.id}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Posts', { slug: comment.post?.slug })}
                >
                  <AppText style={{ ...style.title, marginBottom: 8 }}>{comment.post?.title}</AppText>
                </TouchableOpacity>
                <View style={style.authorComment}>
                  <Image
                    source={{ uri: user?.avatar }}
                    style={{ ...headerStyles.icons, marginRight: 15, borderRadius: 25 }}
                  />
                  <AppText style={{ ...style.title, marginRight: 15 }}>{comment.user?.name}</AppText>
                  <AppText style={{ fontSize: 12, color: 'rgba(0, 0, 0, .7)' }}>{comment.user?.created_at}</AppText>
                </View>
                <AppText style={{ fontSize: 12 }}>{comment.text}</AppText>
                <Options userId={comment.user?.id} comment={comment} />
              </View>
            );
          })
          : (
            <View style={style.container}>
              <AppText style={style.notFoundText}>{t('Вы еще не оставили ни одного комментария')}</AppText>
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
  },
  authorComment: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  notFoundText: {
    fontSize: 16,
    fontFamily: 'roboto-medium',
    textAlign: 'center',
    marginVertical: 25,
  },
  title: {
    fontSize: 14,
    fontFamily: 'roboto-bold',
  },
});