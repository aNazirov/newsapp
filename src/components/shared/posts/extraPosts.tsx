import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IPost } from '../../../interfaces';
import { ExtraPost } from './extraPost';
import { useTranslation } from 'react-i18next';
import { AppText } from '../appText';

interface Props {
  title: string,
  posts: IPost[]
}

export const ExtraPosts: React.FC<Props> = ({ posts, title }) => {
  const { t } = useTranslation()
  return (
    <View style={style.container}>
      <AppText style={style.title}>{t(title)}</AppText>
      {
        posts.map((post, i) => {

          return (
            <React.Fragment key={post.id}>
              {
                i > 0 &&
                <View style={style.hr} />
              }
              <ExtraPost post={post} />
            </React.Fragment>
          );
        })
      }
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: '#ECF6FF',
    paddingHorizontal: 15,
    paddingVertical: 18,
    marginBottom: 25,
  },
  title: {
    color: '#0A84FF',
    fontSize: 14,
    lineHeight: 16,

  },
  hr: {
    flex: 1,
    height: 1,
    opacity: .05,
    backgroundColor: '#252525',
  },
});