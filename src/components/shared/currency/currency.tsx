import React from 'react';
import { Image, Text, View } from 'react-native';
import Swiper from 'react-native-web-swiper';
import { useAppSelector } from '../../../store/hooks';
import { headerStyles } from '../../../styles/header.styles';
import { green, red } from '../../../styles/layout.styles';

export const Currency: React.FC = () => {
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
              <Text style={headerStyles.currencyRate}>{currency.Rate}</Text>
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
              <Text style={{
                ...headerStyles.currencyDiff,
                color: currency.Diff < 0 ? red : green,
              }}>{currency.Diff}</Text>
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