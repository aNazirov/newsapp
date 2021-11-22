import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from '../appText';
import { useTranslation } from 'react-i18next';
import { deleteComment, reportComment } from '../../../services/global.services';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { commentDeleteAction, commentSet } from '../../../store/comments/comments.thunks';
import { toastShow } from '../../../services/notifications.service';
import { errorObject, getActiveRouteState } from '../../../_data/helpers';
import { loginFormOpenSet, reportFormOpenSet } from '../../../store/global/global.thunks';
import { useNavigation } from '@react-navigation/native';
import { headerStyles } from '../../../styles/header.styles';
import { ModalContainer } from '../modal';
import { IComment } from '../../../interfaces';

interface Props {
  userId: number,
  comment: IComment,
}

export const Options: React.FC<Props> = ({ comment, userId }) => {
  const { t } = useTranslation();
  const activeRoute = getActiveRouteState(useNavigation().getState());
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const { user, token } = useAppSelector(state => state.global);
  const commentDelete = () => {
    deleteComment(comment.id, token!)
      .then(() => {
        dispatch(commentDeleteAction(comment.id));
        toastShow({ type: 'success', message: 'Сообщение успешно удалено', title: 'Успешно' });
      })
      .catch(() => toastShow(errorObject));

  };
  const commentReport = () => {
    setShow(false)
    if (!user) return dispatch(loginFormOpenSet(true));
    dispatch(commentSet(comment))
    dispatch(reportFormOpenSet(true))
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => setShow(true)}
      >
        <Image source={require('../../../../assets/images/icons/dots.png')} style={headerStyles.icons} />
      </TouchableOpacity>
      <ModalContainer
        visible={show}
        hide={() => setShow(false)}
        styleContainer={style.popup}
        styleMainContainer={{justifyContent: 'flex-end'}}
      >
        <View style={{ backgroundColor: '#fff', borderRadius: 7 }}>
          {
            userId === user?.id &&
            <TouchableOpacity
              onPress={commentDelete}
            >
              <AppText style={{
                ...style.profileTab,
                borderBottomColor: 'rgba(0, 0, 0, .1)',
                borderBottomWidth: activeRoute.name !== 'Profile' ? 1 : 0,
              }}>{t('Удалить')}</AppText>
            </TouchableOpacity>
          }
          {
            activeRoute.name !== 'Profile' &&
            <TouchableOpacity
              onPress={commentReport}
            >
              <AppText style={{ ...style.profileTab }}>{t('Пожаловаться')}</AppText>
            </TouchableOpacity>
          }
        </View>

        <TouchableOpacity
          onPress={() => setShow(false)}
        >
          <View style={{ backgroundColor: '#fff', borderRadius: 7, marginBottom: 25, marginTop: 15 }}>
            <AppText style={{ ...style.profileTab }}>
              {t('Отменить')}
            </AppText>
          </View>
        </TouchableOpacity>
      </ModalContainer>
    </View>
  );
};
const style = StyleSheet.create({
  popup: {
    marginTop: 40,
    width: '90%',
  },
  profile: {},
  profileTab: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    fontSize: 14,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, .7)',
  },
});