import React, { useEffect, useRef, useState } from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { ActivityIndicator, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearStore } from '../../helpers/helpers';
import { AppText, CategoryTitle, Posts } from '../../components/shared';
import { getMorePosts, getPost } from '../../store/posts/posts.thunks';
import { ButtonsGroup } from '../../components/post';
import { toastShow } from '../../services/notifications.service';
import { errorObject } from '../../_data/helpers';
import { useTranslation } from 'react-i18next';
import { blue } from '../../styles/layout.styles';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export const Post: React.FC<Props> = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { lang } = useAppSelector(state => state.global);
  const [loading, setLoading] = useState(false);
  const page = useRef(2);
  const dispatch = useAppDispatch();
  useEffect(() => {
    clearStore(dispatch);
    dispatch(getPost(route.params?.slug, lang));
  }, [route.params?.slug]);
  const { post, pageCount } = useAppSelector(state => state.posts);
  const getMore = () => {
    setLoading(true);
    dispatch(getMorePosts('posts', route.params?.slug, { page: page.current }, lang))
      .then(() => page.current++)
      .catch(() => toastShow(errorObject))
      .finally(() => setLoading(false));
  };
  return (
    <ScrollView>
      <View style={style.container}>
        <View style={style.head}>
          {
            post?.category &&
            <View style={style.category}><CategoryTitle category={post?.category} /></View>
          }
          {
            post?.user &&
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Authors', {
                  id: post.user.id,
                });
              }}
            >
              <AppText style={style.author}>{post.user.name}</AppText>
            </TouchableOpacity>
          }
          <AppText style={style.date}>{post?.created_at}</AppText>
        </View>
        <AppText style={style.title}>{post?.title}</AppText>
        <AppText style={style.metaDescription}>{post?.meta_description}</AppText>
        <ButtonsGroup
          views={post?.views_count}
          comments={post?.comments_count}
          rating={post?.rating}
          slug={post?.slug}
        />
        <Image source={{ uri: post?.image }} resizeMode='cover' style={style.mainImage} />
        <AppText style={style.metaDescription}>{post?.description}</AppText>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>
          {
            post?.tags.map((tag, i) => {
              return (
                <View style={{ ...style.tag, marginRight: i + 1 !== post?.tags.length ? 10 : 0 }} key={tag.id}>
                  <AppText style={style.text}>#{tag.name}</AppText>
                </View>
              );
            })
          }
        </View>
        <ButtonsGroup
          views={post?.views_count}
          comments={post?.comments_count}
          rating={post?.rating}
          slug={post?.slug}
        />
        {
          post?.user &&
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
            <Image source={{ uri: post.user.avatar }} style={style.authorAvatar} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Authors', {
                  id: post.user.id,
                });
              }}
            >
              <AppText style={style.authorName}>{post.user.name}</AppText>
            </TouchableOpacity>
          </View>
        }
      </View>
      <View>
        {/*Комменты*/}
      </View>
      <Posts />
      <View style={{ alignItems: 'center' }}>
        {
          (page.current <= pageCount) && (
            loading
              ? <ActivityIndicator size='large' color='#0000ff' />
              : (
                <TouchableOpacity
                  style={style.more}
                  onPress={getMore}
                >
                  <AppText style={{ ...style.text, color: '#fff' }}>{t('Больше статей')}</AppText>
                </TouchableOpacity>
              )
          )
        }
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  category: {
    marginRight: 10,
  },
  author: {
    fontSize: 13,
    marginRight: 10,
    color: 'rgba(0, 0, 0, .7)',
  },
  date: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, .7)',
  },
  title: {
    fontSize: 24,
    fontFamily: 'roboto-bold',
    lineHeight: 31,
    marginBottom: 15,
  },
  metaDescription: {
    color: '#000',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  mainImage: {
    width: '100%',
    height: 150,
    borderRadius: 7,
    marginVertical: 30,
  },
  tag: {
    backgroundColor: '#ECF6FF',
    borderRadius: 100,
    paddingVertical: 3,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
  },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 7,
    marginRight: 15,
  },
  authorName: {
    fontSize: 14,
    fontFamily: 'roboto-bold',
  },
  more: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: blue,
    borderRadius: 7,
  },
});