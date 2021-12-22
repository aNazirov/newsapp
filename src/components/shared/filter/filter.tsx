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
  const freshActiveStyle = filter.fresh ? style.active : {}
  const popularActiveStyle = filter.popular ? style.active : {}
  return (
    <View style={style.container}>
      {
        first === 'popular' &&
        <>
          <TouchableOpacity
            onPress={filterSet(true)}
            style={{ ...style.button, marginRight: 15, ...popularActiveStyle }}
          >
            <AppText style={style.title}>{t('Популярное')}</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={filterSet(false)}
            style={{ ...style.button, ...freshActiveStyle }}
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
            style={{ ...style.button, marginRight: 15, ...freshActiveStyle }}
          >
            <AppText style={style.title}>{t('Свежее')}</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={filterSet(true)}
            style={{ ...style.button, ...popularActiveStyle }}
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
    marginTop: 20,
    paddingRight: 15,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 100,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 14,
    lineHeight: 24,
  },
  active: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: .1,
    shadowRadius: 3,

    elevation: 3,
  }
});