import React, { useCallback, useRef, useState } from 'react';
import { CommentForm, CommentModal } from './commentForm';
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from '../appText';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { commentSet, getPostComments } from '../../../store/comments/comments.thunks';
import { useRoute } from '@react-navigation/native';
import { blue } from '../../../styles/layout.styles';
import { IComment } from '../../../interfaces';
import { Options } from '../options';
import { RatingButton } from '../raiting';
import { commentFormOpenSet, eventFormOpenSet } from '../../../store/global/global.thunks';
import { reportComment } from '../../../services/global.services';
import { toastShow } from '../../../services/notifications.service';
import { errorObject } from '../../../_data/helpers';
import { ModalContainer } from '../modal';
import { AppInput } from '../appInput';
import { ReportModal } from './reportModal';

interface PropsCommentChilds {
  child: IComment[];
}

interface PropsCommentChild {
  parent?: string;
  comment: IComment;
}

const CommentChild: React.FC<PropsCommentChild> = ({ comment, parent }) => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  return (
    <View style={styleCommentChild.container}>
      <View style={styleCommentChild.head}>
        <Image source={{ uri: comment?.user?.avatar }} style={styleCommentChild.avatar} />
        <View style={styleCommentChild.meta}>
          <AppText style={styleCommentChild.name}>{comment?.user?.name}</AppText>
          <AppText style={styleCommentChild.date}>{comment.created_at}</AppText>
        </View>
        <RatingButton id={comment.id} rating={comment.rating} type='comment' />
      </View>
      <AppText style={{ fontSize: 14 }}>
        <AppText style={{ color: blue }}>{parent ? `@${parent} ` : ''}</AppText>
        {comment.text}
      </AppText>
      {
        comment.image &&
        <Image source={{ uri: comment.image }} style={styleCommentChild.image} />
      }
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <TouchableOpacity
          onPress={() => {
            dispatch(commentSet(comment));
            dispatch(commentFormOpenSet(true));
          }}
        >
          <AppText style={styleCommentChild.send}>{t('Ответить')}</AppText>
        </TouchableOpacity>
        <Options userId={comment.user.id} comment={comment} />
      </View>
      {
        !!comment.children?.length &&
        <CommentChilds child={comment.children} />
      }
    </View>
  );
};

const styleCommentChild = StyleSheet.create({
  container: {
    marginTop: 5
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
  image: {
    width: '100%',
    height: 100,
    marginVertical: 10,
  },
  name: {
    fontSize: 14,
    fontFamily: 'roboto-bold',
  },
  date: {
    fontSize: 12,
    color: '#000000',
    opacity: 0.7,
  },
  send: {
    fontSize: 13,
    lineHeight: 24,
    color: 'rgba(0, 0, 0, .7)',
    marginBottom: 10,
    marginRight: 20,
  }
});

const CommentChilds: React.FC<PropsCommentChilds> = ({ child}) => {
  const { t } = useTranslation('common');
  const [showComment, setShowComment] = useState(true);
  const [showAllComment, setShowAllComment] = useState(false);
  return (
    <>
      {
        showComment
          ? (
            <View style={styleCommentChilds.container}>
              <View style={styleCommentChilds.firstBlock}>
                <TouchableOpacity
                  onPress={() => setShowComment(false)}
                >
                  <Image source={require('../../../../assets/images/icons/hideComments.png')} />
                </TouchableOpacity>
                <View style={styleCommentChilds.line} />
              </View>
              <View style={styleCommentChilds.secondBlock}>
                {
                  child.map((comment, i) => {
                    if (!showAllComment && i >= 2) return null;
                    return <CommentChild
                      key={comment.id + comment.reply_user?.name}
                      parent={comment.reply_user?.name}
                      comment={comment}
                    />;
                  })
                }
                {
                  !showAllComment && child.length > 2 &&
                  <TouchableOpacity
                    onPress={() => setShowAllComment(true)}
                  >
                    <AppText
                      style={{ fontSize: 13, color: blue, marginBottom: 10 }}
                    >
                      {`Показать еще ${child?.length - 2} ${t('ответов')}`}
                    </AppText>
                  </TouchableOpacity>
                }
              </View>
            </View>
          )
          : (!showComment && !!child?.length) && (
          <TouchableOpacity
            onPress={() => setShowComment(true)}
          >
            <AppText
              style={{ fontSize: 13, color: blue, marginBottom: 10 }}
            >
              {`${child?.length} ${t('ответов')}`}
            </AppText>
          </TouchableOpacity>
        )
      }
    </>
  );
};

const styleCommentChilds = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  firstBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    width: 1,
    marginVertical: 5,
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
  secondBlock: {
    flex: 9,
  },

});

const Comment = () => {
  const { comments } = useAppSelector(state => state.comments);
  return (
    <>
      {
        comments.map((comment, i) => {
          return (
            <CommentChild
              comment={comment}
              key={comment?.id + comment.user?.name + i}
            />
          );
        })
      }
    </>
  );
};

export const Comments: React.FC = () => {
  const pageRef = useRef(2);
  const route = useRoute<any>();
  const { t } = useTranslation();
  const { hasMore } = useAppSelector(state => state.comments);
  const { lang } = useAppSelector(state => state.global);
  // const [filter, setFilter] = useState('popular');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const getMore = useCallback(() => {
    setLoading(true);
    dispatch(getPostComments(route.params.slug, lang, { page: pageRef.current }))
      .then(() => pageRef.current++)
      .finally(() => setLoading(false));
  }, []);
  // const getFilter = (value: any) => {
  //   setLoading(true);
  //   let params = {};
  //   if (value === 'popular') {
  //     params = Object.assign({}, { popular: true });
  //   }
  //   if (value === 'fresh') {
  //     params = Object.assign({}, { fresh: true });
  //   }
  //   dispatch(commentsNull());
  //   dispatch(getPostComments(route.params.slug, lang, { page: 1, ...params }))
  //     .then(() => pageRef.current = 2)
  //     .finally(() => setLoading(false));
  // };
  return (
    <View style={style.container}>
      <View style={style.head}>
        <AppText style={style.title}>{t('Комментарии')}</AppText>
      </View>
      <CommentForm />
      <Comment />
      <View style={{ alignItems: 'center' }}>
        {
          hasMore && (
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
      <CommentModal />
      <ReportModal />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 25,
    backgroundColor: '#fff',
    padding: 15,
  },
  head: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'roboto-bold',
  },
  more: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: blue,
    borderRadius: 7,
  },
  text: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
  },
});