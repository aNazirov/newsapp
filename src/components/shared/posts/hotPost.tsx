import React from 'react';
import { IPost } from '../../../interfaces';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import { Indicators } from '../indicators';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  post: IPost;
}

export const HotPost: React.FC<Props> = ({ post }) => {
  return (
    <View style={style.container}>
      <ImageBackground source={{ uri: post.image }} resizeMode='cover' style={style.background}>
        <LinearGradient colors={['rgba(80, 80, 80, 0)', 'rgba(37, 37, 37, 0.5)', 'rgba(0, 0, 0, 0.5)']} style={style.gradient}>
          <Text style={style.title}>{post.title}</Text>
          <View style={style.indicators}>
            <Text style={{ marginRight: 13, color: 'rgba(250, 250, 250, .7)' }}>{post.created_at}</Text>
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
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 15,
  },
  indicators: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 13,
    fontWeight: '400',
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