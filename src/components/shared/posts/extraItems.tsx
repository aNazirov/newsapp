import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

interface Props {
  title: string,
  items: any[]
}

export const ExtraItems: React.FC<Props> = ({ items, title }) => {
  const { t } = useTranslation()
  return (
    <View style={style.container}>
      <Text style={style.title}>{t(title)}</Text>
      {
        items.map((item) => {
          return (
            <View style={style.itemContainer} key={item.id + item.slug}>
              <View style={style.content}>
                <Text style={style.itemTitle} ellipsizeMode='tail' numberOfLines={2}>{item.title || item.name}</Text>
                <Text style={style.description} ellipsizeMode='tail' numberOfLines={4}>{item.meta_description || item.about_me}</Text>
                <Text style={style.date} ellipsizeMode='tail' numberOfLines={4}>{item.created_at}</Text>
              </View>
              <Image source={{ uri: item.image || item.avatar }} style={style.image} />
            </View>
          )
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
    fontWeight: '400',
  },
  hr: {
    flex: 1,
    height: 1,
    opacity: .05,
    backgroundColor: '#252525',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 15,
  },
  content: {
    flex: 1,
  },
  image: {
    width: 65,
    height: 45,
    marginLeft: 10,
    borderRadius: 7,
  },
  date: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 15,
    color: 'rgba(0, 0, 0, .7)',
  },
  itemTitle: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 23,
    marginTop: 10,
  },
  description: {
    color: '#000',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
    marginBottom: 10,
  },
});