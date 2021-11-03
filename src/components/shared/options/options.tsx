import React, { useState } from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from '../appText';
import { useTranslation } from 'react-i18next';
import { deleteComment, reportComment } from '../../../services/global.services';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { commentDeleteAction } from '../../../store/comments/comments.thunks';
import { toastShow } from '../../../services/notifications.service';
import { errorObject, getActiveRouteState } from '../../../_data/helpers';
import { loginFormOpenSet } from '../../../store/global/global.thunks';
import { useNavigation } from '@react-navigation/native';
import { headerStyles } from '../../../styles/header.styles';

interface Props {
  userId: number,
  commentId: number,
}

export const Options: React.FC<Props> = ({ commentId, userId }) => {
  const { t } = useTranslation();
  const activeRoute = getActiveRouteState(useNavigation().getState());
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const { user, token } = useAppSelector(state => state.global);
  const commentDelete = () => {
    deleteComment(commentId, token!)
      .then(() => {
        dispatch(commentDeleteAction(commentId));
        toastShow({ type: 'success', message: 'Сообщение успешно удалено', title: 'Успешно' });
      })
      .catch(() => toastShow(errorObject));

  };
  const commentReport = () => {
    if (!user) return dispatch(loginFormOpenSet(true));
    reportComment(commentId, token!)
      .then(() => toastShow({ type: 'success', message: 'Ваша жалоба принята на рассмотрение', title: 'Успешно' }))
      .catch(() => toastShow(errorObject));
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => setShow(true)}
      >
        <Image source={require('../../../../assets/images/icons/dots.png')} style={headerStyles.icons} />
      </TouchableOpacity>
      <Modal
        visible={show}
        transparent={true}
        animationType='fade'
      >
        <View
          style={style.popupContainer}
          onTouchStart={() => setShow(false)}
        >
          <View
            style={{ ...style.popup }}
            onTouchStart={e => e.stopPropagation()}
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
              <View style={{ backgroundColor: '#fff', borderRadius: 7, marginVertical: 25 }}>
                <AppText style={{ ...style.profileTab}}>
                  {t('Отменить')}
                </AppText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const style = StyleSheet.create({
  popupContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0,0 ,.7)',
  },
  popup: {
    marginTop: 40,
    width: '90%',
  },
  profile: {},
  profileTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, .7)',
  },
});