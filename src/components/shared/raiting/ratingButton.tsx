import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { green, red } from '../../../styles/layout.styles';
import { AppText } from '../appText';
import { headerStyles } from '../../../styles/header.styles';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setRating } from '../../../services/global.services';
import { postRatingSet } from '../../../store/posts/posts.thunks';
import { commentRatingSet } from '../../../store/comments/comments.thunks';
import { toastShow } from '../../../services/notifications.service';
import { errorObject } from '../../../_data/helpers';
import { loginFormOpenSet } from '../../../store/global/global.thunks';
import { AxiosError } from 'axios';

interface Props {
  rating?: number;
  id: string | number,
  type: 'post' | 'comment';
}

export const RatingButton: React.FC<Props> = ({ rating = 0, id, type}) => {
  const { user, token } = useAppSelector(state => state.global);
  const dispatch = useAppDispatch()
  const onSetRating = (rating: number) => {
    if (user && token) {
      return setRating(type, rating, id, token)
        .then((resRating) => {
          if (type === 'post') return dispatch(postRatingSet( resRating,rating))
          if (type === 'comment') return dispatch(commentRatingSet(resRating, rating, id))
        })
        .catch((err: AxiosError) => toastShow({ ...errorObject, message: err.response?.data?.message }));
    }
    dispatch(loginFormOpenSet(true))
  };
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => onSetRating(-1)}
      >
        <Image source={require('../../../../assets/images/icons/chevronDown.png')} style={headerStyles.icons} />
      </TouchableOpacity>
      <AppText style={{ ...style.rating, color: rating < 0 ? red : green}}>{rating}</AppText>
      <TouchableOpacity
        onPress={() => onSetRating(1)}
      >
        <Image source={require('../../../../assets/images/icons/chevronUp.png')} style={headerStyles.icons} />
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 13,
    fontFamily: 'roboto-medium',
    marginHorizontal: 7,
    paddingHorizontal: 5,
  },
});