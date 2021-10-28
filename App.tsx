import React from 'react';
import { View } from 'react-native';
import { LayoutStyles } from './src/styles/layout.styles';
import { Provider } from 'react-redux';
import { store } from './src/store';
import './i18n';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigation } from './src/components/drawer';

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <View style={LayoutStyles.layoutContainer}>
          <View style={LayoutStyles.body}>
            <DrawerNavigation/>
          </View>
        </View>
      </Provider>
    </NavigationContainer>
  );
}
