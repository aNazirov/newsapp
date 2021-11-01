import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { blue } from '../../styles/layout.styles';
import { defaultImage } from '../../_data/helpers';

export const Profile: React.FC = () => {
  const { t } = useTranslation();
  return (
    <View style={style.container}>
      <Image source={{ uri: defaultImage }} style={style.avatar} />
      <Text style={style.name}>Тит</Text>
      <Text style={style.aboutMe}>
        Et maxime porro qui sit suscipit est. Fugiat iure ipsa voluptatum aliquid eaque animi.
        Autem tenetur error et vero.
      </Text>
      <Text style={{ ...style.edit, color: blue }}>{t('Изменить имя или описание')}</Text>
      <Text style={{ ...style.edit }}>{t('На проекте с')}</Text>
      <TouchableOpacity style={style.settings}>
        <Image source={require('../../../assets/images/icons/settings.png')} />
      </TouchableOpacity>
      <View style={style.tabs}>
        <Text style={style.tab}>{t('Комментарии')}</Text>
        <Text style={style.tab}>{t('Уведомления')}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'relative',
    paddingHorizontal: 15,
    paddingTop: 15
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 7,
  },
  name: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutMe: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 10,
  },
  edit: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
  },
  settings: {
    position: 'absolute',
    top: 15,
    right: 15
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 4,
    paddingBottom: 10
  }
});