import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawer } from './customDrawer';
import { Home } from '../../screens/home';
import { Opinions } from '../../screens/opinions';
import { SpecialReports } from '../../screens/specialReports';
import { Header } from '../header';
import { LayoutStyles } from '../../styles/layout.styles';

const Drawer = createDrawerNavigator();

export const DrawerNavigation: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props}/>}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#f1f1f1'
        }
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          header: (props) => <Header style={LayoutStyles.header} {...props} />,
        }}
      />
      <Drawer.Screen
        name="Opinions" component={Opinions}
      />
      <Drawer.Screen
        name="SpecialReports"
        component={SpecialReports}
        options={{
          header: (props) => <Header style={LayoutStyles.header} {...props} />,
        }}
      />
    </Drawer.Navigator>
  )
}