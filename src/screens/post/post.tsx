import React, { useEffect, useRef, useState } from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearStore } from '../../helpers/helpers';
import { AppText, CategoryTitle, Comments, Posts } from '../../components/shared';
import { getMorePosts, getPost } from '../../store/posts/posts.thunks';
import { ButtonsGroup } from '../../components/post';
import { toastShow } from '../../services/notifications.service';
import { errorObject } from '../../_data/helpers';
import { useTranslation } from 'react-i18next';
import { blue } from '../../styles/layout.styles';
import { Loader } from '../../components/shared/loader';
import { parseEditor } from '../../helpers/editor';
import { EditorJs } from '../../helpers/EditorJs';
import { commentsNull, getPostComments } from '../../store/comments/comments.thunks';
import { AxiosError } from 'axios';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export const Post: React.FC<Props> = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { lang } = useAppSelector(state => state.global);
  const [firstLoading, setFirstLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const page = useRef(2);
  const dispatch = useAppDispatch();
  const { post, pageCount } = useAppSelector(state => state.posts);
  const getMore = () => {
    if (!pageCount) return null;
    setLoading(true);

    dispatch(getMorePosts('posts', route.params?.slug, { page: page.current }, lang))
      .then(() => page.current++)
      .catch((err: AxiosError) => toastShow({ ...errorObject, message: err.response?.data?.message }))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setFirstLoading(true);
    clearStore(dispatch);
    dispatch(commentsNull());
    dispatch(getPostComments(route.params?.slug, lang));
    dispatch(getMorePosts('posts', route.params?.slug, { page: 1 }, lang))
      .then(() => page.current = 2)
      .catch((err: AxiosError) => toastShow({ ...errorObject, message: err.response?.data?.message }));
    dispatch(getPost(route.params?.slug, lang))
      .catch((err: AxiosError) => {
        toastShow({ ...errorObject, message: err.response?.data?.message });
        if (err.response?.status === 406) navigation.navigate('Home')
      })
      .finally(() => setFirstLoading(false));
  }, [route.params?.slug, lang]);
  return (
    <Loader loading={firstLoading}>
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
          <View style={{marginHorizontal: -15}}>
            <Image source={{ uri: post?.image }} resizeMode='cover' style={style.mainImage} />
          </View>
          <AppText style={style.caption}>{post?.caption}</AppText>
          {
            post &&
            JSON.parse(post?.description).blocks.map((block: any) => {
              if (block.type === 'instagram' || block.type === 'telegram') {
                return <EditorJs key={block.id} link={block.data.link} html={parseEditor(block)} />;
              }
              return <EditorJs key={block.id} html={parseEditor(block)} />;
            })
          }
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
        <Comments />
        <AppText style={{ ...style.title, marginHorizontal: 15, marginTop: 25 }}>{t('Похожие новости')}</AppText>
        <Posts />
        <View style={{ alignItems: 'center' }}>
          {
            !!pageCount && (
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
    </Loader>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15
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
  caption: {
    marginTop: 10,
    fontFamily: 'roboto-regular-italic',
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
  },
  metaDescription: {
    color: '#000',
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 15,
  },
  mainImage: {
    width: '100%',
    height: 250,
    marginTop: 30,
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