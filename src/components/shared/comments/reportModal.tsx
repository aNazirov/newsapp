import React from 'react';
import { reportFormOpenSet } from '../../../store/global/global.thunks';
import { AppInput } from '../appInput';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from '../appText';
import { blue } from '../../../styles/layout.styles';
import { ModalContainer } from '../modal';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { reportComment } from '../../../services/global.services';
import { toastShow } from '../../../services/notifications.service';
import { errorObject } from '../../../_data/helpers';
import { commentSet } from '../../../store/comments/comments.thunks';

interface IField {
  name: 'reason',
  placeholder: string
}

const Fields: IField[] = [
  {
    name: 'reason',
    placeholder: 'Причина',
  },
];

export const ReportModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { reportFormOpen, token } = useAppSelector(state => state.global);
  const { comment } = useAppSelector(state => state.comments);
  const { control, handleSubmit, formState: { errors }, setError, reset } = useForm();
  const close = () => {
    reset()
    dispatch(reportFormOpenSet(false))
    dispatch(commentSet(null))
  }
  const commentReport = (data: any) => {
    reportComment(comment?.id, data, token!)
      .then(() => {
        close()
        toastShow({ message: t('Ваша жалоба принята на рассмотрение'), type: 'success', title: '' })
      })
      .catch(err => {
        if (err.response?.data?.errors) {
          return Object.keys(err.response.data.errors).forEach(key => {
            setError(key, {
              type: 'required',
              message: err.response.data.errors[key][0],
            });
          });
        }
        toastShow({ ...errorObject, message: err.response?.data?.message });
      });
  };
  return (
    <ModalContainer
      visible={reportFormOpen}
      hide={close}
      styleContainer={style.container}
    >
      {
        Fields.map(field => {
          return (
            <AppInput
              key={field.name}
              name={field.name}
              style={{
                ...style.textInput,
                height: field.name === 'reason' ? 100 : 'auto',
                justifyContent: 'flex-start',
                textAlignVertical: field.name === 'reason' ? 'top' : 'center',
              }}
              placeholder={t(field.placeholder)}
              error={errors[field.name]}
              control={control}
              multiline={field.name === 'reason'}
              numberOfLines={field.name === 'reason' ? 10 : 1}
            />
          );
        })
      }
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ ...style.button, backgroundColor: 'rgba(0, 0, 0, 0)', marginRight: 15 }}
          onPress={close}
        >
          <AppText style={{ ...style.buttonText }}>{t('Отменить')}</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...style.button, backgroundColor: blue }}
          onPress={handleSubmit(commentReport)}
        >
          <AppText style={{ ...style.buttonText, color: '#fff' }}>{t('Отправить')}</AppText>
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