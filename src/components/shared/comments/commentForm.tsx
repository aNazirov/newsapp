import React, { useState } from 'react';
import { AppInput } from '../appInput';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import { headerStyles } from '../../../styles/header.styles';
import { AppText } from '../appText';
import { blue } from '../../../styles/layout.styles';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ModalContainer } from '../modal';
import { commentFormOpenSet, loginFormOpenSet } from '../../../store/global/global.thunks';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import { createCommentService } from '../../../services/comments.service';
import { commentSet, commentSetToComments } from '../../../store/comments/comments.thunks';
import { toastShow } from '../../../services/notifications.service';
import { errorObject } from '../../../_data/helpers';

export const CommentForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <View
      style={{ ...style.formCommentDummy, height: 'auto' }}
      onTouchStart={() => {
        dispatch(commentFormOpenSet(true));
      }}
    >
      <TextInput
        onFocus={(e: any) => e.target.blur()}
        style={{ ...style.textInput }}
        placeholder={`${t('Комментарий')}...`}

      />
      <Image
        source={require('../../../../assets/images/icons/image.png')}
        style={{ ...style.formCommentDummyImage, ...headerStyles.icons }}
      />
    </View>
  );
};

export const CommentModal: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { control, handleSubmit, formState: { errors }, setError, reset } = useForm();
  const { user, token, commentFormOpen } = useAppSelector(state => state.global);
  const { post } = useAppSelector(state => state.posts);
  const { comment } = useAppSelector(state => state.comments);
  const [image, setImage] = useState<ImageInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const createComment = (data: any) => {
    if (!user || !token) {
      dispatch(commentFormOpenSet(false));
      return dispatch(loginFormOpenSet(true));
    }
    setLoading(true);
    createCommentService({
      ...data,
      user_id: comment?.user.id,
      post_id: post?.id,
      comment_id: comment?.parent_id ? comment?.parent_id : comment?.id,
      image,
    }, token)
      .then(comment => {
        onClose();
        if (comment.status === 'banned') {
          reset();
          return toastShow({ type: 'info', title: '', message: comment.deleted_reason });
        }
        dispatch(commentSetToComments(comment));
        reset();
      })
      .catch((err: any) => {
        if (err.response?.data?.errors) {
          return Object.keys(err.response.data.errors).forEach(key => {
            setError(key, {
              type: 'required',
              message: err.response.data.errors[key][0],
            });
          });
        }
        onClose();
        return toastShow(errorObject);
      })
      .finally(() => setLoading(false));
  };
  const onClose = () => {
    dispatch(commentSet(null));
    dispatch(commentFormOpenSet(false));
  };
  return (
    <ModalContainer
      visible={commentFormOpen}
      hide={onClose}
      styleContainer={style.container}
    >
      <AppText style={style.title}>{t('Комментирование')}</AppText>
      {
        comment &&
        <View style={style.head}>
          <Image source={{ uri: comment.user.avatar }} style={style.avatar} />
          <View style={style.meta}>
            <AppText style={style.name}>{comment.user.name}</AppText>
            <AppText style={style.comment}>{comment.text}</AppText>
          </View>
        </View>
      }
      <View style={{ ...style.formComment, flex: 1 }}>
        <AppInput
          name='text'
          style={{
            ...style.textInput,
            height: '100%',
            paddingHorizontal: 0,
            backgroundColor: 'transparent',
            justifyContent: 'flex-start',
            textAlignVertical: 'top',
          }}
          placeholder={`${t('Комментарий')}...`}
          error={errors['name']}
          multiline={true}
          control={control}
        />

      </View>
      {
        image &&
        <View style={style.previewContainer}>
          <Image source={{ uri: image.uri }} style={style.preview} />
          <TouchableOpacity
            onPress={() => setImage(null)}
          >
            <AppText style={{ color: 'rgba(0, 0, 0, .7)', marginLeft: 20 }}>Удалить</AppText>
          </TouchableOpacity>
        </View>
      }
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={pickImage}
        >
          <Image
            source={require('../../../../assets/images/icons/image.png')}
            style={{ ...style.formCommentDummy, ...headerStyles.icons }}
          />
        </TouchableOpacity>
        {
          loading
            ? <ActivityIndicator size='large' color='#0000ff' />
            : <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ ...style.button, backgroundColor: 'rgba(0, 0, 0, 0)', marginRight: 15 }}
                onPress={() => {
                  onClose();
                  reset();
                }}
              >
                <AppText style={{ ...style.buttonText }}>{t('Отменить')}</AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...style.button, backgroundColor: blue }}
                onPress={handleSubmit(createComment)}
              >
                <AppText style={{ ...style.buttonText, color: '#fff' }}>{t('Отправить')}</AppText>
              </TouchableOpacity>
            </View>
        }

      </View>
    </ModalContainer>
  );
};


const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 44,
    marginRight: 15,
  },
  meta: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontFamily: 'roboto-bold',
  },
  comment: {
    fontSize: 12,
    color: '#000000',
    opacity: 0.7,
  },
  title: {
    fontFamily: 'roboto-bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  preview: {
    height: 80,
    width: 80,
    borderRadius: 7,
  },
  formCommentDummy: {
    position: 'relative',
  },
  formCommentDummyImage: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  formComment: {
    borderRadius: 7,
  },
  formCommentImage: {},
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