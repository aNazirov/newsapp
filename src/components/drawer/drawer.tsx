import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawer } from './customDrawer';
import { Home } from '../../screens/home';
import { Opinions } from '../../screens/opinions';
import { SpecialReports } from '../../screens/specialReports';
import { Header } from '../header';
import { LayoutStyles } from '../../styles/layout.styles';
import { Feed } from '../../screens/feed';
import { Categories } from '../../screens/categories';
import { Authors } from '../../screens/authors';
import { Tags } from '../../screens/tags';
import { Search } from '../../screens/search';
import { Profile } from '../../screens/profile';

const Drawer = createDrawerNavigator();

export const DrawerNavigation: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props}/>}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#f1f1f1',
        },
        unmountOnBlur: true
      }}
      initialRouteName='Home'
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
        options={{
          header: (props) => <Header style={LayoutStyles.header} {...props} />,
        }}
      />
      <Drawer.Screen
        name="SpecialReports"
        component={SpecialReports}
        options={{
          header: (props) => <Header style={LayoutStyles.header} {...props} />,
        }}
      />
      <Drawer.Screen
        name="Feed"
        component={Feed}
        options={{
          header: (props) => <Header style={LayoutStyles.header} {...props} />,
        }}
      />
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{
          header: (props) => <Header style={LayoutStyles.header} {...props} />,
        }}
      />
      <Drawer.Screen
        name="Categories"
        component={Categories}
        options={{
          header: (props) => <Header style={LayoutStyles.header} {...props} />,
        }}
      />
      <Drawer.Screen
        name="Authors"
        component={Authors}
        options={{
          header: (props) => <Header style={LayoutStyles.header} {...props} />,
        }}
      />
      <Drawer.Screen
        name="Tags"
        component={Tags}
        options={{
          header: (props) => <Header style={LayoutStyles.header} {...props} />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          header: (props) => <Header style={LayoutStyles.header} {...props} />,
        }}
      />
    </Drawer.Navigator>
  )
}