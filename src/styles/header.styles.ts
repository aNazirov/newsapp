import { Platform, StatusBar, StyleSheet } from 'react-native';

export const headerStyles = StyleSheet.create({
  layoutContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:  Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingTop: 13,
    paddingBottom: 13,
    backgroundColor: '#ECF6FF',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    backgroundColor: 'white',
  },
  logo: {
    width: 120,
    height: 14,
  },
  icons: {
    height: 24,
    width: 24,
  },
  imagesContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherCity: {
    fontWeight: '700',
    fontSize: 12,
    marginRight: 13
  },
  weatherTemp: {
    fontWeight: '400',
    fontSize: 12,
    marginLeft: 10
  },
  currencyDiff:{
    fontWeight: '400',
    fontSize: 12,
    marginLeft: 8
  },
  currencyDiffIcons:{
    height: 8,
    width: 10,
  },
  currencyRate: {
    fontWeight: '400',
    fontSize: 12,
    marginRight: 13,
    marginLeft: 8,
  },
  currencyCcy: {
    fontWeight: '400',
    fontSize: 12,
  }
});