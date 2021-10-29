import React from 'react';
import { View } from 'react-native';
import { LayoutStyles } from './src/styles/layout.styles';
import { Provider } from 'react-redux';
import { store } from './src/store';
import './i18n';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigation } from './src/components/drawer';
import Toast from 'react-native-toast-message'

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <View style={LayoutStyles.layoutContainer}>
          <View style={LayoutStyles.body}>
            <DrawerNavigation/>
          </View>
        </View>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </Provider>
    </NavigationContainer>
  );
}
