import React  from 'react';
import { View } from 'react-native';
import { Header } from './src/components/header';
import { LayoutStyles } from './src/styles/layout.styles';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { Home } from './src/screens/home/home';

export default function App() {
  return (
    <Provider store={store}>
      <View style={LayoutStyles.layoutContainer}>
        <Header style={LayoutStyles.header} />
        <View style={LayoutStyles.body}>
          <Home />
        </View>
      </View>
    </Provider>
  );
}
