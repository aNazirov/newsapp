import React from 'react';
import { logout } from '../../../store/global/global.thunks';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from '../appText';
import { red } from '../../../styles/layout.styles';
import { ModalContainer } from '../modal';
import { useAppDispatch } from '../../../store/hooks';
import { useTranslation } from 'react-i18next';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Logout: React.FC<Props> = ({ open, setOpen }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  return (
    <ModalContainer
      visible={open}
      hide={() => setOpen(false)}
      styleContainer={style.container}
    >
      <AppText style={{marginBottom: 20, fontFamily: 'roboto-medium'}}>{t('Вы уверены что хотите выйти?')}</AppText>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={{ ...style.button, backgroundColor: 'rgba(0, 0, 0, 0)', marginRight: 15 }}
          onPress={() => setOpen(false)}
        >
          <AppText style={{ ...style.buttonText }}>{t('Отменить')}</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...style.button, backgroundColor: red }}
          onPress={() => {
            setOpen(false)
            dispatch(logout());
          }}
        >
          <AppText style={{ ...style.buttonText, color: '#fff' }}>{t('Выйти')}</AppText>
        </TouchableOpacity>
      </View>
    </ModalContainer>
  );
};

const style = StyleSheet.create({
  container: {
    width: '90%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  textInput: {
    backgroundColor: '#f3f3f3',
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 9,
    fontFamily: 'roboto-regular',
    fontSize: 14,
    marginBottom: 15,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
  },
  buttonText: {
    fontFamily: 'roboto-medium',
    fontSize: 14,
  },
});