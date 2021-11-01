import React from 'react';
import { Image, View } from 'react-native';
import Swiper from 'react-native-web-swiper';
import { useAppSelector } from '../../../store/hooks';
import { headerStyles } from '../../../styles/header.styles';
import { green, red } from '../../../styles/layout.styles';
import { useTranslation } from 'react-i18next';
import { AppText } from '../appText';

export const Currency: React.FC = () => {
  const { t } = useTranslation()
  const currencies = useAppSelector(state => state.global.currencies);
  if (!currencies.length) return null;
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
        currencies.map(currency => {
          return (
            <View
              key={currency.Ccy}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <CurrencyIcon Ccy={currency.Ccy} />
              <AppText style={headerStyles.currencyRate}>{Math.round(currency.Rate)} {t('сум')}</AppText>
              {
                currency.Diff < 0
                  ? <Image
                    style={headerStyles.currencyDiffIcons}
                    resizeMode='contain'
                    source={
                      require(`../../../../assets/images/icons/down.png`)
                    }
                  />
                  : <Image
                    style={headerStyles.currencyDiffIcons}
                    resizeMode='contain'
                    source={
                      require(`../../../../assets/images/icons/up.png`)
                    }
                  />
              }
              <AppText style={{
                ...headerStyles.currencyDiff,
                color: currency.Diff < 0 ? red : green,
              }}>{Math.round(currency.Diff)}</AppText>
            </View>
          );
        })
      }
    </Swiper>
  );
};

interface IconProps {
  Ccy: 'USD' | 'EUR' | 'RUB';
}

const CurrencyIcon: React.FC<IconProps> = ({ Ccy }) => {
  return (
    <>
      {
        Ccy === 'USD' &&
        <Image
          style={headerStyles.icons}
          resizeMode='contain'
          source={
            require('../../../../assets/images/icons/dollar.png')
          }
        />
      }
      {
        Ccy === 'EUR' &&
        <Image
          style={headerStyles.icons}
          resizeMode='contain'
          source={
            require('../../../../assets/images/icons/euro.png')
          }
        />
      }
      {
        Ccy === 'RUB' &&
        <Image
          style={headerStyles.icons}
          resizeMode='contain'
          source={
            require('../../../../assets/images/icons/ruble.png')
          }
        />
      }

    </>
  );
};