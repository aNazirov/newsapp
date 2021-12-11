import React from 'react';
import { Indicators } from '../shared/indicators';
import { RatingButton } from '../shared/raiting';
import { Image, Share, TouchableOpacity, View } from 'react-native';
import { headerStyles } from '../../styles/header.styles';
import { useAppSelector } from '../../store/hooks';
import { toastShow } from '../../services/notifications.service';
import { errorObject } from '../../_data/helpers';
import { website } from '../../helpers/helpers';

interface Props {
  rating?: number;
  views?: number;
  comments?: number;
  slug?: string;
}

export const ButtonsGroup: React.FC<Props> = ({ comments = 0, views = 0, slug = '', rating = 0 }) => {
  const { post } = useAppSelector(state => state.posts);
  const share = async () => {
    try {
      const result = await Share.share({
        message: post?.meta_description,
        title: post?.title,
        url: `${website}/posts/${post?.slug}`,
      });

      if (result.action === Share.sharedAction) {
        // alert('Post Shared');
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        // toastShow('Post cancelled');
      }
    } catch (error) {
      toastShow({ ...errorObject, message: error.message });
    }
  };
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
        <Indicators
          comments={comments}
          views={views}
          color='rgba(0, 0, 0, .7)'
          size={24}
          fontSize={13}
        />
        <TouchableOpacity
          onPress={share}
        >
          <Image
            source={require('../../../assets/images/icons/share.png')}
            style={{ ...headerStyles.icons, marginLeft: 13 }}
          />
        </TouchableOpacity>
      </View>
      <RatingButton type='post' rating={rating} id={slug} />
    </View>
  );
};