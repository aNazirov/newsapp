import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppInput, AppText, ModalContainer } from '../shared';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { blue } from '../../styles/layout.styles';
import { createEvent } from '../../services/global.services';
import { toastShow } from '../../services/notifications.service';
import { errorObject } from '../../_data/helpers';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { eventFormOpenSet } from '../../store/global/global.thunks';

interface IField {
  name: 'title' | 'description',
  placeholder: string
}

const Fields: IField[] = [
  {
    name: 'title',
    placeholder: 'Заголовок',
  },
  {
    name: 'description',
    placeholder: 'Описание',
  },
];

export const Event: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { control, handleSubmit, formState: { errors }, setError } = useForm();
  const { eventFormOpen } = useAppSelector(state => state.global);
  const submitEvent = (formdata: any) => {
    const description = {
      time: Date.now(),
      blocks: [
        {
          id: 'bgcVLuI1sV',
          type: 'paragraph',
          data: { text: formdata.description },
        },
      ],
      version: '2.22.2',
    };
    createEvent({ ...formdata, description: JSON.stringify(description) })
      .then(() => {
        dispatch(eventFormOpenSet(false));
        toastShow({ type: 'success', title: 'Успешно', message: 'Событие отправлено' });
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
      visible={eventFormOpen}
      hide={() => dispatch(eventFormOpenSet(false))}
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
                height: field.name === 'description' ? 100 : 'auto',
                justifyContent: 'flex-start',
                textAlignVertical: field.name === 'description' ? 'top' : 'center',
              }}
              placeholder={t(field.placeholder)}
              error={errors[field.name]}
              control={control}
              multiline={field.name === 'description'}
              numberOfLines={field.name === 'description' ? 10 : 1}
            />
          );
        })
      }
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ ...style.button, backgroundColor: 'rgba(0, 0, 0, 0)', marginRight: 15 }}
          onPress={() => dispatch(eventFormOpenSet(false))}
        >
          <AppText style={{ ...style.buttonText }}>{t('Отменить')}</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...style.button, backgroundColor: blue }}
          onPress={handleSubmit(submitEvent)}
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