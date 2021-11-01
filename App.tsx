import React, { useState } from 'react';
import { View } from 'react-native';
import { LayoutStyles } from './src/styles/layout.styles';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigation } from './src/components/drawer';
import Toast from 'react-native-toast-message'
import * as Font from 'expo-font';
import AppLoadingPlaceholder from 'expo/build/launch/AppLoadingPlaceholder';
import './i18n';

async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoadingPlaceholder
        startAsync={loadApplication}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    )
  }

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
