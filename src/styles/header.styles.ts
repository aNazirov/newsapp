import { Platform, StatusBar, StyleSheet } from 'react-native';

export const headerStyles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    position: 'relative',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 7,
    fontSize: 8,
    paddingVertical: 0,
    paddingLeft: 40,
    paddingRight: 12,
  },
  inputIcon: {
    position: 'absolute',
    width: 18,
    height: 18,
    zIndex: 10,
    top: 4,
    left: 6,
  },
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
    fontFamily: 'roboto-bold',
    fontSize: 12,
    marginRight: 13
  },
  weatherTemp: {

    fontSize: 12,
    marginLeft: 10
  },
  currencyDiff:{

    fontSize: 12,
    marginLeft: 8
  },
  currencyDiffIcons:{
    height: 8,
    width: 10,
  },
  currencyRate: {

    fontSize: 12,
    marginRight: 13,
    marginLeft: 8,
  },
  currencyCcy: {

    fontSize: 12,
  }
});