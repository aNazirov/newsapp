import React from 'react';
import { Image, View } from 'react-native';
import Swiper from 'react-native-web-swiper';
import { useAppSelector } from '../../../store/hooks';
import { headerStyles } from '../../../styles/header.styles';
import { useTranslation } from 'react-i18next';
import { AppText } from '../appText';

export const Weather: React.FC = () => {
  const { t } = useTranslation()
  const weather = useAppSelector(state => state.global.weather);
  if (!weather.length) return null
  return (
    <Swiper
      vertical
      controlsProps={{
        prevTitle: ' ',
        nextTitle: ' ',
        dotProps: {
          badgeStyle: { backgroundColor: 'transparent' },
        },
      }}
      loop
      timeout={-15}
    >
      {
        weather.map(w => {
          return (
            <View
              key={w.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <AppText style={headerStyles.weatherCity}>{t(w.city)}</AppText>
              <Image
                style={{
                  width: 18,
                  height: 18
                }}
                source={{
                  uri: `https:${w.data.icon}`
                }}
              />
              <AppText style={headerStyles.weatherTemp}>{w.data.temp}°</AppText>
            </View>
          );
        })
      }
    </Swiper>
  );
};