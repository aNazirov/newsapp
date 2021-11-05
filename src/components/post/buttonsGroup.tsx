import React from 'react';
import { Indicators } from '../shared/indicators';
import { RatingButton } from '../shared/raiting';
import { View } from 'react-native';

interface Props {
  rating?: number;
  views?: number;
  comments?: number;
  slug?: string
}

export const ButtonsGroup: React.FC<Props> = ({comments = 0, views= 0, slug = '', rating= 0}) => {

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <Indicators
        comments={comments}
        views={views}
        color='rgba(0, 0, 0, .7)'
        size={24}
        fontSize={13}
      />
      <RatingButton type='post' rating={rating} id={slug}/>
    </View>
  )
}