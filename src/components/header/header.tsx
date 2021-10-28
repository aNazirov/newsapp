import React, { useEffect } from 'react';
import { Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { headerStyles } from '../../styles/header.styles';
import { Weather, Currency } from '../shared';
import { useAppDispatch } from '../../store/hooks';
import { getGlobalData } from '../../store/global/global.thunks';
import { useNavigation } from '@react-navigation/native';

interface Props {
  style: any;
}

export const Header: React.FC<Props> = ({ style }) => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getGlobalData());
  }, []);
  return (
    <SafeAreaView>
      <View>
        <View style={{ ...headerStyles.layoutContainer, ...style }}>
          <View style={headerStyles.imagesContainer}>
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
            >
              <Image
                style={{ ...headerStyles.icons, marginRight: 22 }}
                source={require('../../../assets/images/icons/burger.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
            >
              <Image style={headerStyles.logo} source={require('../../../assets/images/logo.png')} />
            </TouchableOpacity>
          </View>
          <View style={headerStyles.imagesContainer}>
            <Image style={{ ...headerStyles.icons, marginRight: 22 }}
                   source={require('../../../assets/images/icons/search.png')} />
            <Image style={headerStyles.icons} source={require('../../../assets/images/icons/Vector.png')} />
          </View>
        </View>
        <View style={{ ...headerStyles.infoContainer, ...style }}>
          <View style={{ height: 20, flex: 1.5 }}>
            <Currency />
          </View>
          <View style={{ height: 20, flex: 1 }}>
            <Weather />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};