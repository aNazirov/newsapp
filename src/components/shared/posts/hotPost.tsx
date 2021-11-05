import React from 'react';
import { IPost } from '../../../interfaces';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Indicators } from '../indicators';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText } from '../appText';
import { CategoryTitle } from '../utils';
import { useNavigation } from '@react-navigation/native';

interface Props {
  post: IPost;
}

export const HotPost: React.FC<Props> = ({ post }) => {
  const navigation = useNavigation<any>()
  return (
    <View style={style.container}>
      <ImageBackground source={{ uri: post.image }} resizeMode='cover' style={style.background}>
        <LinearGradient colors={['rgba(80, 80, 80, 0)', 'rgba(37, 37, 37, 0.5)', 'rgba(0, 0, 0, 0.5)']} style={style.gradient}>
          <CategoryTitle category={post.category} color='#fff'/>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Posts', { slug: post.slug });
            }}
          >
            <AppText style={style.title}>{post.title}</AppText>
          </TouchableOpacity>
          <View style={style.indicators}>
            <AppText style={{ marginRight: 13, color: 'rgba(250, 250, 250, .7)' }}>{post.created_at}</AppText>
            <Indicators
              light={true}
              size={24}
              fontSize={13}
              color={'rgba(250, 250, 250, .7)'}
              comments={post.comments_count}
              views={post.views_count}/>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 25,
    width: '100%',
    height: 207,
    paddingHorizontal: 15
  },
  title: {
    color: '#fff',
    fontFamily: 'roboto-bold',
    fontSize: 16,
    lineHeight: 23,
    marginVertical: 15,
  },
  indicators: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 13,

  },
  background: {
    flex: 1,
    borderRadius: 7,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    overflow: 'hidden',
    borderRadius: 7,
    paddingVertical: 22,
  },
});