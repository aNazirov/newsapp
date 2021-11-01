import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppText } from '../appText';

interface IFilter {
  fresh?: boolean;
  popular?: boolean;
}

interface Props {
  filter: IFilter;
  setFilter: (filter: IFilter) => void;
  getFilter: (filter: IFilter) => void;
  first: 'popular' | 'fresh';
}

export const Filter: React.FC<Props> = ({ setFilter, getFilter, filter, first }) => {
  const { t } = useTranslation()
  const filterSet = (popular: boolean) => () => {
    let query = {};
    if (popular) query = { popular };
    if (!popular) query = { fresh: !popular };
    setFilter(query);
    getFilter(query);
  };
  return (
    <View style={style.container}>
      {
        first === 'popular' &&
        <>
          <TouchableOpacity
            onPress={filterSet(true)}
            style={{ ...style.button, backgroundColor: filter.fresh ? 'transparent' : '#fff' }}
          >
            <AppText style={style.title}>{t('Популярное')}</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={filterSet(false)}
            style={{ ...style.button, marginLeft: 15, backgroundColor: filter.fresh ? '#fff' : 'transparent' }}
          >
            <AppText style={style.title}>{t('Свежее')}</AppText>
          </TouchableOpacity>
        </>
      }
      {
        first === 'fresh' &&
        <>
          <TouchableOpacity
            onPress={filterSet(false)}
            style={{ ...style.button, marginLeft: 15, backgroundColor: filter.fresh ? '#fff' : 'transparent' }}
          >
            <AppText style={style.title}>{t('Свежее')}</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={filterSet(true)}
            style={{ ...style.button, backgroundColor: filter.fresh ? 'transparent' : '#fff' }}
          >
            <AppText style={style.title}>{t('Популярное')}</AppText>
          </TouchableOpacity>
        </>
      }
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 25,
    paddingHorizontal: 15,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 100,
  },
  title: {
    fontSize: 14,

    lineHeight: 24,
  },
});